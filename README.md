ember-attribute-modifier
==============================================================================

This `attribute` modifier is made for declarative attribute bindings for DOM nodes.

This addon is heavily "inspired" by [ember-class-modifier.](https://github.com/lifeart/ember-class-modifier)

### Usage

When you want to conditionally apply a list of variable attributes onto an element,
it's a pain (especially for `data-test` attributes).

```js
  // component.js
  myAttributes = ['data-test-thing', 'data-test-other-thing']
  // also works like
  myAttributes = 'data-test-thing, data-test-other-thing'
```

```hbs
  <button {{attribute this.myAttributes}}></button>
```

Conditionally remove attributes based on booleans

```js
  // component.js
  isDisabled = false
```

```hbs
  <div {{attribute data-test-disabled=this.isDisabled}}></div>
```


Compatibility
------------------------------------------------------------------------------

* Ember.js v3.4 or above
* Ember CLI v2.13 or above
* Node.js v8 or above


Installation
------------------------------------------------------------------------------

```
ember install ember-attribute-modifier
```


Usage
------------------------------------------------------------------------------

[Longer description of how to use the addon in apps.]


Contributing
------------------------------------------------------------------------------

See the [Contributing](CONTRIBUTING.md) guide for details.


License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
