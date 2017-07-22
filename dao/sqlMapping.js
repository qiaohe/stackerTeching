module.exports = {
    stackerTeaching: {
        findByUserName: 'select * from user where name=? and type = ?',
        findByUserById: 'select * from user where id=?',
        findByToken: 'select * from user where token=?',
        updateUser: 'update user set ? where id = ? ',
        insertUser: 'insert user set ?',
        findFaults: 'select * from faultLib',
        deleteUser: 'delete from user where id = ?',
        findOperationLog: 'select id, menuId, menuName, startDate, endDate from operationLog where studentId=?',
        findAssessmentLog: 'select id, score, startDate, endDate, type,mode,difficulty from assessmentLog where studentId=?',
        insertAssessmentLog: 'insert assessmentLog set ?',
        insertExamAndTrainingConfig: 'insert examAndTrainingConfig set ?',
        findExamAndTrainingConfig: 'select * from examAndTrainingConfig where isExam = ? and type = ?',
        findTheoryExams: 'select id, question, options, answer, code from theoryExamLib where type=? ORDER BY RAND() LIMIT ?',
        insertOperationLog: 'insert operationLog set ? ',
        updateOperationLog: 'update operationLog set ? where id = ?',
        findLastOperationLog: 'select * from operationLog where startDate is not null and endDate is null and studentId= ? and menuId = ?',
        findMenus: 'select id, name, icon, label, pid,type, action from menu where isStudent = ?',
        findUsers: 'select id, name, type,createDate, lastLogoutDate, lastEditDate, lastLogonDate, studentNo, grade, class, major from user where type=?',
        findResourceBy: 'select resource from resourceLib where menuId=?'
    }
}
