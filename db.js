const knex = require('knex')

module.exports = knex({
  client: 'postgres',
  connection: {
    host: 'localhost',
    user: 'postgres',
    password: '123456',
    database: 'postgres',
    port:4321,
  },
})