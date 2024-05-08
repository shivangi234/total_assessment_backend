/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('sync_log', (table) => {
        table.increments('id');
        table.string('sync_type');
        table.string('sync_subtype');
        table.string('sync_quiz');
        table.string('sync_name');
        table.string('sync_by');
        table.timestamp('sync_on').defaultTo(knex.fn.now());

      });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('sync_log');
};
