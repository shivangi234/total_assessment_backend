/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('usermaster', (table) => {
        table.increments('id');
        table.string('email').notNullable().unique();
        table.string('first_name').notNullable();
        table.string('middile_name').notNullable();
        table.string('last_name').notNullable();
        table.string('user_code');
        table.string('password').notNullable();
        table.bigInteger('phone_no');
        table.string('col_1').notNullable();
        table.string('col_2').notNullable();
        table.string('org_code');
        table.text('profile_image_url');
        table.text('can_verify');
        table.text('created_by');
        table.timestamp('created_on').notNullable().defaultTo(knex.fn.now());
        table.string('updated_by');
        table.timestamp('updated_on').notNullable().defaultTo(knex.fn.now());
        table.string('record_status').notNullable();
        table.string('login_type').notNullable();
        table.string('registration_status');
        table.string('school_name');
        table.string('institude_code');
        table.string('password_change_status').notNullable();
        table.string('archieve_status').notNullable();
        table.timestamps(true, true);
        
      });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('usermaster');
};
