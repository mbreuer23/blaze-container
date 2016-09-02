# Blaze Container
Easily Create Blaze containers without any markup. Inspired By [react-meteor-data](https://github.com/meteor/react-packages/tree/devel/packages/react-meteor-data)

### Installation
```
meteor add planefy:blaze-container
```

### Basic usage
```javascript
// ../client/container.js
// assume you already have a template called 'childTemplate' defined
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/planefy:blaze-container'

createContainer('containerTemplate', 'childTemplate', function() {
   const handle = Meteor.subscribe('posts');
   return {
       ready: handle.ready(),
       posts: Posts.find().fetch()
   };
});
```
This will define a template called 'containerTemplate'.  You don't need to need add any HTML
for containerTemplate.  That is handled for you.

Now you can use include containerTemplate in your router or in other templates.  It will pass the new data to childTemplate
reactively, whenever one of the dependencies is updated.  

It will also pass through any data provided to containerTemplate, so that if you had another template that looked like this:
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
