"use strict";
var config = require('../config');
var routeConfig = require('../routerConfig');
var _ = require('lodash');
var mainDAO = require('../dao/mainDAO');
var url = require('url');
function authorizedIfNeeded(req) {
    var routeItem = _.findLast(routeConfig, function (item) {
        var regExp = new RegExp('^' + item.path.replace(/:[(a-zA-Z0-9)]*/g, '[\\w|-]+') + '$');
        var m = req.method.toLowerCase();
        return (m == item.method || (m == 'delete' && item.method == 'del')) && regExp.test(url.parse(req.url).pathname)
    });
    return routeItem && routeItem.secured && routeItem.secured == 'user';
}

function auth() {
    function ensureAuthorized(req, res, next) {
        if (!authorizedIfNeeded(req)) return next();
        var token = req.headers['token'];
        if (!token) return res.send(403, '无授权的访问。');
        mainDAO.findByToken(token).then(function (users) {
            if (!(users && users.length > 0)) return res.send(403, '无效token。');
            req.user = users[0];
            return next();
        }).catch(function (err) {
            res.send(500, err);
        });
    }

    return (ensureAuthorized);
}
module.exports = auth;