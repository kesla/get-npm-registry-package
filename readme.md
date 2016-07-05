# getNpmRegistryPackage

Get a npm regsitry package, an instance of the documents saved in the registry db.

## Features
* Uses registry set in `.npmrc`
* Supports scoped packages
* Uses auth token if possible

## library

```shell
npm install [--save] get-npm-registry-package
```

```js
import getNpmRegistryPackage from 'get-npm-registry-package';

getNpmRegistryPackage('@foo/bar')
  .then(json => console.log(json));
```

## cli

```shell
npm install -g get-npm-registry-package

get-npm-registry-package @foo/bar
```
