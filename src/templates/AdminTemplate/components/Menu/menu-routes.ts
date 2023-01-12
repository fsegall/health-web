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
    name: 'Entrevistas',
    action: Actions.VIEW_MY_INTERVIEWS
  },
  {
    path: '/indigenous-dashboard',
    name: 'Entrevistas Indígenas',
    action: Actions.VIEW_MY_INTERVIEWS
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
    action: Actions.VIEW_INTERVIEW
  },
  {
    path: '/offline',
    name: 'Registros Offline',
    action: Actions.VIEW_OFFLINE_INTERVIEWS
  },
  {
    path: '/profile',
    name: 'Perfil',
    action: Actions.UPDATE_PROFILE
  },
]
