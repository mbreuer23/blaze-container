Package.describe({
  name: 'planefy:blaze-container',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: 'Simple containers for Blaze, inspired by react-meteor-data',
  // URL to the Git repository containing the source code for this package.
  git: 'https://github.com/mbreuer23/blaze-container',
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
  //TODO
});
