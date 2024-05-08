/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('code_description', (table) => {
        table.increments('id');
        table.string('description_id');
        table.string('catagory_code');
        table.string('code');
        table.string('description');
        table.string('org_code');

      });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('code_description');
};
