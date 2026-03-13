import { homePage } from './pages/home';
import { loginPage } from './pages/login';
import { registerPage } from './pages/register';
import { dashboardPage } from './pages/dashboard';
import { marketplacePage } from './pages/marketplace';
import { templatePage } from './pages/template';
import { cartPage } from './pages/cart';
import { checkoutPage } from './pages/checkout';
import { builderPage } from './pages/builder';
import { adminPage } from './pages/admin';

export async function loadRoute(route, session) {
  const publicRoutes = ['home', 'login', 'register', 'marketplace', 'template', 'cart'];
  if (!session && !publicRoutes.includes(route)) {
    window.location.hash = 'login';
    return loginPage();
  }

  switch (route) {
    case 'home':
      return homePage();
    case 'login':
      return loginPage();
    case 'register':
      return registerPage();
    case 'dashboard':
      return dashboardPage(session.user);
    case 'marketplace':
      return await marketplacePage();
    case 'template':
      const id = new URLSearchParams(window.location.search).get('id');
      return await templatePage(id);
    case 'cart':
      return cartPage();
    case 'checkout':
      return checkoutPage(session.user);
    case 'builder':
      return builderPage(session.user);
    case 'admin':
      return adminPage(session.user);
    default:
      return `<h2>404 - Page Not Found</h2>`;
  }
}