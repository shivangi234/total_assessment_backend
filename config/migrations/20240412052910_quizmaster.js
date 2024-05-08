/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('quizmaster', (table) => {
        table.increments('id');
        table.string('quiz_code').notNullable().unique();
        table.string('quiz_name').notNullable();
        table.integer('questions_defined').notNullable();
        table.string('is_questions_defined').notNullable();
        table.integer('questions_assigned');
        table.string('questions_assigned_status').notNullable();
        table.integer('mark_per_question');
        table.integer('total_marks');
        table.integer('pass_mark');
        table.timestamp('quiz_open_date_time').notNullable().defaultTo(knex.fn.now());
        table.timestamp('quiz_close_date_time').notNullable().defaultTo(knex.fn.now());
        table.integer('duration_hours');
        table.integer('duration_minutes');
        table.integer('duration_seconds');
        table.string('examinee_assigned_status').notNullable();
        table.integer('examinee_assigned');
        table.string('is_suffle').notNullable();
        table.string('is_calculator').notNullable();
        table.string('is_show_score').notNullable(); 
        table.string('is_preserve_question_order').notNullable();
        table.string('is_quiz_password').notNullable(); 
        table.string('quiz_password').notNullable(); 
        table.string('is_penalty_applicable').notNullable();
        table.integer('penalty_factor');
        table.string('question_selection_mode').notNullable();
        table.string('show_answer').notNullable();
        table.string('question_mode').notNullable();
        table.string('answer_mode').notNullable();
        table.string('subject_duration_status').notNullable();
        table.string('quiz_status').notNullable();
        table.string('status_message').notNullable();
        table.string('publish_status').notNullable();
        table.text('created_by');
        table.timestamp('created_on').notNullable().defaultTo(knex.fn.now());
        table.string('modified_by');
        table.timestamp('modified_on').notNullable().defaultTo(knex.fn.now());
        table.string('subject_selection').notNullable();
        table.string('org_code').notNullable().unique();
        table.string('set_code').notNullable().unique();
        table.timestamp('fetched_on').notNullable().defaultTo(knex.fn.now());
        table.timestamp('result_updated_on').notNullable().defaultTo(knex.fn.now());
        table.timestamp('photo_fetched_on').notNullable().defaultTo(knex.fn.now());
        table.string('exam_group').notNullable();
        table.string('exam_subgroup').notNullable();
        table.string('examinee_selection').notNullable();
        table.string('question_type').notNullable();
        table.string('duration_type').notNullable();
        table.string('archieve_status').notNullable();
        table.string('lang_code').notNullable().unique();
        table.string('mark_type').notNullable();
        table.string('quiz_instruction').notNullable();
        table.string('is_show_explanantion').notNullable(); 
        table.string('attendance_name').notNullable();
        table.string('show_answer_criteria').notNullable();
        table.timestamp('attendance_uploaded_on').notNullable().defaultTo(knex.fn.now());
        table.string('is_optional_subject').notNullable();
        table.string('no_mandatory_optional').notNullable();
        table.string('web_proctoring').notNullable();
        table.string('is_seb').notNullable();
        table.string('quiz_scheduled_type').notNullable();
        table.timestamp('quiz_start_date_time').notNullable().defaultTo(knex.fn.now());
        table.string('answer_upload_device').notNullable();
        table.string('answer_upload_type').notNullable();
        table.string('is_special_candidate').notNullable();
        table.string('extra_duration_hours').notNullable();
        table.string('extra_duration_minutes').notNullable();
        table.string('extra_duration_seconds').notNullable();
        table.string('exam_center_code').notNullable().unique();
        table.string('is_examfetch').notNullable();
        table.string('is_questionfetch').notNullable();
        table.string('quiz_sync_passcode').notNullable();




        table.timestamps(true, true);
      });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('quizmaster');
};
