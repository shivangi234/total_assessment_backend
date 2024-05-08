/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('subjectmaster', (table) => {
        table.increments('id');
        table.integer('subject_id').notNullable().unique();
        table.string('subject_name').notNullable();
        table.string('subject_code').notNullable().unique();
        table.string('subject_abbr').notNullable();
        table.text('created_by');
        table.timestamp('created_on').notNullable().defaultTo(knex.fn.now());
        table.string('modified_by');
        table.timestamp('modified_on').notNullable().defaultTo(knex.fn.now());

        table.timestamps(true, true);
      });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('subjectmaster');
};
