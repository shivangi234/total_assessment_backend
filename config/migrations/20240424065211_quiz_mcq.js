/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('quiz_mcq', (table) => {
        table.increments('id');
        table.string('quiz_code');
        table.string('mcq_code');
        table.text('created_by');
        table.timestamp('created_on').defaultTo(knex.fn.now());
        table.string('modified_by');
        table.timestamp('modified_on').notNullable().defaultTo(knex.fn.now());
        table.string('question');
        table.string('option1');
        table.string('option2');
        table.string('option3');
        table.string('option4');
        table.string('option5');
        table.string('explanation');
        table.string('reference');
        table.string('answer');
        table.string('topic_code');
        table.string('difficulty_level');
        table.integer('no_of_questions');
        table.string('parent_mcq_code');
        table.string('childmcq_seq_no');
        table.string('verification_status');
        table.text('verified_by');
        table.timestamp('verified_on').defaultTo(knex.fn.now());
        table.string('response_type');
        table.integer('mark_per_question');
        table.integer('penalty_factor');
        table.string('is_option_suffle');
        table.integer('weightage');
        table.integer('encryption_status');
        table.integer('answer_update_status');
    
        table.timestamps(true, true);
      });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('quiz_mcq');
};
