Package.describe({
  name: 'unchained:core-worker',
  version: '0.49.3',
  summary: 'Unchained Engine Core: Worker',
  git: 'https://github.com/unchainedshop/unchained',
  documentation: 'README.md',
});

Package.onUse((api) => {
  api.versionsFrom('1.10');
  api.use('ecmascript');
  api.use('mongo');
  api.use('promise');
  api.use('dburles:factory@1.1.0');
  api.use('dburles:collection-helpers@1.1.0');
  api.use('aldeed:collection2@3.0.2');
  api.use('aldeed:schema-index@3.0.0');
  api.use('littledata:synced-cron@1.5.1');
  api.use('percolate:migrations@1.0.2');

  api.use('unchained:core-logger@0.49.3');
  api.use('unchained:utils@0.49.3');

  api.mainModule('worker.js', 'server');
});

Npm.depends({
  later: '1.2.0',
});
