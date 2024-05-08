/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('examgroup_organization', (table) => {
        table.string('examgroup_org_id');
        table.string('org_code');
        table.string('examgroup_code');
        table.string('created_by');
        table.timestamp('created_on').notNullable().defaultTo(knex.fn.now());
        table.string('modified_by');
        table.timestamp('modified_on').notNullable().defaultTo(knex.fn.now());
        table.integer('sl_no');
      });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('examgroup_organization');
  
};
