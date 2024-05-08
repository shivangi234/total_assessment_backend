/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('quiz_examinee_subject', (table) => {
        table.string('quiz_examinee_subject_id');
        table.string('subject_code');
        table.string('examinee_code');
        table.string('quiz_code');
        table.timestamp('start_time').defaultTo(knex.fn.now());
        table.timestamp('end_time').defaultTo(knex.fn.now());
        table.integer('time_elapsed');
        table.string('is_submitted');
        table.integer('subject_order');
      });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('quiz_examinee_subject');
  
};
