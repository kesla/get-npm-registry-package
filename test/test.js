import test from 'tapava';
import httpTestServer from 'http-test-server';

import getNpmRegistryPackage from '../lib';

test('get-npm-registry-package on package', async t => {
  const data = {
    hello: 'world'
  };
  const {baseUrl: registry, shutdown} = await httpTestServer((req, res) => {
    t.is(req.url, '/foo');
    res.end(JSON.stringify(data));
  });

  const actual = await getNpmRegistryPackage('foo', {registry});

  const expected = data;
  t.deepEqual(actual, expected);

  await shutdown();
});

test('get-npm-registry-package on scoped package', async t => {
  const data = {
    hello: 'world'
  };
  const {baseUrl: registry, shutdown} = await httpTestServer((req, res) => {
    t.is(req.url, '/@foo%2fbar');
    res.end(JSON.stringify(data));
  });

  const actual = await getNpmRegistryPackage('@foo/bar', {registry});

  const expected = data;
  t.deepEqual(actual, expected);

  await shutdown();
});
