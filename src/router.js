import {Router} from '@vaadin/router';

const router = new Router(document.getElementById('outlet'));
router.setRoutes([
  {path: '/edit/:id', component: 'employee-form'},
  {path: '/', component: 'employee-list'},
]);
