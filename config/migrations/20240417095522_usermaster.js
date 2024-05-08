/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('usermaster', (table) => {
        table.increments('id');
        table.string('user_id').notNullable();
        table.string('user_code');
        table.string('user_name');
        table.string('password');
        table.string('first_name').notNullable();
        table.string('middile_name');
        table.string('last_name').notNullable();
        table.string('role_code');
        table.string('col_1').notNullable();
        table.string('col_2').notNullable();
        table.string('org_code');
        table.string('email_id').notNullable().unique();

        table.bigInteger('phone_no');
        table.text('profile_image_url');
        table.text('can_verify');
        table.string('approved_status');
        table.text('created_by');
        table.timestamp('created_on').notNullable().defaultTo(knex.fn.now());
        table.string('updated_by');
        table.timestamp('updated_on').notNullable().defaultTo(knex.fn.now());
        table.string('record_status');
        table.string('login_type')
        table.string('registration_status');
        table.string('school_name');
        table.string('institude_code');
        table.string('password_change_status')
        table.string('archieve_status')
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
