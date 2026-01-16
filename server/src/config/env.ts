import dotenv from 'dotenv';

dotenv.config({
  path: '../../.env'
});

const env = {
  PORT: process.env.PORT,
  FAST_API_URL: process.env.FAST_API_URL,
  MONGO_URI: process.env.MONGO_URI,
}

Object.entries(env).forEach(([key, value]) => {
  if (!value) {
    throw new Error(`Missing env var: ${key}`);
  }
});

export default env;