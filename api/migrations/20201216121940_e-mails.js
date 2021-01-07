
exports.up = function(knex) {
    return knex.schema.createTable('e_mails', table => {
        table.increments('id')
        table.string('sender')
        table.string('recipient')
        table.string('subject')
        table.string('message')
        table.date('date')

    })
  
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('e_mails')
  
};
