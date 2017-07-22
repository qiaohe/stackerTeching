var authController = require('./controller/authController');
var mainController = require('./controller/mainController');
module.exports = [
    {
        method: "post",
        path: "/api/login",
        handler: authController.login
    },
    {
        method: "post",
        path: "/api/logout",
        handler: authController.logout,
        secured: 'user'
    },
    {
        method: "post",
        path: "/api/users",
        handler: mainController.addUser,
        secured: 'user'
    },
    {
        method: "post",
        path: "/api/users/changePwd",
        handler: mainController.updateUser,
        secured: 'user'
    },
    {
        method: "post",
        path: "/api/users/:id/remove",
        handler: mainController.deleteUser,
        secured: 'user'
    },

    {
        method: "get",
        path: "/api/users/type/:type",
        handler: mainController.getUsers,
        secured: 'user'
    },
    {
        method: "get",
        path: "/api/:type/menus",
        handler: mainController.getMenus,
        secured: 'user'
    },
    {
        method: "post",
        path: "/api/operationLogs",
        handler: mainController.postOperationLog,
        secured: 'user'
    },
    {
        method: "get",
        path: "/api/operationLogs",
        handler: mainController.getOperationLog,
        secured: 'user'
    },
    {
        method: "get",
        path: "/api/assessmentLogs",
        handler: mainController.getAssessmentLog,
        secured: 'user'
    },
    {
        method: "post",
        path: "/api/assessmentLog",
        handler: mainController.postAssessmentLog,
        secured: 'user'
    },
    {
        method: "get",
        path: "/api/faults",
        handler: mainController.getFaults,
        secured: 'user'
    },
    {
        method: "get",
        path: "/api/theoryExams",
        handler: mainController.getTheoryExams,
        secured: 'user'
    },
    {
        method: "post",
        path: "/api/:category/config",
        handler: mainController.postExamAndTrainingConfig,
        secured: 'user'
    },
    {
        method: "get",
        path: "/api/:category/type/:type/config",
        handler: mainController.getExamAndTrainingConfig,
        secured: 'user'
    },
    {
        method: "post",
        path: "/api/users/:id/login",
        handler: authController.loginWithUserId,
        secured: 'user'
    },
    {
        method: "get",
        path: "/api/menus/:id/resources",
        handler: authController.getResourceBy,
        secured: 'user'
    }
];
