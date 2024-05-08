/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('exam_centre_master', (table) => {
        table.increments('id');
        table.string('exam_centre_code');
        table.string('exam_centre_name');
        table.string('org_code');
        table.text('created_by');
        table.timestamp('created_on').defaultTo(knex.fn.now());
        table.string('status');

      });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('exam_centre_master');
};
