exports.up = function(knex) {
    return knex.raw(`
      -- Update phone_no column
      UPDATE student
      SET phone_no = CAST(phone_no AS INTEGER)
      WHERE phone_no IS NOT NULL;
    `);
  };
  
  exports.down = function(knex) {
    return knex.raw(`
      -- Rollback the phone_no column update
      -- Since this is not altering the table structure, no action is needed to rollback
    `);
  };