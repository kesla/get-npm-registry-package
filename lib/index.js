import getRegistryUrl from 'registry-url';
import getAuthToken from 'registry-auth-token';
import npa from 'npm-package-arg';
import got from 'got';

module.exports = packageName => {
  const {scope} = npa(packageName);
  const registryUrl = getRegistryUrl(scope);
  const authToken = getAuthToken(registryUrl);
  const escapedName = packageName.replace(/\//g, '%2f');
  const url = `${registryUrl}${escapedName}`;
  const headers = authToken ? {
    authorization: 'Bearer ' + authToken
  } : {};

  return got(url, {headers, json: true}).then(({body}) => body);
};
