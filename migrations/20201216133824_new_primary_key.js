
exports.up = function(knex) {
    return knex.schema.alterTable('e_mails', (table) => {
        table.dropColumn('id')
        //table.dropPrimary()
        //table.increments('email_id')
        //table.primary('email_id')
    })
};

exports.down = function(knex) {
  
};
