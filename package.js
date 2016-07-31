Package.describe({
  name: 'create-container',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: '',
  // URL to the Git repository containing the source code for this package.
  git: '',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.3.4.4');
  api.use('ecmascript');
  api.use('templating');
  api.use('blaze');
  api.use('spacebars');
  api.use('tracker');
  api.mainModule('create-container.js', 'client');
});

Package.onTest(function(api) {
  api.use('ecmascript');
  api.use('tinytest');
  api.use('create-container');
  api.mainModule('create-container-tests.js');
});
