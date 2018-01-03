import getRegistryUrl from 'registry-url';
import getRegistryInfo from 'registry-info';
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
  const {authorization} = getRegistryInfo(scope);
  const headers = authorization ? {authorization} : {};
  const url = join(registry, escapedName);
  const agent = getAgent(url);

  return got(url, {headers, json: true, agent})
    .then(({body}) => body);
};
