const db = require('../config/db');

const quizList = async(req,res) => {
    const { orgCode, questionType, isExamFetch, quizOpenDateTime, quizCloseDateTime } = req.body;

    try {
        const quizDetails = await db('quizmaster')
            .select('quiz_code', 'quiz_name', 'question_type', 'is_examfetch', 'photo_fetched_on', 'quiz_open_date_time', 'quiz_close_date_time')
            .where({
                org_code: orgCode,
                question_type: questionType,
                is_examfetch: isExamFetch,
                quiz_open_date_time: quizOpenDateTime,
                quiz_close_date_time: quizCloseDateTime
            });

        return res.status(200).json({ status: 200,message: "Data fetched successfully.",  data: quizDetails });
    } catch (error) {
        console.error("Error in quizList:", error);
        return res.status(500).json({ status: 500, message: "Something went wrong. Contact Support.", error });
    }
}

module.exports = { quizList } ;