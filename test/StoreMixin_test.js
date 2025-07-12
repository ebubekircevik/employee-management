import {StoreMixin} from '../src/_mixins/StoreMixin.js';
import {assert} from '@open-wc/testing';

suite('StoreMixin', () => {
  test('creates mixin class', () => {
    class BaseClass {}
    const MixedClass = StoreMixin(BaseClass);
    const instance = new MixedClass();
    assert.instanceOf(instance, BaseClass);
  });

  test('subscribes to store on connect', () => {
    class BaseClass {
      connectedCallback() {}
      disconnectedCallback() {}
    }
    const MixedClass = StoreMixin(BaseClass);
    const instance = new MixedClass();

    const mockStore = {
      subscribe: (callback) => {
        instance._storeCallback = callback;
        return () => {};
      },
    };
    instance.store = mockStore;

    instance.connectedCallback();

    assert.isFunction(instance._storeCallback);
  });

  test('unsubscribes from store on disconnect', () => {
    class BaseClass {
      connectedCallback() {}
      disconnectedCallback() {}
    }
    const MixedClass = StoreMixin(BaseClass);
    const instance = new MixedClass();

    let unsubscribeCalled = false;
    const mockUnsubscribe = () => {
      unsubscribeCalled = true;
    };

    instance._storeUnsubscribe = mockUnsubscribe;
    instance.disconnectedCallback();

    assert.isTrue(unsubscribeCalled);
    assert.isNull(instance._storeUnsubscribe);
  });

  test('handles store updates', () => {
    class BaseClass {}
    const MixedClass = StoreMixin(BaseClass);
    const instance = new MixedClass();

    let updateCalled = false;
    instance.requestUpdate = () => {
      updateCalled = true;
    };

    instance._onStoreUpdate([{id: 1, name: 'John'}]);

    assert.isTrue(updateCalled);
  });

  test('addEmployee calls store add method', () => {
    class BaseClass {}
    const MixedClass = StoreMixin(BaseClass);
    const instance = new MixedClass();

    let addCalled = false;
    const mockStore = {
      add: (employee) => {
        addCalled = true;
        return employee;
      },
    };
    instance.store = mockStore;

    const employee = {firstName: 'John', lastName: 'Doe'};
    instance.addEmployee(employee);

    assert.isTrue(addCalled);
  });

  test('getEmployees returns store data', () => {
    class BaseClass {}
    const MixedClass = StoreMixin(BaseClass);
    const instance = new MixedClass();

    const mockData = [{id: 1, name: 'John'}];
    const mockStore = {
      get: () => mockData,
    };
    instance.store = mockStore;

    const result = instance.getEmployees();

    assert.deepEqual(result, mockData);
  });

  test('getEmployees returns empty array when no store', () => {
    class BaseClass {}
    const MixedClass = StoreMixin(BaseClass);
    const instance = new MixedClass();

    const result = instance.getEmployees();

    assert.deepEqual(result, []);
  });
});
