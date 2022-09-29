export const getBackendServerUrl = () => {
  const env = process.env.NODE_ENV;
  const url = env === 'production' ? 'http://yosmart.kr/api' : 'http://localhost:8080';
  return url;
};
