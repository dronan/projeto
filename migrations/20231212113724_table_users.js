/**
* @param { import("knex").Knex } knex
* @returns { Promise<void> }
*/
exports.up = function(knex) {
    return knex.schema.createTable('users', table => {
        table.increments('id').primary()
        table.string('name').notNull()
        table.string('email').notNull().unique()
        table.string('password', 60).notNull()
        table.boolean('active').notNull().defaultTo(true)
        table.timestamp('created_at').defaultTo(knex.fn.now())
    }).then( function() {  
        return knex('users').insert([
            { name: 'Admin', email: 'admin@admin.com', password: 'admin', active: true },
            { name: 'User', email: 'user@user.com', password: 'user', active: true },
            { name: 'Test', email: 'test@test.com', password: 'test', active: true },
        ])
    })
};

/**
* @param { import("knex").Knex } knex
* @returns { Promise<void> }
*/
exports.down = function(knex) {
    return knex.schema.dropTable('users')
};
