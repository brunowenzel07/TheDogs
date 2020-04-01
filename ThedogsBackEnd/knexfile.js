// Update with your config settings.

module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './src/database/crawler.sqlite'
    },
    migrations:{
      directory: './src/database/migrations'
    },

  },


  // development: {
  //   client: 'postgresql',
  //   connection: {
  //     filename: './src/database/db.postgres'
  //   },
  //   migrations:{
  //     directory: './src/database/migrations'
  //   },

  // },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
