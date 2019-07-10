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

var assert =  require('chai').assert,
    rewire = require('rewire'),
    url = require('url'),
    sinon = require('sinon');
require("./commonTest.js");

var fileToTest = "../modules/cmpcatalog.js";

describe(fileToTest, function() {
    var toTest = rewire(fileToTest); 
    toTest.__set__("logger", logger);

    it('Shall return response error (getCatalog)  >', function(done) {
        adminDataFile = {};

        var test = function(object, callback) {
            object.token = token;
            callback(new Error("Error"));
        }

        var fakeErrorHandler = function(error, code) {
            assert.equal(code, fakeCommon.errors["responseError"].code);
            done();
        }
    
        toTest.__set__("userAdminData", fakeUserAdminData);
        toTest.__set__("userAdminTools", fakeLibTools);
        fakeApi.cmpcatalog.getCatalog = test;
        toTest.__set__("api", fakeApi);
        toTest.__set__("errorHandler", fakeErrorHandler);
        toTest.__set__("common", fakeCommon);
        toTest.__get__("getCatalog")(jsonString);
    });


    it('Shall fail to get accountId (getCatalog)  >', function(done) {

        var fakeErrorHandler = function(error, code) {
            assert.equal(code, fakeCommon.errors["accountIdError"].code);
            done();
        }

        toTest.__set__("userAdminData", fakeUserAdminData);
        toTest.__set__("userAdminTools", fakeLibToolsError);
        fakeApi.cmpcatalog.getCatalog = function() {};
        toTest.__set__("api", fakeApi);
        toTest.__set__("errorHandler", fakeErrorHandler);
        toTest.__set__("common", fakeCommon);
        toTest.__get__("getCatalog")(account.id);
    });


    it('Shall return response error (getCatalogDetails)  >', function(done) {
        adminDataFile = {};

        var test = function(object, callback) {
            object.token = token;
            callback(new Error("Error"));
        }

        var fakeErrorHandler = function(error, code) {
            assert.equal(code, fakeCommon.errors["responseError"].code);
            done();
        }
    
        toTest.__set__("userAdminData", fakeUserAdminData);
        toTest.__set__("userAdminTools", fakeLibTools);
        fakeApi.cmpcatalog.getCatalogDetail = test;
        toTest.__set__("api", fakeApi);
        toTest.__set__("errorHandler", fakeErrorHandler);
        toTest.__set__("common", fakeCommon);
        toTest.__get__("getCatalogDetails")(jsonString);
    });


    it('Shall fail to get accountId (getCatalogDetails)  >', function(done) {

        var fakeErrorHandler = function(error, code) {
            assert.equal(code, fakeCommon.errors["accountIdError"].code);
            done();
        }

        toTest.__set__("userAdminData", fakeUserAdminData);
        toTest.__set__("userAdminTools", fakeLibToolsError);
        fakeApi.cmpcatalog.getCatalogDetail = function() {};
        toTest.__set__("api", fakeApi);
        toTest.__set__("errorHandler", fakeErrorHandler);
        toTest.__set__("common", fakeCommon);
        toTest.__get__("getCatalogDetails")(account.id);
    });
});
