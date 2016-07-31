import { Template } from 'meteor/templating';
import { Blaze } from 'meteor/blaze';
import { Tracker } from 'meteor/tracker';
import { Spacebars } from 'meteor/spacebars';

export const createContainer = (container, child, reactiveFn) => {
  Template.__checkName(container);

  if (!Template[child]) {
    throw new Error(`Template.${child} is not defined`);
  }

  Template[container] = new Template(`Template.${container}`, (function() {                                               // 9
      var view = this;
      let args = Spacebars.call(view.lookup("args"));
      let contentFn = () => Spacebars.include(view.lookupTemplate(child));

      return Blaze._TemplateWith(args, contentFn);                                                                                                              // 15
  }));

  Template[container].onCreated(function() {
    this.dep = new Tracker.Dependency();

    this.getContext = () => {
      this.dep.depend();
      return this.context;
    };

    this.autorun(() => {
      this.context = reactiveFn();
      this.dep.changed();
    });
  });

  Template[container].helpers({
    args() {
      const instance = Template.instance();
      const data = Template.currentData();
      const context = instance.getContext();

      return Object.assign(data, context);
    }
  });
};
