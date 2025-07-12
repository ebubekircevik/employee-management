import {employeeStore} from '../src/stores/employeeStore.js';
import {assert} from '@open-wc/testing';

suite('employeeStore', () => {
  setup(() => {
    // Reset store to initial state before each test
    employeeStore.data = [
      {
        id: 1,
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        phone: '123',
        department: 'Tech',
        position: 'Senior',
      },
      {
        id: 2,
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane@example.com',
        phone: '456',
        department: 'HR',
        position: 'Junior',
      },
    ];
    employeeStore.listeners = [];
  });

  test('gets all employees', () => {
    const employees = employeeStore.get();
    assert.equal(employees.length, 2);
    assert.equal(employees[0].firstName, 'John');
  });

  test('gets employee by id', () => {
    const employee = employeeStore.getById(1);
    assert.equal(employee.firstName, 'John');
    assert.equal(employee.lastName, 'Doe');
  });

  test('returns undefined for non-existent id', () => {
    const employee = employeeStore.getById(999);
    assert.isUndefined(employee);
  });

  test('adds new employee', () => {
    const newEmployee = {firstName: 'Bob', lastName: 'Johnson'};
    const added = employeeStore.add(newEmployee);

    assert.equal(added.id, 3); // Auto-generated ID
    assert.equal(added.firstName, 'Bob');
    assert.equal(employeeStore.data.length, 3);
  });

  test('updates existing employee', () => {
    const updatedEmployee = {id: 1, firstName: 'Johnny', lastName: 'Doe'};
    const result = employeeStore.update(updatedEmployee);

    assert.equal(result.firstName, 'Johnny');
    assert.equal(employeeStore.getById(1).firstName, 'Johnny');
  });

  test('deletes employee', () => {
    employeeStore.delete(1);

    assert.equal(employeeStore.data.length, 1);
    assert.isUndefined(employeeStore.getById(1));
  });

  test('subscribes and notifies listeners', () => {
    let notifiedData = null;
    const listener = (data) => {
      notifiedData = data;
    };

    const unsubscribe = employeeStore.subscribe(listener);
    employeeStore.set([{id: 1, name: 'Test'}]);

    assert.deepEqual(notifiedData, [{id: 1, name: 'Test'}]);

    unsubscribe();
    assert.equal(employeeStore.listeners.length, 0);
  });

  test('searches employees by name', () => {
    const results = employeeStore.search('John');
    assert.equal(results.length, 1);
    assert.equal(results[0].firstName, 'John');
  });

  test('searches employees by email', () => {
    const results = employeeStore.search('jane@example.com');
    assert.equal(results.length, 1);
    assert.equal(results[0].firstName, 'Jane');
  });

  test('returns all employees for empty search', () => {
    const results = employeeStore.search('');
    assert.equal(results.length, 2);
  });

  test('generates unique ids', () => {
    // Clear data first to test ID generation from scratch
    employeeStore.data = [];
    const id1 = employeeStore.generateId();
    employeeStore.data.push({id: id1}); // Simulate adding an employee
    const id2 = employeeStore.generateId();
    assert.equal(id1, 1);
    assert.equal(id2, 2);
  });
});
