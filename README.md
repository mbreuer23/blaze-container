# Blaze Container
Easily Create Blaze containers without any markup. Inspired By [react-meteor-data](https://github.com/meteor/react-packages/tree/devel/packages/react-meteor-data)

### Installation
```
meteor add planefy:blaze-container
```

### Basic usage
```javascript
// ../client/container.js
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/planefy:blaze-container'
import './childTemplate.js'; // your child template that you wish to wrap

createContainer('containerTemplate', 'childTemplate', function() {
   const handle = Meteor.subscribe('posts');
   return {
       ready: handle.ready(),
       posts: Posts.find().fetch()
   };
});
```

Now you have a container called 'containerTemplate' that will pass data to your childTemplate reactively, whenever the return values are updated.  All without writing any markup!


### What this does

The above code is roughly equivalent to doing the following:  

```html 
// containerTemplate.html
<template name='containerTemplate'>
  {{> childTemplate args }}
</template>
```
```javascript
// containerTemplate.js
Template.containerTemplate.onCreated(function () {
  this.autorun(() => {
    this.handle = this.subscribe('posts');
  });
});

Template.containerTemplate.helpers({
  args() {
    return {
      ready: Template.instance().handle.ready(),
      posts: Posts.find().fetch()
    };
  }
});
```
However, in this example, only ready and posts will be passed to the childTemplate.  

When using createContainer, it will also pass through any data provided to containerTemplate, so that if you had another template that looked like this:
```html
<template name="superContainer">
  {{> containerTemplate user=user}}
</template>
```
Then childTemplate will receive both ```user``` , ```ready```, and ```posts``` as its data context. In other words, it will be just like
you did this:

```html
<template name="other">
 {{> childTemplate user=user posts=posts  ready=ready}}
</template>
```

### Template onRendered, onCreated, onDestroyed

In the above example, containerTemplate is just a normal Blaze template, so you can call onRendered, onDestroyed, etc. as needed. E.g.: 

```javascript
Template.containerTemplate.onRendered(function() {
  // do stuff 
});
```
