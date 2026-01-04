import SignIn from '../pages/Signin';
import SignUp from '../pages/Signup';
import Dashboard from '../pages/Dashboard';
import OfflineInterviews from '../pages/OfflineInterviews';
import Accept from '../pages/Accept';
import Interview from '../pages/Interview';
import Profile from '../pages/Profile';
import Project from '../pages/Project';
import Interviewers from '../pages/Interviewers';
import ForgotPasword from '../pages/ForgotPassword';
import ResetPasword from '../pages/ResetPassword';
import IndigenousInterview from '../pages/Indigenous_Interview';
import ViewIndigenousInterview from '../pages/ViewIndigenousInterview';
import IndigenousDashboardSection from '../pages/Dashboard/Indigenous';
import { Actions } from '../authorization/constants';

export const routesHandler = [
  {
    path: '/',
    exact: true,
    component: SignIn,
    isPrivate: false,
    displayOnMenu: false,
    action: null,
    name: 'Login'
  },
  {
    path: '/signup',
    exact: true,
    component: SignUp,
    isPrivate: false,
    displayOnMenu: false,
    action: null,
    name: 'Sign Up'
  },
  {
    path: '/forgot-password',
    exact: true,
    component: ForgotPasword,
    isPrivate: false,
    displayOnMenu: false,
    action: null,
    name: 'Esqueceu senha'
  },
  {
    path: '/reset-password',
    exact: true,
    component: ResetPasword,
    isPrivate: false,
    displayOnMenu: false,
    action: null,
    name: 'Recuperar senha'
  },
  {
    path: '/dashboard',
    exact: true,
    component: Dashboard,
    isPrivate: true,
    displayOnMenu: true,
    action: Actions.VIEW_MY_INTERVIEWS,
    name: 'Entrevistas'
  },
  {
    path: '/indigenous-dashboard',
    exact: true,
    component: IndigenousDashboardSection,
    isPrivate: true,
    displayOnMenu: true,
    action: Actions.VIEW_MY_INTERVIEWS,
    name: 'Entrevistas Indígenas'
  },
  {
    path: '/accept',
    exact: true,
    component: Accept,
    isPrivate: true,
    displayOnMenu: true,
    action: Actions.VIEW_INTERVIEW,
    name: 'Iniciar Entrevista'
  },
  {
    path: '/interview',
    exact: true,
    component: Interview,
    isPrivate: true,
    displayOnMenu: false,
    action: Actions.VIEW_INTERVIEW,
    name: 'Formulário de Pesquisa'
  },
  {
    path: '/indigenous-interview',
    exact: true,
    component: IndigenousInterview,
    isPrivate: true,
    displayOnMenu: false,
    action: Actions.VIEW_INTERVIEW,
    name: 'Formulário de Pesquisa Indígena'
  },
  {
    path: '/indigenous-interview/:id',
    exact: false,
    component: IndigenousInterview,
    isPrivate: true,
    displayOnMenu: false,
    action: Actions.VIEW_INTERVIEW,
    name: 'Formulário de Pesquisa Indígena'
  },
  {
    path: '/view-indigenous-interview/:id',
    exact: false,
    component: ViewIndigenousInterview,
    isPrivate: true,
    displayOnMenu: false,
    action: Actions.VIEW_INTERVIEW,
    name: 'Visualizar Entrevista Indígena'
  },
  {
    path: '/interview/:id',
    exact: false,
    component: Interview,
    isPrivate: true,
    displayOnMenu: false,
    action: Actions.VIEW_INTERVIEW,
    name: 'Formulário de Pesquisa'
  },
  {
    path: '/project',
    exact: true,
    component: Project,
    isPrivate: true,
    displayOnMenu: true,
    action: Actions.CREATE_PROJECT,
    name: 'Criar Projeto'
  },
  {
    path: '/interviewers',
    exact: true,
    component: Interviewers,
    isPrivate: true,
    displayOnMenu: true,
    action: Actions.VIEW_ALL_INTERVIEWERS,
    name: 'Pesquisadores(as)'
  },
  {
    path: '/offline',
    exact: true,
    component: OfflineInterviews,
    isPrivate: true,
    displayOnMenu: true,
    action: Actions.VIEW_MY_INTERVIEWS,
    name: 'Enviar Entrevistas Offline'
  },
  {
    path: '/profile',
    exact: true,
    component: Profile,
    isPrivate: true,
    displayOnMenu: true,
    action: Actions.UPDATE_PROFILE,
    name: 'Perfil'
  },
]
