import getRegistryUrl from 'registry-url';
import getAuthToken from 'registry-auth-token';
import npa from 'npm-package-arg';
import got from 'got';
import {Agent as HttpAgent} from 'http';
import {Agent as HttpsAgent} from 'https';
import startsWith from 'lodash.startswith';

const httpAgent = new HttpAgent({keepAlive: true});
const httpsAgent = new HttpsAgent({keepAlive: true});

module.exports = packageName => {
  const {scope} = npa(packageName);
  const registryUrl = getRegistryUrl(scope);
  const authToken = getAuthToken(registryUrl);
  const escapedName = packageName.replace(/\//g, '%2f');
  const url = `${registryUrl}${escapedName}`;
  const headers = authToken ? {
    authorization: 'Bearer ' + authToken
  } : {};
  const agent = startsWith(url, 'https') ? httpsAgent : httpAgent;

  return got(url, {headers, json: true, agent}).then(({body}) => body);
};
