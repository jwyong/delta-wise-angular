import packageJson from '../../package.json';

export const environment = {
  production: true,
  version: packageJson.version,
  apiUrl: "https://api.delta-wise.com/api"
};
