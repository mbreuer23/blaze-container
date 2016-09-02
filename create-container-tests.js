import { withRenderedTemplate } from "meteor/planefy:blaze-test-helpers";
import { Template } from 'meteor/templating';
import { $ } from 'meteor/jquery';
import { expect } from 'meteor/practicalmeteor:chai';
import { createContainer } from 'meteor/planefy:blaze-container';
import { ReactiveVar } from 'meteor/reactive-var';
import { Tracker } from 'meteor/tracker';

describe('Blaze Containers', function() {
  var items = new ReactiveVar();

  before(function() {
    items.set([
      {name: 'Gordon', value: 'Gekko'},
      {name: 'Tommy', value: 'Boy'}
    ]);

    createContainer('myContainer', 'test', function() {
      return {
        items: items.get()
      };
    });
  });

  it('Renders the child template correctly', function () {
    withRenderedTemplate('myContainer', {}, el => {;
      var renderedText = $(el).find('li')
        .map((i, e) => $(e).text())
        .toArray();

      expect(['Gekko', 'Boy']).to.deep.equal(renderedText);

      items.set([
        { name: 'Joe', value: 'Dirt'},
        { name: 'Ada', value: 'Lovelace'}
      ]);

      Tracker.flush();

      renderedText = $(el).find('li')
        .map((i, e) => $(e).text())
        .toArray();

      expect(['Dirt', 'Lovelace']).to.deep.equal(renderedText);
    });
  });
});
