import getRegistryUrl from 'registry-url';
import getAuthToken from 'registry-auth-token';
import npa from 'npm-package-arg';
import got from 'got';
import httpHttpsAgent from 'http-https-agent';
import join from 'url-join';

const getAgent = httpHttpsAgent({
  keepAlive: true,
  maxSockets: 20
});

module.exports = (packageName, opts = {}) => {
  const {scope, escapedName} = npa(packageName);
  const {registry = getRegistryUrl(scope)} = opts;

  const {token} = getAuthToken(registry) || {};
  const url = join(registry, escapedName);

  const headers = token ? {
    authorization: 'Bearer ' + token
  } : {};
  const agent = getAgent(url);

  return got(url, {headers, json: true, agent})
    .then(({body}) => body);
};
