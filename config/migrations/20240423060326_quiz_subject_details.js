/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('quiz_subject_details', (table) => {
        table.increments('id');
        table.string('quiz_code').notNullable().unique();
        table.string('quiz_type');
        table.string('subject_code');
        table.integer('questions_defined');
        table.string('is_questions_assigned');
        table.integer('questions_assigned');
        table.string('questions_assigned_status');
        table.string('created_by');
        table.timestamp('created_on').defaultTo(knex.fn.now());
        table.string('modified_by');
        table.timestamp('modified_on').defaultTo(knex.fn.now());
      });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('quiz_subject_details');
};
