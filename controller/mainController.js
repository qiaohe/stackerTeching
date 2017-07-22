"use strict";
var config = require('../config');
var _ = require('lodash');
var md5 = require('md5');
var moment = require('moment');
var mainDAO = require('../dao/mainDAO');
function createMenus(node, menus) {
    var items = _.filter(menus, function (item) {
        return item.pid == (node == null ? -1 : node.id);
    });
    if (items.length < 1) return;
    items && items.length && items.forEach(function (e) {
        return createMenus(e, menus);
    });
    if (node) node.subMenus = items;
    return items;
}
module.exports = {
    addUser: function (req, res, next) {
        var user = req.body;
        user.createDate = new Date();
        user.password = md5(req.body.password);
        if (req.body.authorizedCode != config.authorizedCode) return res.send({ret: 1, message: '无效的授权码。'});
        mainDAO.findByUserName(req.user.name, req.body.type).then(function (users) {
            if (users && users.length > 0) throw new Error('用户名已存在。');
            delete user.authorizedCode;
            mainDAO.insertUser(user).then(function (result) {
                user.id = result.insertId;
                res.send({ret: 0, data: user});
            })
        }).catch(function (err) {
            res.send({ret: 1, message: err.message});
        });
        return next();
    },
    getUsers: function (req, res, next) {
        var conditions = [];
        if (req.query.class) conditions.push('class like \'%' + req.query.class + '%\'');
        if (req.query.grade) conditions.push('grade like \'%' + req.query.grade + '%\'');
        if (req.query.major) conditions.push('major like \'%' + req.query.major + '%\'');
        mainDAO.findUsers(req.params.type, conditions).then(function (users) {
            res.send({ret: 0, data: users});
        }).catch(function (err) {
            res.send({ret: 1, message: err.message});
        });
        return next();
    },

    updateUser: function (req, res, next) {
        var user = req.body;
        if (user.password) user.password = md5(req.body.password);
        mainDAO.updateUser(user).then(function (result) {
            res.send({ret: 0, message: user.password ? '修改密码成功。' : '更新成功。'});
        }).catch(function (err) {
            res.send({ret: 1, message: err.message});
        });
        return next();
    },
    deleteUser: function (req, res, next) {
        if (req.body.authorizedCode != config.authorizedCode) return res.send({ret: 1, message: '无效的授权码。'});
        mainDAO.deleteUser(req.params.id).then(function (result) {
            res.send({ret: 0, message: '删除成功。'});
        }).catch(function (err) {
            res.send({ret: 1, message: err.message});
        });
        return next();
    },

    getMenus: function (req, res, next) {
        var isStudent = req.params.type == 'student' ? 0 : 1;
        mainDAO.findMenus(isStudent).then(function (menus) {
            res.send({ret: 0, data: createMenus(null, menus)});
        }).catch(function (err) {
            res.send({ret: 1, message: err.message});
        });
        return next();
    },
    postOperationLog: function (req, res, next) {
        mainDAO.findLastOperationLog(req.user.id, req.body.menuId).then(function (items) {
            if (items.length > 0 && !req.body.isExit) throw new Error('未正常退出功能模块错误');
            if (items && items.length < 1 && req.body.isExit) throw new Error('未正常进入功能模块错误');
            if (items.length > 0 && req.body.isExit) return mainDAO.updateOperationLog({
                id: items[0].id,
                endDate: new Date()
            });
            return mainDAO.insertOperationLog({
                menuId: req.body.menuId,
                menuName: req.body.menuName,
                studentId: req.user.id,
                studentName: req.user.name,
                createDate: new Date(),
                startDate: new Date()
            });
        }).then(function (result) {
            res.send({ret: 0, message: '提交操作记录成功。'})
        }).catch(function (err) {
            res.send({ret: 1, message: err.message});
        });
        return next();
    },
    getOperationLog: function (req, res, next) {
        mainDAO.findOperationLog(+req.user.id).then(function (logs) {
            logs && logs.length > 0 && logs.forEach(function (log) {
                log.type = config.assessmentType[+log.type];
            });
            res.send({ret: 0, data: logs});
        }).catch(function (err) {
            res.send({ret: 1, message: err.message});
        });
        return next();
    },

    getAssessmentLog: function (req, res, next) {
        mainDAO.findAssessmentLog(+req.user.id).then(function (logs) {
            logs && logs.length > 0 && logs.forEach(function (log) {
                log.type = config.assessmentType[+log.type];
            });
            res.send({ret: 0, data: logs});
        }).catch(function (err) {
            res.send({ret: 1, message: err.message});
        });
        return next();
    },

    postAssessmentLog: function (req, res, next) {
        var assessmentLog = req.body;
        assessmentLog.createDate = new Date();
        assessmentLog.studentId = req.user.id;
        mainDAO.insertAssessmentLog(assessmentLog).then(function (result) {
            assessmentLog.id = result.insertId;
            res.send({ret: 0, data: assessmentLog});
        }).catch(function (err) {
            res.send({ret: 1, message: err.message});
        });
        return next();
    },

    getFaults: function (req, res, next) {
        mainDAO.findFaults().then(function (faults) {
            res.send({ret: 0, data: faults})
        }).catch(function (err) {
            res.send({ret: 1, message: err.message});
        });
        return next();
    },

    getTheoryExams: function (req, res, next) {
        var data = [];
        mainDAO.findTheoryExams(0, 15).then(function (singleChoiceQuestions) {
            singleChoiceQuestions.length > 0 && singleChoiceQuestions.forEach(function (exam) {
                exam.options = JSON.parse(exam.options);
            });
            data.singleChoiceQuestions = singleChoiceQuestions;
            return mainDAO.findTheoryExams(1, 15);
        }).then(function (trueFalseQuestions) {
            data.trueFalseQuestions = trueFalseQuestions;
            return mainDAO.findTheoryExams(2, 10);
        }).then(function (multipleChoiceQuestions) {
            data.multipleChoiceQuestions = multipleChoiceQuestions;
            multipleChoiceQuestions.length > 0 && multipleChoiceQuestions.forEach(function (exam) {
                exam.options = JSON.parse(exam.options);
            });
            res.send({
                ret: 0,
                data: data.singleChoiceQuestions.concat(data.trueFalseQuestions, data.multipleChoiceQuestions)
            });
        }).catch(function (err) {
            res.send({ret: 1, message: err.message});
        });
        return next();
    },
    postExamAndTrainingConfig: function (req, res, next) {
        var config = _.assign(req.body, {
            createDate: new Date(),
            teacherId: req.user.id,
            isExam: req.params.category == 'exam' ? 0 : 1,
            type: +req.body.type,
            setting: JSON.stringify(req.body.setting)
        });
        mainDAO.insertExamAndTrainingConfig(config).then(function (result) {
            res.send({ret: 0, message: '提交配置成功。'})
        }).catch(function (err) {
            res.send({ret: 1, message: err.message});
        });
        return next();
    },

    getExamAndTrainingConfig: function (req, res, next) {
        mainDAO.findExamAndTrainingConfig(req.params.category == 'exam' ? 0 : 1, +req.params.type).then(function (result) {
            if (result && result.length < 1) return res.send({ret: 0, data: {}});
            if (result[0].setting && result[0].setting.length > 1)
                result[0].setting = JSON.parse(result[0].setting);
            res.send({ret: 0, data: result[0]});
        }).catch(function (err) {
            res.send({ret: 1, message: err.message});
        });
        return next();
    },
    getResourceBy: function (req, res, next) {
        var data = [];
        mainDAO.findResourceBy(req.params.id).then(function (resources) {
            resources && resources.length > 0 && resources.forEach(function (r) {
                data.push(r.resource);
            })
            res.send({ret: 0, data: data});
        }).catch(function (err) {
            res.send({ret: 1, message: err.message});
        });
        return next();
    }
}