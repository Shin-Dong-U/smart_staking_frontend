export const getBackendServerUrl = () => {
  const env = process.env.NODE_ENV;
  const url = env === 'production' ? '/api' : 'http://localhost:8080';
  return url;
};
