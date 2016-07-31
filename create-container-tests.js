// Import Tinytest from the tinytest Meteor package.
import { Tinytest } from "meteor/tinytest";

// Import and rename a variable exported by create-container.js.
import { name as packageName } from "meteor/create-container";

// Write your tests here!
// Here is an example.
Tinytest.add('create-container - example', function (test) {
  test.equal(packageName, "create-container");
});
