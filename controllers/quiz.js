const db = require('../config/db');

const getAssignedQuizDetails = async (req, res) => {
    const { userCode, orgCode } = req.body;
    console.log(req.body.userCode);
    console.log(req.body.orgCode);
    try {
        const examineeSelection = 'SPECIFY';
        const questionsAssignedStatus = 'OK';
        const examineeAssignedStatus = 'OK';
        const publishStatus = 'PUBLISHED';

        // QUIZ INFORMATION
        const quizResult = await db('quizmaster as A')
            .select('A.*', 'start_time', 'end_time', 'special_candidate_status')
            .join('quiz_examinee as B', 'A.quiz_code', 'B.quiz_code')
            .where('A.examinee_selection', examineeSelection)
            .andWhere('B.examinee_code', userCode)
            .andWhere('questions_assigned_status', questionsAssignedStatus)
            .andWhere('examinee_assigned_status', examineeAssignedStatus)
            .andWhere('publish_status', publishStatus)
            .andWhere('A.created_by', 'in', db.select('user_code').from('usermaster').where('org_code', orgCode))
            .orderBy('created_on', 'desc')
            .limit(1);

        if (quizResult.length === 0) {
            return res.status(404).json({ status: 404, message: "No quiz found for the specified criteria." });
        }

        const quizData = quizResult[0];
        const quizCode = quizData.quiz_code;

        const output = {
            quizCode: quizCode,
            quizName: quizData.quiz_name,
            durationHours: quizData.duration_hours,
            durationMinutes: quizData.duration_minutes,
            durationSeconds: quizData.duration_seconds,
            quizOpenDateTime: quizData.quiz_open_date_time,
            quizCloseDateTime: quizData.quiz_close_date_time,
            startTime: quizData.start_time,
            endTime: quizData.end_time,
            totalQuestions: quizData.questions_assigned,
            totalMarks: quizData.total_marks,
            markPerQuestion:quizData.mark_per_question,
            penalty: quizData.penalty_factor,
            subjects: []
        };  

        // SUBJECT INFORMATION
        const allSubjectsResult = await db('quiz_subject as A')
            .select('A.subject_code', 'B.subject_name', 'A.questions_assigned', 'A.total_marks', 'A.mark_per_question', 'A.penalty_factor')
            .join('subjectmaster as B', 'A.subject_code', 'B.subject_code')
            .join('quizmaster as C', 'A.quiz_code', 'C.quiz_code')
            .where('A.quiz_code', quizCode);

        if (allSubjectsResult.length === 0) {
            return res.status(404).json({ status: 404, message: "No subjects found for the specified quiz." });
        }

        output.subjects = allSubjectsResult;

        return res.status(200).json({ status: 200, message: "Quiz details fetched successfully.", result: output });
    } catch (error) {
        console.error("Error in getAssignedQuizDetails:", error);
        return res.status(500).json({ status: 500, message: "Internal server error. Contact Support.", error });
    }
}
//find all the quiz
const getAllQuiz = async(req,res) => {

    const { orgCode } = req.body;

    try {
        const quizDetails = await db
            .select('quizmaster.quiz_code', 'quizmaster.quiz_name', 'quizmaster.quiz_open_date_time', 'quizmaster.quiz_close_date_time')
            .from('quizmaster')
            .leftJoin('organizationmaster', 'quizmaster.org_code', 'organizationmaster.org_code')
            .where('quizmaster.org_code', orgCode)
            .groupBy('quizmaster.quiz_code', 'quizmaster.quiz_name', 'quizmaster.quiz_open_date_time', 'quizmaster.quiz_close_date_time')
            .orderByRaw('MAX(quizmaster.created_on) DESC');

        return res.status(200).json({ status: 200, data: quizDetails });
    } catch (error) {
        return res.status(500).json({ status: 500, message: "Something went wrong. Contact Support.", error });
    }
}

//fetch all students
const getAllStudent = async(req,res) => {
    const { quizCode, orgCode } = req.body;

    try {
        const students = await db.raw(`
            SELECT DISTINCT B.examinee_code, CONCAT(C.first_name, ' ', C.last_name) AS fullname 
            FROM quiz_examinee B 
            LEFT JOIN usermaster C ON B.examinee_code = C.user_code 
            LEFT JOIN quizmaster A ON B.quiz_code = A.quiz_code 
            WHERE A.quiz_code = ? AND A.org_code = ?
        `, [quizCode, orgCode]);

        return res.status(200).json({ status: 200, data: students.rows });
    } catch (error) {
        return res.status(500).json({ status: 500, message: "Something went wrong. Contact Support.", error });
    }
}

module.exports = { getAllQuiz,getAllStudent ,getAssignedQuizDetails}