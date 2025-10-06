import { RouteConfig } from '../types/navigation';
import { AppRoute } from '../types/enums';

export const routeConfig: Record<AppRoute, RouteConfig> = {
  [AppRoute.HOME]: {
    path: '/',
    title: 'Home',
    isProtected: false,
  },
  [AppRoute.LOGIN]: {
    path: '/login',
    title: 'Login',
    isProtected: false,
  },
  [AppRoute.SIGNUP]: {
    path: '/signup',
    title: 'Sign Up',
    isProtected: false,
  },
  [AppRoute.DASHBOARD]: {
    path: '/dashboard',
    title: 'Dashboard',
    isProtected: true,
  },
  [AppRoute.GROUPS]: {
    path: '/groups',
    title: 'Groups',
    isProtected: true,
  },
  [AppRoute.GROUP_DETAILS]: {
    path: '/groups/:groupId',
    title: 'Group Details',
    isProtected: true,
  },
  [AppRoute.TRANSACTIONS]: {
    path: '/transactions',
    title: 'Transactions',
    isProtected: true,
  },
  [AppRoute.PROFILE]: {
    path: '/profile',
    title: 'Profile',
    isProtected: true,
  },
  [AppRoute.ONBOARDING]: {
    path: '/onboarding',
    title: 'Setup Profile',
    isProtected: true,
  },
};

export const getRouteByEnum = (route: AppRoute): RouteConfig => routeConfig[route];
export const getProtectedRoutes = (): RouteConfig[] => 
  Object.values(routeConfig).filter(route => route.isProtected);