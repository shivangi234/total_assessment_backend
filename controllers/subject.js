const db = require('../config/db');

const getSubjectdetails = async (req, res) => {
    const { quizCode, userCode } = req.body;
    try {
        const quizData = await db('quizmaster')
            .select('*')
            .where('quiz_code', quizCode)
            .first();

        if (!quizData) {
            return res.status(404).json({ status: 404, message: "Quiz not found." });
        }

        const countAnswer = await db('quiz_answer')
            .countDistinct('mcq_code as totalAnsCount')
            .where('quiz_code', quizCode)
            .andWhere('examinee_code', userCode)
            .first();

        const output = {
            quizCode: quizCode,
            quizName: quizData.quiz_name,
            durationHours: quizData.duration_hours,
            durationMinutes: quizData.duration_minutes,
            quizOpenDateTime: quizData.quiz_open_date_time,
            quizCloseDateTime: quizData.quiz_close_date_time,
            startTime: quizData.start_time,
            endTime: quizData.end_time,
            totalMarks: quizData.total_marks,
            penalty: quizData.penalty_factor,
            optionShuffle: quizData.is_shuffle,
            isCalculator: quizData.is_calculator,
            isOptionalSubject: quizData.is_optional_subject,
            webProctoring: quizData.web_proctoring,
            isSeb: quizData.is_seb,
            totalQuestions: quizData.questions_assigned,
            totalAnswered: countAnswer.totalAnsCount
        };

        let subjectQuery = db
            .select('subjectmaster.subject_id', 'quiz_subject.subject_code', 'subjectmaster.subject_name', 'quiz_subject.is_shuffle', 'quiz_subject.questions_assigned as totalQuestions')
            .select(db.raw(`
                (
                    SELECT COUNT(DISTINCT mcq_code)
                    FROM quiz_answer
                    WHERE quiz_code = '${quizCode}' AND mcq_code IN (
                        SELECT mcq_code
                        FROM quiz_mcq
                        JOIN subject_topic ON quiz_mcq.topic_code = subject_topic.topic_code
                        WHERE quiz_mcq.quiz_code = '${quizCode}' AND subject_topic.subject_code = quiz_subject.subject_code
                    )
                ) as totalAnswered
            `))
            .select('quiz_subject.mark_per_question as markPerQuestion', 'quiz_subject.penalty_factor as penaltyFactor')
            .from('quiz_subject')
            .leftJoin('subjectmaster', 'quiz_subject.subject_code', 'subjectmaster.subject_code')
            .leftJoin('quiz_subject_selection', function() {
                this.on('quiz_subject.quiz_code', '=', 'quiz_subject_selection.quiz_code')
                    .andOn('quiz_subject.subject_code', '=', 'quiz_subject_selection.subject_code');
            })
            .where('quiz_subject.quiz_code', quizCode)
            .andWhere(function() {
                this.where('quiz_subject.subject_type', '')
                    .orWhere(function() {
                        this.where('quiz_subject.subject_type', '')
                            .andWhere('quiz_subject_selection.subject_code', 'IS NOT', null)
                            .andWhere('quiz_subject_selection.quiz_code', quizCode)
                            .andWhere('quiz_subject_selection.examinee_code', userCode);
                    });
            })
            .orderBy('quiz_subject.subject_order');

        if (quizData.is_optional_subject == 'YES') {
            subjectQuery.andWhere('subject_type', '');
        }
        const subjectData = await subjectQuery;

        // Modify the field name here
        const modifiedSubjectData = subjectData.map(subject => ({
            ...subject,
            totalAnswered: subject.totalanswered // Change totalanswered to totalAnswered
        }));

        output.subjectList = modifiedSubjectData;
         // Remove the totalanswered field
         output.subjectList.forEach(subject => delete subject.totalanswered);

        return res.status(200).json({ status: 200, message: "Quiz Subject details fetched successfully.", result: output });
    } catch (error) {
        console.error("Error in getSubjectdetails:", error);
        return res.status(500).json({ status: 500, message: "Internal server error. Contact Support.", error });
    }
};

module.exports = { getSubjectdetails };
