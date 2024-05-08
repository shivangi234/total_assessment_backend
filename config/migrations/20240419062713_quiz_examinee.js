/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('quiz_examinee', (table) => {
        table.increments('id');
        table.string('quiz_code').notNullable().unique();
        table.string('examinee_code').notNullable().unique();
        table.timestamp('start_time').notNullable().defaultTo(knex.fn.now());
        table.integer('time_elapsed');
        table.timestamp('end_time').notNullable().defaultTo(knex.fn.now());
        table.integer('attempt_number');
        table.integer('questions_attempted');
        table.integer('correct_answers');
        table.integer('incorrect_answers');
        table.integer('final_score');
        table.string('is_result_updated');
        table.string('is_mark_entered');
        table.string('assigned_by');
        table.timestamp('assigned_on').notNullable().defaultTo(knex.fn.now());
        table.text('created_by');
        table.timestamp('created_on').notNullable().defaultTo(knex.fn.now());
        table.string('modified_by');
        table.timestamp('modified_on').notNullable().defaultTo(knex.fn.now());
        table.string('assigned_room');
        table.bigInteger('assigned_ip');
        table.bigInteger('accessed_ip');
        table.integer('assigned_system_no');
        table.string('exam_center_code');
        table.string('quiz_subject_code');
        table.integer('qustion_sequence_no');
        table.string('review1_status');
        table.string('review2_status');
        table.string('analyze_status');
        table.string('grace_time_history');
        table.string('grace_status');
        table.string('grace_time');
        table.string('special_candidate_status');
        table.string('status');
        table.string('stop_status');

        table.timestamps(true, true);
      });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('quiz_examinee');
};
