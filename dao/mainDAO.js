"use strict";
var db = require('../common/db');
var sqlMapping = require('./sqlMapping');
module.exports = {
    findByUserName: function (username, type) {
        return db.query(sqlMapping.stackerTeaching.findByUserName, [username, type]);
    },
    findByToken: function (token) {
        return db.query(sqlMapping.stackerTeaching.findByToken, token);
    },
    findUsers: function (type) {
        return db.query(sqlMapping.stackerTeaching.findUsers, type);
    },
    updateUser: function (user) {
        return db.query(sqlMapping.stackerTeaching.updateUser, [user, user.id]);
    },
    insertUser: function (user) {
        return db.query(sqlMapping.stackerTeaching.insertUser, user);
    },
    findMenus: function (isStudent) {
        return db.query(sqlMapping.stackerTeaching.findMenus, isStudent);
    },
    findLastOperationLog: function (studentId, menuId) {
        return db.query(sqlMapping.stackerTeaching.findLastOperationLog, [+studentId, +menuId]);
    },
    insertOperationLog: function (log) {
        return db.query(sqlMapping.stackerTeaching.insertOperationLog, log);
    },
    updateOperationLog: function (log) {
        return db.query(sqlMapping.stackerTeaching.updateOperationLog, [log, log.id]);
    },
    findFaults: function () {
        return db.query(sqlMapping.stackerTeaching.findFaults);
    },

    findTheoryExams: function () {
        return db.query(sqlMapping.stackerTeaching.findTheoryExams);
    },
    insertAssessmentLog: function (log) {
        return db.query(sqlMapping.stackerTeaching.insertAssessmentLog, log);
    },
    insertExamAndTrainingConfig: function (config) {
        return db.query(sqlMapping.stackerTeaching.insertExamAndTrainingConfig, config);
    },
    findExamAndTrainingConfig: function (category, type) {
        return db.query(sqlMapping.stackerTeaching.findExamAndTrainingConfig, [category, type]);
    },
    findResourceBy: function (menuId) {
        return db.query(sqlMapping.stackerTeaching.findResourceBy, menuId);
    },
    findOperationLog: function (studentId) {
        return db.query(sqlMapping.stackerTeaching.findOperationLog, studentId);
    },
    findAssessmentLog: function (studentId) {
        return db.query(sqlMapping.stackerTeaching.findAssessmentLog, studentId);
    }
}
