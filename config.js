'use strict';

module.exports = {
    server: {
        name: 'stacker app restful api',
        version: '0.0.1',
        host: '0.0.0.0',
        port: 3000
    },
    socketServer: {
        host: '0.0.0.0',
        port: 3001
    },
    multipleStatements: true, db: {
        host: '127.0.0.1',
        port: '3306',
        user: 'root',
        password: 'Heqiao75518?',
        debug: false,
        dateStrings: true,
        database: 'stackerTeaching',
        charset: 'UTF8MB4_GENERAL_CI'
    },
    assessmentType: ['理论测评','电气维修测评', '驾驶测评'],
    authorizedCode: '910208'
};

