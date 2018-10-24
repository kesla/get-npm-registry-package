import getRegistryInfo from 'registry-info';
import npa from 'npm-package-arg';
import got from 'got';
import { Agent as HttpAgent } from 'http';
import { Agent as HttpsAgent } from 'https';
import join from 'url-join';

module.exports = (packageName, opts = {}) => {
  const {scope, escapedName} = npa(packageName);
  const {authorization, registryUrl} = getRegistryInfo(scope);
  const {registry = registryUrl} = opts;
  const headers = authorization ? {authorization} : {};
  const url = join(registry, escapedName);
  const agentOpts = {
    keepAlive: true,
    maxSockets: 20
  };
  const agent = {
    http: new HttpAgent(agentOpts),
    https: new HttpsAgent(agentOpts),
  };

  return got(url, {headers, json: true, agent})
    .then(({body}) => body);
};
