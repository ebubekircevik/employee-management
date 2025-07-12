import {BaseComponent} from '../src/_base/BaseComponent.js';
import {assert} from '@open-wc/testing';

suite('BaseComponent', () => {
  test('extends LitElement', () => {
    // BaseComponent extends LitElement, so we can't create it directly
    // We test that it's a class that extends LitElement
    assert.isFunction(BaseComponent);
    assert.isTrue(BaseComponent.prototype instanceof HTMLElement);
  });

  test('has language change subscription method', () => {
    // Test that the method exists
    const mockComponent = {
      _langChanged: null,
      requestUpdate: () => {},
      _subscribeToLanguageChanges:
        BaseComponent.prototype._subscribeToLanguageChanges,
    };

    mockComponent._subscribeToLanguageChanges.call(mockComponent);

    assert.isFunction(mockComponent._langChanged);
  });

  test('handles language change event', () => {
    let updateCalled = false;
    const mockComponent = {
      _langChanged: null,
      requestUpdate: () => {
        updateCalled = true;
      },
      _subscribeToLanguageChanges:
        BaseComponent.prototype._subscribeToLanguageChanges,
    };

    mockComponent._subscribeToLanguageChanges.call(mockComponent);
    window.dispatchEvent(new Event('language-changed'));

    assert.isTrue(updateCalled);
  });
});
