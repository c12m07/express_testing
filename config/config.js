
function runDotEnv() {
  if (process.env.ENV === 'development') {
    import('dotenv').then(dotenv => dotenv.config({ path: '.env' }));
  }
}

runDotEnv();

const config = {
  development: {
    username: process.env.DB_USER || "postgres",
    password: process.env.DB_PASSWORD || "postgres",
    database: process.env.DB_NAME || "database",
    host: process.env.DB_HOST || "localhost",
    logging: true,
    dialect: "postgres"
  },
  test: {
    username: process.env.DB_USER || "postgres",
    password: "postgres",
    database: process.env.DB_NAME || "prueba",
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT || 5432,
    logging: true,
    dialect: "postgres"
  },
  production: {
    username: process.env.DB_USER || "postgres",
    password: process.env.DB_PASSWORD || "postgres",
    database: process.env.DB_NAME || "prueba1",
    host: process.env.DB_HOST || "localhost",
    logging: true,
    dialect: "postgres"
  }
}

export default config;