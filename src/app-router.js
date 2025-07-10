// import {Router} from '@vaadin/router';

// const outlet = document.getElementById('outlet');

// const routes = [
//   {
//     path: '/edit',
//     component: 'employee-form',
//     action: async () => {
//       await import('./screens/employee-form/employee-form.js');
//     },
//   },
//   {
//     path: '/',
//     component: 'employee-list',
//     action: async () => {
//       await import('./screens/employee-list/employee-list.js');
//     },
//   },

  //   {
  //     path: '/',
  //     component: 'employee-form',
  //     action: async () => {
  //       await import('./_shared/employee-form/employee-form.js');
  //     },
  //     // mode: 'new' prop'u employee-form içinde default olarak var
  //   },
  //   {
  //     path: '/edit/:id',
  //     component: 'employee-form',
  //     action: async (context, commands) => {
  //       await import('./_shared/employee-form/employee-form.js');
  //       // employee-form componenti içinde id'ye göre employee verisi alınacak
  //     },
  //   },
// ];

// export function initRouter() {
//   if (!outlet) {
//     throw new Error('Router outlet not found!');
//   }
//   const router = new Router(outlet);
//   router.setRoutes(routes);
// }

// initRouter();

import {Router} from '@vaadin/router';

const router = new Router(document.getElementById('outlet'));
router.setRoutes([
  {path: '/', component: 'employee-form'},
  {path: '/edit', component: 'employee-list'},
]);
