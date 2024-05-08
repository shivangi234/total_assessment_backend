/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('user_quiz_activity', (table) => {
        table.increments('activity_id');
        table.string('subject_code');
        table.string('examinee_code');
        table.string('quiz_code');
        table.timestamp('access_time').defaultTo(knex.fn.now());
        table.integer('attempt_number');

      });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('user_quiz_activity');
};
