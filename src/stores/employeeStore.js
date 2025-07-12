import {employeeData} from './mockDataEmployee';
// Observer Pattern'
export const employeeStore = {
  data: [...employeeData], // Initialize with mock data
  listeners: [],

  // Get all employees
  get() {
    return this.data;
  },

  // Get employee by ID
  getById(id) {
    return this.data.find((emp) => emp.id === id);
  },

  // Subscribe to store changes
  subscribe(callback) {
    this.listeners.push(callback);

    // Return unsubscribe function
    return () => {
      const index = this.listeners.indexOf(callback);
      if (index > -1) {
        this.listeners.splice(index, 1);
      }
    };
  },

  // Notify all listeners
  notify() {
    this.listeners.forEach((callback) => callback(this.data));
  },

  // Set new data
  set(newData) {
    this.data = newData;
    this.notify();
  },

  // Add new employee
  add(employee) {
    const newEmployee = {
      ...employee,
      id: this.generateId(),
    };
    this.set([...this.data, newEmployee]);
    return newEmployee;
  },

  // Update existing employee
  update(updatedEmployee) {
    const updatedList = this.data.map((emp) =>
      emp.id === updatedEmployee.id ? updatedEmployee : emp
    );
    this.set(updatedList);
    return updatedEmployee;
  },

  // Delete employee by ID
  delete(id) {
    this.set(this.data.filter((emp) => emp.id !== id));
  },

  // Generate unique ID
  generateId() {
    if (this.data.length === 0) {
      return 1;
    }
    const maxId = Math.max(...this.data.map((emp) => emp.id));
    return maxId + 1;
  },

  // Search employees
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

  // Filter by department
  filterByDepartment(department) {
    if (!department) return this.data;
    return this.data.filter((emp) => emp.department === department);
  },

  // Filter by position
  filterByPosition(position) {
    if (!position) return this.data;
    return this.data.filter((emp) => emp.position === position);
  },
};
