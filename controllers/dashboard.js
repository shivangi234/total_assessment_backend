const db = require('../config/db');

const dashboard = async (req, res) => {
    const { userCode, orgCode } = req.body;
    try {
        console.log("UserCode:", userCode);
        console.log("OrgCode:", orgCode);

        // Test the main query without using subquery
        const quizDetailsQuery = db
            .select('quizmaster.*')
            .select(db.raw("TO_CHAR(quizmaster.quiz_open_date_time, 'YYYY-MM-DD') AS formatted_quiz_open_date_time"))
            .from('quizmaster')
            .innerJoin('quiz_examinee', 'quizmaster.quiz_code', 'quiz_examinee.quiz_code')
            .where('quiz_examinee.examinee_code', userCode)
            .andWhere('quizmaster.created_by', 'EXAMINERSTLIND') // Directly using userCode for created_by
            .orderBy('quizmaster.created_on', 'desc');

        console.log("Query:", quizDetailsQuery.toString());

        const quizDetails = await quizDetailsQuery;

        console.log("Result:", quizDetails);
        
       const data=quizDetails[0].quiz_name; 

        if (quizDetails.length > 0) {
            return res.status(200).json({ status: 200, message: "Quiz fetched successfully", data});
        } else {
            return res.status(404).json({ status: 404, message: "No quizzes found." });
        }
    } catch (error) {
        return res.status(500).json({ status: 500, message: "Something went wrong. Contact Support.", error });
    }
}

module.exports = { dashboard };
