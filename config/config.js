module.exports = {
  "development": {
    "username": "nodelogin",
    "password": '123.456',
    "database": "nodedb",
    "host": "127.0.0.1",
    "dialect": "postgres",
    "port": 5432
    // "operatorsAliases": false
  },
  "test": {
    "username": "nodelogin",
    "password": '123.456',
    "database": "nodedb",
    "host": "127.0.0.1",
    "dialect": "postgres",
    "port": 5432
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql",
    "operatorsAliases": false
  }
}
