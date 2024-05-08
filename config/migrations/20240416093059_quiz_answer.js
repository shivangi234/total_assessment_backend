/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('quiz_answer', (table) => {
        table.increments('id');
        table.string('quiz_answer_id').notNullable().unique();
        table.string('examinee_code').notNullable();
        table.string('quiz_code').notNullable();
        table.string('mcq_code').notNullable();
        table.integer('submitted_answer').notNullable();
        table.timestamp('submission_date_time').notNullable().defaultTo(knex.fn.now());
        table.integer('correct_answer').notNullable();
        table.integer('final_score').notNullable();
        table.string('is_result_updated').notNullable();
        table.string('is_mark_as_review').notNullable();

        table.timestamps(true, true);
      });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('quiz_answer');
};
