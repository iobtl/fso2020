"use strict";
exports.__esModule = true;
var express_1 = require("express");
var app = express_1["default"]();
app.use(express_1["default"].json());
var PORT = 3000;
app.get('/ping', function (_request, response) {
    console.log('someone pinged here');
});
app.listen(PORT, function () {
    "Server running on port " + PORT;
});
