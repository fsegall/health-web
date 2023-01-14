import hasPermission from "../../../../authorization/constants";
import { routesHandler } from "../../../../routes/routes-options";

export const menuRoutes = (role: string) => {
  return routesOptions?.filter(r => r.action && hasPermission(role, r.action))
}

export const getPageName = (path: string) => {
  return routesOptions?.filter(r => r?.path === path)?.[0]?.name
}

export const routesOptions = routesHandler?.filter(r => r?.displayOnMenu)
