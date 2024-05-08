/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('exam_subgroup', (table) => {
        table.increments('id');
        table.string('examgroup_code');
        table.string('examsubgroup_code');
        table.string('examsubgroup_name');
        
      });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('exam_subgroup');
  
};
