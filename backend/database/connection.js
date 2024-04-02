const knex = require('knex')({
    client: 'pg',
    connection: {
      host : 'localhost',
      port: 5432,
      user : 'postgres',
      password : 'admin',
      database : 'gestao-sala'
    }
  });

module.exports = knex;