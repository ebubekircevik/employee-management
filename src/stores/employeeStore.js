import {employeeData} from './mockDataEmployee';
// Observer Pattern'
export const employeeStore = {
  data: [...employeeData],
  listeners: [],

  get() {
    return this.data;
  },

  getById(id) {
    return this.data.find((emp) => emp.id === id);
  },

  subscribe(callback) {
    this.listeners.push(callback);

    return () => {
      const index = this.listeners.indexOf(callback);
      if (index > -1) {
        this.listeners.splice(index, 1);
      }
    };
  },

  notify() {
    this.listeners.forEach((callback) => callback(this.data));
  },

  set(newData) {
    this.data = newData;
    this.notify();
  },

  add(employee) {
    const newEmployee = {
      ...employee,
      id: this.generateId(),
    };
    this.set([...this.data, newEmployee]);
    return newEmployee;
  },

  update(updatedEmployee) {
    const updatedList = this.data.map((emp) =>
      emp.id === updatedEmployee.id ? updatedEmployee : emp
    );
    this.set(updatedList);
    return updatedEmployee;
  },

  delete(id) {
    this.set(this.data.filter((emp) => emp.id !== id));
  },

  generateId() {
    if (this.data.length === 0) {
      return 1;
    }
    const maxId = Math.max(...this.data.map((emp) => emp.id));
    return maxId + 1;
  },

  search(query) {
    if (!query) return this.data;

    const lowerQuery = query.toLowerCase();
    return this.data.filter(
      (emp) =>
        emp.firstName.toLowerCase().includes(lowerQuery) ||
        emp.lastName.toLowerCase().includes(lowerQuery) ||
        emp.email.toLowerCase().includes(lowerQuery) ||
        emp.phone.includes(query) ||
        emp.department.toLowerCase().includes(lowerQuery) ||
        emp.position.toLowerCase().includes(lowerQuery)
    );
  },

  filterByDepartment(department) {
    if (!department) return this.data;
    return this.data.filter((emp) => emp.department === department);
  },

  filterByPosition(position) {
    if (!position) return this.data;
    return this.data.filter((emp) => emp.position === position);
  },
};
