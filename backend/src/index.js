"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var app_js_1 = require("./app.js");
var Db_Connection_js_1 = require("./DB/Db_Connection.js");
var PORT = process.env.PORT;
(0, Db_Connection_js_1.databaseconnect)().then(function () {
    app_js_1.default.listen(PORT, function () {
        console.log("your server is runing");
    });
}).catch(function (err) { return console.log(err); });
