export const translations = {
  tr: {
    employees: 'Çalışanlar',
    addNew: 'Yeni Ekle',
    editEmployee: 'Çalışan Düzenle',
    home: 'Anasayfa',
    cancel: 'İptal',
    save: 'Kaydet',
    employeeList: 'Çalışan Listesi',
    listView: 'Liste Görünümü',
    gridView: 'Izgara Görünümü',
    addEmployee: 'Çalışan Ekle',
    firstName: 'Adı',
    lastName: 'Soyadı',
    dateOfEmployment: 'İşe Giriş Tarihi',
    dateOfBirth: 'Doğum Tarihi',
    phone: 'Telefon',
    email: 'E-posta',
    department: 'Departman',
    position: 'Pozisyon',
    pleaseSelect: 'Lütfen Seçin',
    junior: 'Junior',
    medior: 'Medior',
    senior: 'Senior',
    actions: 'İşlemler',
    edit: 'Düzenle',
    delete: 'Sil',
    noEmployees: 'Çalışan bulunamadı',
    phoneValidationError: 'Geçerli bir telefon numarası giriniz',
    requiredFieldError: 'Bu alan zorunludur',
  },
  en: {
    employees: 'Employees',
    addNew: 'Add New',
    editEmployee: 'Edit Employee',
    home: 'Home',
    cancel: 'Cancel',
    save: 'Save',
    employeeList: 'Employee List',
    listView: 'List View',
    gridView: 'Grid View',
    addEmployee: 'Add Employee',
    firstName: 'First Name',
    lastName: 'Last Name',
    dateOfEmployment: 'Date of Employment',
    dateOfBirth: 'Date of Birth',
    phone: 'Phone',
    email: 'Email',
    department: 'Department',
    position: 'Position',
    pleaseSelect: 'Please Select',
    junior: 'Junior',
    medior: 'Medior',
    senior: 'Senior',
    actions: 'Actions',
    edit: 'Edit',
    delete: 'Delete',
    noEmployees: 'No employees found',
    phoneValidationError: 'Please enter a valid phone number',
    requiredFieldError: 'This field is required',
  },
};

export function getCurrentLang() {
  return document.documentElement.lang || 'en';
}

export function t(key) {
  const lang = getCurrentLang();
  return translations[lang] && translations[lang][key]
    ? translations[lang][key]
    : key;
}
