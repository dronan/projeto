/**
* @param { import("knex").Knex } knex
* @returns { Promise<void> }
*/
exports.up = function(knex) {
    return knex.schema.createTable('profiles', table => {
        table.increments('id').primary()
        table.string('name').notNull().unique()
        table.string('label').notNull()
    }
    ).then(function () {
        return knex('profiles').insert([
            { name: 'admin', label: 'Administrator' },
            { name: 'common', label: 'Common' }
        ])
    })
};

/**
* @param { import("knex").Knex } knex
* @returns { Promise<void> }
*/
exports.down = function(knex) {
    return knex.schema.dropTable('profiles')
};
