/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('organisation', (table) => {
        table.increments('id');
        table.string('org_code').notNullable().unique();
        table.string('org_name').notNullable();
        table.string('org_type').notNullable();
        table.text('website_adderess').notNullable();
        table.bigInteger('contact_no');
        table.string('location');
        table.text('logo_url').notNullable();
        table.string('admin_first_name').notNullable();
        table.string('admin_last_name').notNullable();
        table.string('user_name').notNullable();
        table.string('email').notNullable().unique();
        table.bigInteger('phone_no');
        table.text('created_by');
        table.timestamp('created_on').notNullable().defaultTo(knex.fn.now());
        table.string('updated_by');
        table.timestamp('updated_on').notNullable().defaultTo(knex.fn.now());
        table.string('record_status').notNullable();
        table.timestamp('last_updated').notNullable().defaultTo(knex.fn.now());
        table.string('primary_org').notNullable();

        table.timestamps(true, true);
        
      });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('organisation');
};
