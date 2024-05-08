const express = require('express');
const router = express.Router();
const db = require('../config/db');

const { auth } = require('../middleware/auth')

const { createUser,getUsers ,verifyUser} = require('../controllers/users');

const { createOrganization ,getOrganizations } = require('../controllers/organizations');

const { dashboard } = require('../controllers/dashboard');

const { quizList } =  require('../controllers/quizFetch');

const { getSubjectdetails } = require('../controllers/subject');

const { getAllQuiz ,getAllStudent,getAssignedQuizDetails} = require('../controllers/quiz');

const { getQuestion,getQuestionDetails } = require('../controllers/question');

const { saveNext,saveReview,clearResponse ,summary} = require('../controllers/action');

const { sessionAuth } = require('../middleware/session')

const { getSession  } = require('../controllers/session');

router.get("/session",sessionAuth,  getSession);

router.post('/user',createUser );
router.post('/allusers',getUsers );
router.post('/signin',verifyUser );
router.get('/organization',getOrganizations );
router.post('/organizationcreate', auth, sessionAuth,createOrganization );
router.post('/dashboard',dashboard );
router.post('/quiz',getAllQuiz);
router.post('/quizlist', quizList);
router.post('/getallstudent',getAllStudent);
router.post('/quizdetails',getAssignedQuizDetails);
router.post("/quizdetails", sessionAuth, getAssignedQuizDetails);
router.post('/subject', getSubjectdetails);
router.post('/question', getQuestion);
router.post('/questionDetails',getQuestionDetails);
router.post('/saveNext',saveNext);
router.post('/saveReview',saveReview);
router.post('/clearResponse',clearResponse);
router.post('/summary',summary);





//for checking data insertion on table through api
//suject_topic
router.post('/topic', async (req, res) => {
  const {  
    subject_topic_id,
    topic_code,
    topic_name,
    subject_code,
    created_by,
    created_on,
    modified_by,
    modified_on
  } = req.body;
   console.log('Request Body:', req.body);
  try {
    const [id] = await db('subject_topic')
      .insert({
        subject_topic_id,
        topic_code,
        topic_name,
        subject_code,
        created_by,
        created_on,
        modified_by,
        modified_on
      })
      .returning('id');

    res.status(201).json({ id });
  } catch (error) {
    console.error('Error inserting question:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
//quizmaster
  router.post('/quizmaster', async (req, res) => {
    const { quiz_code,quiz_name,questions_defined,is_questions_defined,questions_assigned ,questions_assigned_status, mark_per_question,total_marks, pass_mark,
    quiz_open_date_time,quiz_close_date_time,duration_hours,duration_minutes, duration_seconds,examinee_assigned_status,examinee_assigned,is_suffle,is_calculator,is_show_score,is_preserve_question_order,is_quiz_password,quiz_password,is_penalty_applicable,penalty_factor,question_selection_mode,show_answer,question_mode,
    answer_mode,subject_duration_status,quiz_status,status_message,publish_status,created_by,created_on,modified_by,modified_on,subject_selection,org_code,
    set_code,fetched_on,result_updated_on,photo_fetched_on,exam_group,exam_subgroup,examinee_selection,question_type,duration_type,archieve_status,lang_code,
    mark_type,quiz_instruction,is_show_explanantion,attendance_name,show_answer_criteria,attendance_uploaded_on,is_optional_subject,no_mandatory_optional,
    web_proctoring,is_seb,quiz_scheduled_type,quiz_start_date_time,answer_upload_device,answer_upload_type,is_special_candidate,extra_duration_hours,
    extra_duration_minutes,extra_duration_seconds,exam_center_code,is_examfetch,is_questionfetch,quiz_sync_passcode,
    } = req.body;
     console.log('Request Body:', req.body);
    try {
      const [id] = await db('quizmaster')
        .insert({
          quiz_code,
          quiz_name,
          questions_defined,
          is_questions_defined ,
          questions_assigned,
          questions_assigned_status,
          mark_per_question,
          total_marks,
          pass_mark,
          quiz_open_date_time,
          quiz_close_date_time,
          duration_hours,
          duration_minutes,
          duration_seconds,
          examinee_assigned_status,
          examinee_assigned,
          is_suffle,
          is_calculator,is_show_score,
          is_preserve_question_order,
          is_quiz_password,
          quiz_password,
          is_penalty_applicable,
          penalty_factor,
          question_selection_mode,
          show_answer,
          question_mode,
          answer_mode,
          subject_duration_status,
          quiz_status,
          status_message,
          publish_status,
          created_by,
          created_on,
          modified_by,
          modified_on,
          subject_selection,
          org_code,
          set_code,
          fetched_on,
          result_updated_on,
          photo_fetched_on,
          exam_group,
          exam_subgroup,
          examinee_selection,
          question_type,
          duration_type,
          archieve_status,
          lang_code,
          mark_type,
          quiz_instruction,
          is_show_explanantion,
          attendance_name,
          show_answer_criteria,
          attendance_uploaded_on,
          is_optional_subject,
          no_mandatory_optional,
          web_proctoring,
          is_seb,
          quiz_scheduled_type,
          quiz_start_date_time,
          answer_upload_device,
          answer_upload_type,
         is_special_candidate,
          extra_duration_hours,
          extra_duration_minutes,
          extra_duration_seconds,
          exam_center_code,
          is_examfetch,
          is_questionfetch,
          quiz_sync_passcode,
        })
        .returning('id');
  
      res.status(201).json({ id });
    } catch (error) {
      console.error('Error loading quiz:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  router.get('/allquiz', async (req, res) => {
    try {
      const allQuiz = await db('quizmaster').select('*');
      res.json(allQuiz);
    } catch (error) {
      console.error('Error fetching all quiz:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
//subjectmaster
  router.post('/subjectmaster', async (req, res) => {
    const {  subject_id,subject_name,subject_code, subject_abbr,created_by,created_on,modified_by,modified_on,col_1,
      col_2
    } = req.body;
     console.log('Request Body:', req.body);
    try {
      const [id] = await db('subjectmaster')
        .insert({
          subject_id,
          subject_name,
          subject_code,
          subject_abbr,
          created_by,
          created_on,
          modified_by,
          modified_on,
          col_1,
          col_2
        })
        .returning('id');
  
      res.status(201).json({ id });
    } catch (error) {
      console.error('Error inserting subject:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  router.get('/allsubject', async (req, res) => {
    try {
      const allQuiz = await db('subjectmaster').select('*');
      res.json(allQuiz);
    } catch (error) {
      console.error('Error fetching all quiz:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
//quizmcq
  router.post('/quizmcq', async (req, res) => {
    const {  
      quiz_code,
      mcq_code,
     created_by,
       created_on,
      modified_by,
       modified_on,
      question,
       option1,
       option2,
       option3,
       option4,
       option5,
       explanation,
       reference,
       answer,
       topic_code,
       difficulty_level,
       no_of_questions,
       parent_mcq_code,
       childmcq_seq_no,
       verification_status,
       verified_by,
       verified_on,
       response_type,
       mark_per_question,
       penalty_factor,
       is_option_shuffle,
       weightage,
       encryption_status,
      answer_update_status,
    } = req.body;
     console.log('Request Body:', req.body);
    try {
      const [id] = await db('quiz_mcq')
        .insert({
          quiz_code,
         mcq_code,
        created_by,
          created_on,
         modified_by,
          modified_on,
         question,
          option1,
          option2,
          option3,
          option4,
          option5,
          explanation,
          reference,
          answer,
          topic_code,
          difficulty_level,
          no_of_questions,
          parent_mcq_code,
          childmcq_seq_no,
          verification_status,
          verified_by,
          verified_on,
          response_type,
          mark_per_question,
          penalty_factor,
          is_option_shuffle,
          weightage,
          encryption_status,
         answer_update_status,
        })
        .returning('id');
  
      res.status(201).json({ id });
    } catch (error) {
      console.error('Error inserting question:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
//quizanswer
  router.post('/quizanswer', async (req, res) => {
    const {  
      quiz_answer_id,
      examinee_code,
      quiz_code,
      mcq_code,
      submitted_answer,
      submission_date_time,
      correct_answer,
      final_score,
      is_result_updated,
      is_mark_as_review
    } = req.body;
     console.log('Request Body:', req.body);
    try {
      const [id] = await db('quiz_answer')
        .insert({
          quiz_answer_id,
          examinee_code,
          quiz_code,
          mcq_code,
          submitted_answer,
          submission_date_time,
          correct_answer,
          final_score,
          is_result_updated,
          is_mark_as_review
        })
        .returning('id');
  
      res.status(201).json({ id });
    } catch (error) {
      console.error('Error inserting quizanswer:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
//quizexaminee
  router.post('/quizexaminee', async (req, res) => {
    const {  
      quiz_code,
      examinee_code,
      start_time,
      time_elapsed,
      end_time,
      attempt_number,
      questions_attempted,
      correct_answers,
      incorrect_answers,
      final_score,
      is_result_updated,
      is_mark_entered,
      assigned_by,
      assigned_on,
      created_by,
      created_on,
      modified_by,
      modified_on,
      assigned_room,
      assigned_ip,
      accessed_ip,
      assigned_system_no,
      exam_center_code,
      quiz_subject_code,
      qustion_sequence_no,
      review1_status,
      review2_status,
      analyze_status,
      grace_time_history,
      grace_status,
      grace_time,
      special_candidate_status,
      status,
      stop_status,
    } = req.body;
     console.log('Request Body:', req.body);
    try {
      const [id] = await db('quiz_examinee')
        .insert({
          quiz_code,
          examinee_code,
          start_time,
          time_elapsed,
          end_time,
          attempt_number,
          questions_attempted,
          correct_answers,
          incorrect_answers,
          final_score,
          is_result_updated,
          is_mark_entered,
          assigned_by,
          assigned_on,
          created_by,
          created_on,
          modified_by,
          modified_on,
          assigned_room,
          assigned_ip,
          accessed_ip,
          assigned_system_no,
          exam_center_code,
          quiz_subject_code,
          qustion_sequence_no,
          review1_status,
          review2_status,
          analyze_status,
          grace_time_history,
          grace_status,
          grace_time,
          special_candidate_status,
          status,
          stop_status,
        })
        .returning('id');
  
      res.status(201).json({ id });
    } catch (error) {
      console.error('Error inserting quiz examinee:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  //quizsubject
  router.post('/quizsubject', async (req, res) => {
    const {  
      quiz_subject_id,
      quiz_code,
      subject_code,
      questions_defined,
      is_questions_assigned,
      questions_assigned,
      question_assign_status,
      is_shuffle,
      question_selection_mode,
      question_selection_status,
      quiz_duration,
      duration_hours,
      duration_minutes,
      duration_seconds,
      duration_status,
      created_by,
      created_on,
      modified_by,
      modified_on,
      subject_order,
      mark_per_question,
      total_marks,
      is_penalty_applicble,
      penalty_factor,
      quiz_type,
      subject_type,
    } = req.body;
     console.log('Request Body:', req.body);
    try {
      const [id] = await db('quiz_subject')
        .insert({
          quiz_subject_id,
          quiz_code,
          subject_code,
          questions_defined,
          is_questions_assigned,
          questions_assigned,
          question_assign_status,
          is_shuffle,
          question_selection_mode,
          question_selection_status,
          quiz_duration,
          duration_hours,
          duration_minutes,
          duration_seconds,
          duration_status,
          created_by,
          created_on,
          modified_by,
          modified_on,
          subject_order,
          mark_per_question,
          total_marks,
          is_penalty_applicble,
          penalty_factor,
          quiz_type,
          subject_type,
        })
        .returning('id');
  
      res.status(201).json({ id });
    } catch (error) {
      console.error('Error inserting quiz subject:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  //config
  router.post('/config', async (req, res) => {
    const {  
      config_id,
      board_text,
      course_text,
      col_1_text,
      col_2_text,
      topic_text,
      examinee_text,
      quiz_text,
      level1_verification_text,
      level2_verification_text,
      org_code,
      regd_approved_status,
      no_of_examinee,
      no_of_exams,
    } = req.body;
     console.log('Request Body:', req.body);
    try {
      const [id] = await db('config')
        .insert({
          config_id,
          board_text,
          course_text,
          col_1_text,
          col_2_text,
          topic_text,
          examinee_text,
          quiz_text,
          level1_verification_text,
          level2_verification_text,
          org_code,
          regd_approved_status,
          no_of_examinee,
          no_of_exams,
        })
        .returning('id');
  
      res.status(201).json({ id });
    } catch (error) {
      console.error('Error inserting config:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
   //config
   router.post('/description', async (req, res) => {
    const {  
      description_id,
      catagory_code,
      code,
     description,
     org_code
    } = req.body;
     console.log('Request Body:', req.body);
    try {
      const [id] = await db('code_description')
        .insert({
          description_id,
          catagory_code,
          code,
         description,
         org_code
        })
        .returning('id');
  
      res.status(201).json({ id });
    } catch (error) {
      console.error('Error inserting config:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
module.exports = router;
