/*
Copyright (c) 2017, Intel Corporation

Redistribution and use in source and binary forms, with or without modification,
are permitted provided that the following conditions are met:

    * Redistributions of source code must retain the above copyright notice,
      this list of conditions and the following disclaimer.
    * Redistributions in binary form must reproduce the above copyright notice,
      this list of conditions and the following disclaimer in the documentation
      and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR
ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/
"use strict";

var config = require('../config'),
    api = require("@open-iot-service-platform/oisp-sdk-js")(config).api.rest,
    logger = require('../lib/logger').init(),
    userAdminTools = require("../lib/cli-tools"),
    userAdminData = require("../lib/cli-data"),
    common = require("../lib/common");
var errorHandler = {};

var getCatalog = function(accountId) {
    logger.info("Starting getCatalog ...");
    var userAdminDataObj = userAdminData.loadUserAdminBaseData();
    var targetAccount = userAdminTools.findAccountId(accountId, userAdminDataObj.accounts);
    if (! targetAccount) {
        logger.error(common.errors["accountIdError"].message);
        errorHandler(null, common.errors["accountIdError"].code);
    }
    userAdminDataObj.accountId = targetAccount.id;
    api.cmpcatalog.getCatalog(userAdminDataObj, function(err, response) {
        if (!err && response) {
            logger.info("Info retrieved: ", response);
        } else {
            logger.error(common.errors["responseError"].message + ": " + err);
            errorHandler(null, common.errors["responseError"].code);
        }
    });
};

var getCatalogDetails = function(accountId, componentId) {
    logger.info("Starting getCatalogDetails ...");
    var userAdminDataObj = userAdminData.loadUserAdminBaseData();
    var targetAccount = userAdminTools.findAccountId(accountId, userAdminDataObj.accounts);
    if (! targetAccount) {
        logger.error(common.errors["accountIdError"].message);
        errorHandler(null, common.errors["accountIdError"].code);
    }
    userAdminDataObj.accountId = targetAccount.id;
    userAdminDataObj.componentId = componentId;
    api.cmpcatalog.getCatalogDetail(userAdminDataObj, function(err, response) {
        if (!err && response) {
            logger.info("Info retrieved: ", response);
        } else {
            logger.error(common.errors["responseError"].message + ": " + err);
            errorHandler(null, common.errors["responseError"].code);
        }
    });
};

module.exports = {
    addCommand : function (program, errorHdl) {
        errorHandler = errorHdl;
        program
            .command('cmpcatalog.get <accountId>')
            .description('|List component types for account.|GET:/v1/api/accounts/{accountId}/cmpcatalog')
            .action(getCatalog);
        program
            .command('cmpcatalog.get.component <accountId> <componentId>')
            .description('|Get component type details.|GET:/v1/api/accounts/{accountId}/cmpcatalog/{componentId}')
            .action(getCatalogDetails);
    }
};
