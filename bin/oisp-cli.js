#!/usr/bin/env node

/*
Copyright (c) 2016, Intel Corporation

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
var admin= require('commander'),
    pkgJson = require('../package.json');

/* Modules */
var accounts = require('../modules/accounts'),
    alerts = require('../modules/alerts'),
    auth = require('../modules/auth'),
    cmpcatalog = require('../modules/cmpcatalog'),
    data = require('../modules/data'),
    devices = require('../modules/devices'),
    local = require('../modules/local'),
    users = require('../modules/users');

var helpBase = function(apiBase) {
    if ( ! apiBase.match(new RegExp("^regular$|^all$|^apionly$|^auth$|^users$|^accounts$|^rules$|^alerts$|^devices$|^data$|^components$|^control$|^invites$|^cmpcatalog$"))) {
        console.log("Unknown apiBase command");
        return;
    }
    var processHelp = function(txt) {
        var split_txt = txt.split('\n');
        var result = "";
        var replace_pattern = new RegExp("^(.*)\\|(.*)\\|(.*)$");
        var apiBase_pattern = new RegExp("^ *" + apiBase);

        split_txt.forEach(function(line) {
            if (apiBase === "regular") {
                line = line.replace(replace_pattern, "$1$2");
            } else if (apiBase === "apionly") {
                line = line.replace(replace_pattern, "$1API: $3");
            } else if (apiBase === "all") {
                line = line.replace(replace_pattern, "$1$2 API: $3");
            } else { /* try to filter for apiBase*/
                if (line.match(apiBase_pattern)) {
                    line = line.replace(replace_pattern, "$1$2 API: $3");
                } else {
                    line = "";
                }
            }
            if (line !== "") {
                result += line + "\n";
            }
        });
        return result;
    };

    admin.outputHelp(processHelp);
};

admin.version(pkgJson.version)
    .command("help <apiBase>")
    .description("Filters help text by API base path, [all, apionly, auth, users, accounts, rules, alerts, devices, data, components, control, invites, cmpcatalog]")
    .action(helpBase);

/* Error handling */
var errorHandler = function(error, code) {
    if (error) {
        console.error(error);
    }
    process.exit(code);
};


/*
 * Add commando as option
 */
accounts.addCommand(admin, errorHandler);
alerts.addCommand(admin, errorHandler);
auth.addCommand(admin, errorHandler);
cmpcatalog.addCommand(admin, errorHandler);
data.addCommand(admin, errorHandler);
devices.addCommand(admin, errorHandler);
local.addCommand(admin, errorHandler);
users.addCommand(admin, errorHandler);

admin.command('*')
    .description('Error message for non valid command')
    .action(function() {
        console.log("'" + admin.args[0] + "'" +
            ' is not a valid command.');
    });


admin.parse(process.argv);


/*
 * Run if the command were specified at parameter
 */
/*
 * Help and versions also as commands
 */


if (!admin.args.length || admin.args[0] === 'help') {
    helpBase("regular");
}
admin.command('version')
    .description('output the version number')
    .action(admin.version(pkgJson.version));


