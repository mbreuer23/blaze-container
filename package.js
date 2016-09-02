Package.describe({
  name: 'planefy:blaze-container',
  version: '1.0.0',
  // Brief, one-line summary of the package.
  summary: 'Create containers for Blaze, without any markup',
  // URL to the Git repository containing the source code for this package.
  git: 'https://github.com/mbreuer23/blaze-container',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

var packages = [
  'ecmascript',
  'templating',
  'blaze',
  'spacebars',
  'tracker'
];


Package.onUse(function(api) {
  api.versionsFrom('1.3.4.4');
  api.use(packages);
  api.imply(packages);
  api.mainModule('create-container.js', 'client');
});

Package.onTest(function(api) {
  api.use('planefy:blaze-container');
  api.use('practicalmeteor:chai@2.1.0');
  api.use('practicalmeteor:sinon@1.14.1_2');
  api.use('planefy:blaze-test-helpers@0.0.1');
  api.use('reactive-var');
  api.use('jquery');
  api.addFiles('test.html', 'client');
  api.mainModule('create-container-tests.js','client');
});
