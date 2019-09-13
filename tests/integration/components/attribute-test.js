import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';


module('Integration | Component | attribute', function(hooks) {
  setupRenderingTest(hooks);

  test('it works', async function(assert) {
    this.set('whatever', 'new');
    // Template block usage:
    await render(hbs`
      <div id="test" {{attribute "my-attr" data-test-foo=this.whatever}}>modified element</div>
    `);
    assert.equal(this.element.textContent.trim(), 'modified element', 'renderering works');
    assert.dom('#test').hasAttribute('my-attr', '', 'supports list of attributes');
    assert.dom('#test').hasAttribute('data-test-foo', 'new', 'supports hash of attributes');
  });

  test('it handles updates', async function(assert) {
    this.set('updatable', 'yeah');
    this.set('nullable', true);
    await render(hbs`<div id="test" {{attribute data-foo=this.updatable data-null=this.nullable}}>sup</div>`);
    assert.equal(this.element.textContent.trim(), 'sup', 'renderering works');
    assert.dom('#test').hasAttribute('data-foo', 'yeah', 'renders attr first pass');
    assert.dom('#test').hasAttribute('data-null', '', 'handles true as blank string');
    this.set('updatable', 'nope');
    this.set('nullable', null);
    assert.dom('#test').hasAttribute('data-foo', 'nope', 'renders attr again with update')
    assert.dom('#test').doesNotHaveAttribute('data-null', 'null values get cleaned up');
  });

  test('null values do not appear', async function(assert) {
    this.set('nullable', null);
    await render(hbs`<div id="test" {{attribute data-null=this.nullable}}>text</div>`);
    assert.equal(this.element.textContent.trim(), 'text', 'renderering works');
    assert.dom('#test').doesNotHaveAttribute('data-null');
    this.set('nullable', true);
    assert.dom('#test').hasAttribute('data-null');
  });

  test('it handles arrays and string lists', async function(assert) {
    let attrs = ['foo', 'bar', 'baz'];
    this.set('myattrs', attrs);
    await render(hbs`<div id="test" {{attribute this.myattrs}}>text</div>`);
    assert.equal(this.element.textContent.trim(), 'text', 'renderering works');
    attrs.forEach(a => {
      assert.dom('#test').hasAttribute(a);
    });


    this.set('myattrs', attrs.join(','));

    attrs.forEach(a => {
      assert.dom('#test').hasAttribute(a);
    });
  });
});
