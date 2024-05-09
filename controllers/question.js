const db = require('../config/db'); 

const getQuestion = async (req, res) => {
    const { quizCode, subCode } = req.body; 
    try {
        // Query to get total questions (First Query)
        const subData = await db('quiz_subject as A')
            .select('A.questions_assigned as totalQuestions')
            .join('subjectmaster as B', 'A.subject_code', 'B.subject_code')
            .where('A.subject_code', subCode)
            .andWhere('A.quiz_code', quizCode);

        // Query to get total answered questions (Second Query)
        const subAnswered = await db('quiz_answer')
            .countDistinct('mcq_code as totalAnswered')
            .whereIn('mcq_code', function() {
                this.select('A.mcq_code')
                    .from('quiz_mcq as A')
                    .join('subject_topic as B', 'A.topic_code', 'B.topic_code')
                    .where('A.quiz_code', quizCode)
                    .andWhere('B.subject_code', subCode);
            })
            .andWhere('quiz_code', quizCode);

        // Query to get total reviewed questions (Third Query)
        const markReview = await db('quiz_answer')
            .countDistinct('mcq_code as review_count')
            .whereIn('mcq_code', function() {
                this.select('A.mcq_code')
                    .from('quiz_mcq as A')
                    .join('subject_topic as B', 'A.topic_code', 'B.topic_code')
                    .where('A.quiz_code', quizCode)
                    .andWhere('B.subject_code', subCode);
            })
            .andWhere('quiz_code', quizCode)
            .andWhere('is_mark_as_review', 'YES')
            .andWhere('submission_date_time', '=', function() {
                this.select(db.raw('MAX(submission_date_time)'))
                    .from('quiz_answer')
                    .where('quiz_code', quizCode);
            });

        // Query to get mcq_code, status, and review_status (Fourth Query)
        const mcqData = await db.raw(`
            SELECT DISTINCT A.mcq_code,
            CASE
                WHEN A.mcq_code IN (SELECT mcq_code FROM quiz_answer 
                    WHERE quiz_code = ? AND mcq_code = A.mcq_code) THEN 'answered'
                ELSE 'notanswered'
            END AS STATUS,
            CASE
                WHEN A.mcq_code IN (SELECT mcq_code FROM quiz_answer 
                    WHERE quiz_code = ? AND is_mark_as_review = 'YES' 
                    AND mcq_code = A.mcq_code AND submission_date_time = (
                        SELECT MAX(submission_date_time) FROM quiz_answer 
                        WHERE quiz_code = ? AND mcq_code = A.mcq_code
                    )
                ) THEN 'reviewed'
                ELSE 'notreviewed'
            END AS review_status 
            FROM quiz_mcq A 
            WHERE A.quiz_code = ? AND A.mcq_code IN (
                SELECT mcq_code FROM quiz_mcq A, subject_topic B 
                WHERE A.topic_code = B.topic_code AND B.subject_code = ?
            )
        `, [quizCode, quizCode, quizCode, quizCode, subCode]);

        // Extracting necessary data from mcqData
        const questionList = mcqData.rows.map(row => ({
            mcq_code: row.mcq_code,
            STATUS: row.status,
            review_status: row.review_status
        }));

        const output = {
            totalQuestions: subData.length > 0 ? subData[0].totalQuestions : 0,
            totalAnswered: subAnswered.length > 0 ? parseInt(subAnswered[0].totalAnswered) : 0,
            totalReviewed: markReview.length > 0 ? parseInt(markReview[0].review_count) : 0,
            questionList: questionList
        };

        return res.status(200).json({ status: 200, message: "Questions fetched successfully.", result: output });
    } catch (error) {
        console.error("Error in fetching questions:", error);
        return res.status(500).json({ status: 500, message: "Something went wrong. Contact Support.", error: error.message });
    }
};
const getQuestionDetails = async (req, res) => {
    try {
        const { mcqCode, quizCode, userCode, orgCode } = req.body;

        // Query to get question details
        const questionData = await db('quiz_mcq')
            .select('question', 'response_type', 'mark_per_question', 'penalty_factor', 'is_option_shuffle', 'created_by', 'created_on', 'encryption_status')
            .where({ mcq_code: mcqCode, quiz_code: quizCode })
            .first();

        if (!questionData) {
            return res.status(404).json({ status: 404, message: "Question not found" });
        }

        const encryptionStatus = questionData.encryption_status;

        let result = {};

        if (encryptionStatus == 1) {
            const data = await fetch(`https://demomockexam.edusols.com/totalassessment/api/v2/question_decrypt.php?oper=DECRYPT&quiz_code=${quizCode}&mcq_code=${mcqCode}`);
            const questionDataDecrypted = await data.json();

            result.question = questionDataDecrypted.question;
            result.optionList = questionDataDecrypted.optionlist;
        } else {
            // Query to get options
            const optionData = await db('quiz_mcq')
                .select('option1', 'option2', 'option3', 'option4', 'option5')
                .where({ mcq_code: mcqCode, quiz_code: quizCode })
                .first();

        result.question = questionData.question;
            result.optionList = {
                option1: optionData.option1,
                option2: optionData.option2,
                option3: optionData.option3,
                option4: optionData.option4,
                option5: optionData.option5
            };
        }
        result.responseType = questionData.response_type;
        result.mark_per_question = questionData.mark_per_question;
        result.penalty_factor = questionData.penalty_factor;
        result.is_option_shuffle = questionData.is_option_shuffle;
        result.encryptionStatus = encryptionStatus;
        result.created_on = questionData.created_on;
        // result.optionList = optionData;
    

        // Query to get submitted answer
        const submittedData = await db('quiz_answer')
            .select('submitted_answer')
            .where({ mcq_code: mcqCode, quiz_code: quizCode, examinee_code: userCode })
            .orderBy('submission_date_time', 'desc')
            .first();

        if (submittedData) {
            result.submittedAnswer = submittedData.submitted_answer;
        }

        return res.status(200).json({ status: 200, message: "Question details fetched successfully.", result: result });
    } catch (error) {
        console.error("Error fetching question details:", error);
        return res.status(500).json({ status: 500, message: "Something went wrong. Contact Support.", error: error.message });
    }
}
module.exports = { getQuestion,getQuestionDetails };
