/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('quiz_subject', (table) => {
        table.increments('id');
        table.string('quiz_subject_id').unique();
        table.string('quiz_code');
        table.string('subject_code').notNullable().unique();
        table.integer('questions_defined');
        table.string('is_questions_assigned');
        table.integer('questions_assigned');
        table.string('question_assign_status');
        table.string('is_suffle');
        table.string('question_selection_mode');
        table.string('question_selection_status');
        table.integer('quiz_duration');
        table.integer('duration_hours');
        table.integer('duration_minutes');
        table.integer('duration_seconds');
        table.integer('duration_status');
        table.string('created_by');
        table.timestamp('created_on').notNullable().defaultTo(knex.fn.now());
        table.string('modified_by');
        table.timestamp('modified_on').notNullable().defaultTo(knex.fn.now());
        table.integer('subject_order');
        table.integer('mark_per_question');
        table.integer('total_marks');
        table.string('is_penalty_applicble');
        table.integer('penalty_factor');
        table.string('quiz_type');
        table.string('subject_type');
        
        table.timestamps(true, true);
      });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('quiz_subject');
};
