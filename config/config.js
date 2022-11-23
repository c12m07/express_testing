function runDotEnv() {
  if (process.env.ENV === 'development') {
    import('dotenv').then(dotenv => dotenv.config({ path: '.env' }));
  }
}

runDotEnv();

const config = {
  'development': {
    'username': process.env.DB_USER || 'postgres',
    'password': process.env.DB_PASSWORD || '7539182465',
    'database': process.env.DB_NAME || 'prueba1',
    'host': process.env.DB_HOST,
    'logging': true,
    'dialect': 'postgres'
  },
  'test': {
    'username': process.env.DB_USER || 'postgres',
    'password': process.env.DB_PASSWORD || '',
    'database': process.env.DB_NAME || 'prueba1',
    'host': process.env.DB_HOST,
    'logging': false,
    'dialect': 'postgres'
  },
  'production': {
    'username': process.env.DB_USER || 'postgres',
    'password': process.env.DB_PASSWORD || '7539182465',
    'database': process.env.DB_NAME || 'prueba1',
    'host': process.env.DB_HOST,
    'logging': true,
    'dialect': 'postgres'
  }
}

export default config;