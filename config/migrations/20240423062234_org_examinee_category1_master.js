/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('org_examinee_category1_master', (table) => {
        table.increments('id');
        table.string('examinee_cat1_code').notNullable().unique();
        table.string('examinee_cat1_name').notNullable().unique();
        table.string('org_code');
        table.string('created_by');
        table.timestamp('created_on').defaultTo(knex.fn.now());
        table.string('modified_by');
        table.timestamp('modified_on').defaultTo(knex.fn.now());
        table.string('status');
      });
   
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('org_examinee_category1_master');
  
};
