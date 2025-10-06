import { AppRoute } from './enums';

export interface RouteConfig {
  path: string;
  title: string;
  isProtected: boolean;
  icon?: string;
  description?: string;
}

export interface NavigationItem {
  route: AppRoute;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  isActive?: boolean;
}

export interface BreadcrumbItem {
  label: string;
  route?: AppRoute;
  isActive?: boolean;
}