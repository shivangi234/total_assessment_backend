/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('config', (table) => {
        table.increments('id');
        table.string('config_id');
        table.string('board_text');
        table.string('course_text');
        table.string('col_1_text');
        table.string('col_2_text');
        table.string('topic_text');
        table.string('examinee_text');
        table.string('quiz_text');
        table.string('level1_verification_text');
        table.string('level2_verification_text');
        table.string('org_code');
        table.string('regd_approved_status');
        table.integer('no_of_examinee');
        table.integer('no_of_exams');
        
      });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('config');
};
