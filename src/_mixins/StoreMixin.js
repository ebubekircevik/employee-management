// Composition Pattern

export const StoreMixin = (Base) =>
  class extends Base {
    constructor() {
      super();
      this._storeUnsubscribe = null;
    }

    connectedCallback() {
      super.connectedCallback();
      this._subscribeToStore();
    }

    disconnectedCallback() {
      if (this._storeUnsubscribe) {
        this._storeUnsubscribe();
        this._storeUnsubscribe = null;
      }
      super.disconnectedCallback();
    }

    _subscribeToStore() {
      if (this.store && typeof this.store.subscribe === 'function') {
        this._storeUnsubscribe = this.store.subscribe((data) => {
          this._onStoreUpdate(data);
        });
      }
    }

    _onStoreUpdate(data) {
      this.requestUpdate();
    }

    addEmployee(employee) {
      if (this.store && typeof this.store.add === 'function') {
        return this.store.add(employee);
      }
    }

    updateEmployee(employee) {
      if (this.store && typeof this.store.update === 'function') {
        return this.store.update(employee);
      }
    }

    deleteEmployee(id) {
      if (this.store && typeof this.store.delete === 'function') {
        this.store.delete(id);
      }
    }

    getEmployees() {
      if (this.store && typeof this.store.get === 'function') {
        return this.store.get();
      }
      return [];
    }

    getEmployeeById(id) {
      if (this.store && typeof this.store.getById === 'function') {
        return this.store.getById(id);
      }
      return null;
    }

    searchEmployees(query) {
      if (this.store && typeof this.store.search === 'function') {
        return this.store.search(query);
      }
      return [];
    }
  };
