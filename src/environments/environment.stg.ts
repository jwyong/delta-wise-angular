import packageJson from '../../package.json';

export const environment = {
  production: false,
  version: `${packageJson.version} (Stg)`,
  apiUrl: "https://dev.api.delta-wise.com/api"
};
