module.exports = {
  development: {
    client: "sqlite3",
    useNullAsDefault: true,
    connection: {
      filename: "./data/users.db3"
    },
    pool: {
      afterCreate: (conn, done) => {
        conn.run("PRAGMA foreign_keys = ON", done);
      }
    },
    migrations: {
      directory: "./data/migrations"
    },
    seeds: {
      directory: "./data/seeds"
    }
  },
  production: {
    client: "pg",
    useNullAsDefault: true,
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: "/data/migrations"
    },
    seeds: {
      directory: "/data/seeds"
    }
  },
  testing: {
    client: "sqlite3",
    useNullAsDefault: true,
    connection: {
      filename: "./data/test.db3"
    },
    migrations: {
      directory: "./data/migrations"
    },
    seeds: {
      directory: "./data/seeds"
    }
  }
};

// __dirname +
