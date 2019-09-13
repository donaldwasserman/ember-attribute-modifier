import { Modifier } from 'ember-oo-modifiers';
import { set, computed } from '@ember/object';
import { typeOf } from '@ember/utils';
import { assert } from '@ember/debug';

function isStringOrArray(val) {
  return typeOf(val) === 'string' || typeOf(val) === 'array';
}

export default class AttributeModifier extends Modifier {

  attributeList = null;
  attributeHash = null;

  setPlainAttributes(attributeList) {

    if (!attributeList) {
      this.removeAttributes(this.attributeList || [])
      return;
    }

    assert('You must provide a string or array to `attribute` modifier as positional param', isStringOrArray(attributeList))

    if (typeOf(attributeList) === 'string') {
      attributeList = attributeList.split(/[ ,]+/g);
    }

    if (this.attributeList) {
      let cleanup = this.attributeList.filter(old => !attributeList.includes(old));
      this.removeAttributes(cleanup);
      set(this, 'attributeList', attributeList);
    }

    attributeList.forEach(a => this.setAttribute(a, ""));
  }

  setAttributeHash(hash) {
    let newKeys = Object.keys(hash);
    if (this.attributeHash) {
      let currentKeys = Object.keys(this.attributeHash);
      let cleanup = currentKeys.filter(old => !attributeList.includes(old));
      set(this, 'attributeHash', hash);
      this.removeAttributes(cleanup);
    }
    let nullKeys = newKeys.filter(k => !hash[k]);
    this.removeAttributes(nullKeys);
    newKeys = newKeys.filter(k => !!hash[k]);
    newKeys.forEach(k => this.setAttribute(k, hash[k]));
  }

  removeAttributes(attributes) {
    attributes.forEach(a => this.element.removeAttribute(a));
  }

  setAttribute(attr, value) {
    if (value === true) {
      value = '';
    }

    this.element.setAttribute(attr, value);
  }

  didInsertElement(attributeList, hash) {
    this.setAttributeHash(hash);
    this.setPlainAttributes(...attributeList)
  }

  didRecieveArguments(attributeList, hash) {
    this.setAttributeHash(hash);
    this.setPlainAttributes(...attributeList)
  }

  didUpdateArguments(attributeList, hash) {
    this.setAttributeHash(hash);
    this.setPlainAttributes(...attributeList)
  }
}
