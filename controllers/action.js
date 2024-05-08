const db = require('../config/db');

const saveNext = async (req, res) => {
    const session = req.session;
    var attemptNumber =  session.ATTEMPT_NUMBER;
    attemptNumber = '1';

    var { subCode, mcqCode, userCode, quizCode, submittedAnswer } = req.body;
    try {
        // Insert submitted answer into quiz_answer table
        await db('quiz_answer').insert({
            examinee_code: userCode,
            quiz_code: quizCode,
            mcq_code: mcqCode,
            submitted_answer: submittedAnswer,
            submission_date_time: db.fn.now()
        });

        // Insert user_quiz_activity based on whether subCode is provided or not
        if (subCode == '') {
            await db('user_quiz_activity').insert({
                examinee_code: userCode,
                quiz_code: quizCode,
                attempt_number: attemptNumber,
                access_time: db.fn.now() 
            });
        } else {
            await db('user_quiz_activity').insert({
                subject_code: subCode,
                examinee_code: userCode,
                quiz_code: quizCode,
                attempt_number: attemptNumber,
                access_time: db.fn.now() 
            });
        }

        return res.status(200).json({ status: 200, message: "Data Inserted Successfully." });

    } catch (error) {
        console.error("Error inserting data:", error);
        return res.status(500).json({ status: 500, message: "Something went wrong. Contact Support.", error: error.message });
    }
}
const saveReview = async (req, res) => {
    try {
    const session = req.session;
    var attemptNumber =  session.ATTEMPT_NUMBER;
    attemptNumber = '1';

        var { subCode, mcqCode, userCode, quizCode, submittedAnswer } = req.body;

        // Insert submitted answer with review status into quiz_answer table
        await db('quiz_answer').insert({
            examinee_code: userCode,
            quiz_code: quizCode,
            mcq_code: mcqCode,
            submitted_answer: submittedAnswer,
            submission_date_time: db.fn.now(), 
            is_mark_as_review: 'YES'
        });

        // Insert user_quiz_activity based on whether subCode is provided or not
        if (subCode == '') {
            await db('user_quiz_activity').insert({
                examinee_code: userCode,
                quiz_code: quizCode,
                attempt_number: attemptNumber,
                access_time: db.fn.now() 
            });
        } else {
            await db('user_quiz_activity').insert({
                subject_code: subCode,
                examinee_code: userCode,
                quiz_code: quizCode,
                attempt_number: attemptNumber
            });
        }

        return res.status(200).json({ status: 200, message: "Data Inserted Successfully." });

    } catch (error) {
        console.error("Error inserting data:", error);
        return res.status(500).json({ status: 500, message: "Something went wrong. Contact Support.", error: error.message });
    }
}
const clearResponse = async (req, res) => {
    try {
        const session = req.session;
        var attemptNumber =  session.ATTEMPT_NUMBER;
        attemptNumber = '1';
        var { subCode, mcqCode, userCode, quizCode, submittedAnswer } = req.body;

        // Delete previous response for the given user, quiz, and mcq
        await db('quiz_answer')
            .where({ examinee_code: userCode, quiz_code: quizCode, mcq_code: mcqCode })
            .del();

        // Insert user_quiz_activity based on whether subCode is provided or not
        if (subCode == '') {
            await db('user_quiz_activity').insert({
                examinee_code: userCode,
                quiz_code: quizCode,
                attempt_number: attemptNumber,
                access_time: db.fn.now() 
            });
        } else {
            await db('user_quiz_activity').insert({
                subject_code: subCode,
                examinee_code: userCode,
                quiz_code: quizCode,
                attempt_number: attemptNumber,
                access_time: db.fn.now() 
            });
        }

        return res.status(200).json({ status: 200, message: "Data Inserted Successfully." });

    } catch (error) {
        console.error("Error clearing response:", error);
        return res.status(500).json({ status: 500, message: "Something went wrong. Contact Support.", error: error.message });
    }
}
// const summary = async (req, res) => {
//     try {
//         const { quizCode } = req.body;

//         const summary = await db.raw(`
//             SELECT
//                 B.subject_name AS subject,
//                 A.questions_assigned AS totalQuestions,
//                 (
//                     SELECT COUNT(DISTINCT QA.mcq_code)
//                     FROM quiz_answer AS QA
//                     WHERE QA.quiz_code = ?
//                     AND QA.mcq_code IN (
//                         SELECT QM.mcq_code
//                         FROM quiz_mcq AS QM
//                         JOIN subject_topic AS ST ON QM.topic_code = ST.topic_code
//                         WHERE QM.quiz_code = ?
//                         AND ST.subject_code = A.subject_code
//                     )
//                 ) AS totalAnswered
//             FROM
//                 quiz_subject AS A
//             LEFT JOIN
//                 subjectmaster AS B ON A.subject_code = B.subject_code
//             WHERE
//                 A.quiz_code = ?
//         `, [quizCode, quizCode, quizCode]);

//         return res.status(200).json({ status: 200, message: "Quiz Summary Data fetched successfully.", result: summary.rows });
//     } catch (error) {
//         console.error("Error fetching quiz summary:", error);
//         return res.status(500).json({ status: 500, message: "Something went wrong. Contact Support.", error: error.message });
//     }
// }
const summary = async (req, res) => {
    try {
        const { quizCode } = req.body;

        const viewScore = await db('quizmaster')
            .select('is_show_score')
            .where('quiz_code', quizCode)
            .first();

        const score = viewScore ? viewScore.is_show_score : null;

        const result = await db('quiz_subject AS A')
            .select(
                'B.subject_name AS subject',
                'A.questions_assigned AS totalQuestions',
                db.raw(`
                    (
                        SELECT COUNT(DISTINCT QA.mcq_code)
                        FROM quiz_answer AS QA
                        JOIN quiz_mcq AS QM ON QA.mcq_code = QM.mcq_code
                        JOIN subject_topic AS ST ON QM.topic_code = ST.topic_code
                        WHERE QA.quiz_code = ?
                        AND QM.quiz_code = ?
                        AND ST.subject_code = "A"."subject_code"
                    ) AS totalAnswered
                `, [quizCode, quizCode])
            )
            .leftJoin('subjectmaster AS B', 'A.subject_code', 'B.subject_code')
            .where('A.quiz_code', quizCode);

        const summary = result.map(item => ({
            subject: item.subject,
            totalQuestions: item.totalQuestions,
            totalAnswered: parseInt(item.totalanswered) // Parse to integer/convert totalanswered to totalAnswered
        }));

        return res.status(200).json({
            status: 200,
            message: "Quiz Summary Data fetched successfully.",
            result: {
                summary: summary 
            }
        });
    } catch (error) {
        console.error("Error fetching quiz summary:", error);
        return res.status(500).json({
            status: 500,
            message: "Something went wrong. Contact Support.",
            error: error.message
        });
    }
}

module.exports = { saveNext,saveReview,clearResponse,summary };
