const Roles = {
  VISITOR: "VISITOR",
  INTERVIEWER: "INTERVIEWER",
  COORDINATOR: "COORDINATOR",
  ADMIN: "ADMIN",
};

const Actions = {
  VIEW_ALL_INTERVIEWERS: "VIEW_ALL_INTERVIEWERS",
  VIEW_ALL_INTERVIEWS: "VIEW_ALL_INTERVIEWS",
  VIEW_MY_INTERVIEWS: "VIEW_MY_INTERVIEWS",
  VIEW_PROJECTS: "VIEW_PROJECTS",
  CREATE_PROJECT: "CREATE_PROJECT",
  CREATE_INTERVIEW: "CREATE_INTERVIEW",
  VIEW_INTERVIEW: "VIEW_INTERVIEW",
  ASSIGN_INTERVIEWER_ROLE: "ASSIGN_INTERVIEWER_ROLE",
  UPDATE_PROFILE: "UPDATE_PROFILE",
  VIEW_OFFLINE_INTERVIEWS: "VIEW_OFFLINE_INTERVIEWS",
}

const mappings = new Map();

mappings.set(Actions.VIEW_ALL_INTERVIEWERS, [Roles.COORDINATOR, Roles.ADMIN]);
mappings.set(Actions.VIEW_ALL_INTERVIEWS, [Roles.COORDINATOR, Roles.ADMIN]);
mappings.set(Actions.VIEW_MY_INTERVIEWS, [Roles.INTERVIEWER, Roles.COORDINATOR, Roles.ADMIN]);
mappings.set(Actions.VIEW_PROJECTS, [Roles.COORDINATOR, Roles.ADMIN]);
mappings.set(Actions.CREATE_PROJECT, [Roles.COORDINATOR, Roles.ADMIN]);
mappings.set(Actions.VIEW_INTERVIEW, [Roles.INTERVIEWER, Roles.COORDINATOR, Roles.VISITOR, Roles.ADMIN]);
mappings.set(Actions.CREATE_INTERVIEW, [Roles.INTERVIEWER, Roles.COORDINATOR, Roles.ADMIN]);
mappings.set(Actions.ASSIGN_INTERVIEWER_ROLE, [Roles.COORDINATOR, Roles.ADMIN]);
mappings.set(Actions.UPDATE_PROFILE, [Roles.COORDINATOR, Roles.ADMIN, Roles.VISITOR, Roles.INTERVIEWER]);
mappings.set(Actions.VIEW_OFFLINE_INTERVIEWS, [Roles.COORDINATOR, Roles.ADMIN, Roles.INTERVIEWER]);

function hasPermission(role: string, action: string) {
  if (mappings.has(action)) {
    return mappings.get(action).includes(role);
  }

  return false;
}

export { Roles, Actions };
export default hasPermission;
