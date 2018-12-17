const isDev = process.env.NODE_ENV === 'development';
export const PUBLIC_PATH = isDev ? 'dev' : 'prod';