/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('quiz_subject_selection', (table) => {
        table.increments('id');
        table.string('quiz_code');
        table.string('subject_code');
        table.string('examinee_code');

      });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('quiz_subject_selection');
};
