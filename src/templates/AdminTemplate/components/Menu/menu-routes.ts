import hasPermission, { Actions } from "../../../../authorization/constants";

export const menuRoutes = (role: string) => {
  return routesOptions?.filter(r => r.action && hasPermission(role, r.action))
}

export const getPageName = (path: string) => {
  return routesOptions?.filter(r => r.path === path)?.[0]?.name
}

const routesOptions = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    action: Actions.VIEW_ALL_INTERVIEWS
  },
  {
    path: '/profile',
    name: 'Perfil',
    action: null
  },
  {
    path: '/project',
    name: 'Novo Projeto',
    action: Actions.CREATE_PROJECT
  },
  {
    path: '/interviewers',
    name: 'Pesquisadores',
    action: Actions.VIEW_ALL_INTERVIEWS
  },
  {
    path: '/accept',
    name: 'Iniciar Pesquisa',
    action: Actions.CREATE_INTERVIEW
  },
  {
    path: '/offline',
    name: 'Registros Offline',
    action: Actions.VIEW_MY_INTERVIEWS
  },
]
