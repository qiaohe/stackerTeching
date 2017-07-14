"use strict";
var md5 = require('md5');
var config = require('../config');
var mainDAO = require('../dao/mainDAO');
var _ = require('lodash');
var uuid = require('node-uuid');
module.exports = {
    login: function (req, res, next) {
        var userName = req.body.username;
        var password = req.body.password;
        var user = {};
        mainDAO.findByUserName(userName, +req.body.isStudent ? 0 : 1).then(function (users) {
            if (!users || !users.length) throw new Error('用户不存在。');
            user = users[0];
            if (user.password != md5(password)) throw new Error('密码错误。');
            var token = uuid.v4();
            user.token = token;
            delete user.password;
            return mainDAO.updateUser({id: user.id, token: token});
        }).then(function (result) {
            res.send({ret: 0, data: user});
        }).catch(function (err) {
            res.send({ret: 1, message: err.message});
        });
        return next();
    },

    logout: function (req, res, next) {
        var token = req.headers['token'];
        if (!token) return res.send(401, '无效的token');
        mainDAO.updateUser({id: req.user.id, token: null}).then(function (result) {
            res.send({ret: 0, message: '登出成功。'});
        }).catch(function (err) {
            res.send({ret: 1, message: err.message});
        });
        return next();
    }
}
