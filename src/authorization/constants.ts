const Roles = {
  ADMIN: "ADMIN",
  COORDINATOR: "COORDINATOR",
  INTERVIEWER: "INTERVIEWER"
};

const Actions = {
  VIEW_ALL_INTERVIEWS: "VIEW_ALL_INTERVIEWS",
  VIEW_MY_INTERVIEWS: "VIEW_MY_INTERVIEWS",
  VIEW_PROJECTS: "VIEW_PROJECTS",
  CREATE_PROJECT: "CREATE_PROJECT",
  ASSIGN_COORDINATOR_ROLE: "ASSIGN_COORDINATOR_ROLE",
}

const mappings = new Map();

mappings.set(Actions.VIEW_ALL_INTERVIEWS, [Roles.ADMIN, Roles.COORDINATOR]);
mappings.set(Actions.VIEW_MY_INTERVIEWS, [Roles.ADMIN, Roles.COORDINATOR, Roles.INTERVIEWER]);
mappings.set(Actions.VIEW_PROJECTS, [Roles.ADMIN, Roles.COORDINATOR]);
mappings.set(Actions.CREATE_PROJECT, [Roles.ADMIN, Roles.COORDINATOR]);
mappings.set(Actions.ASSIGN_COORDINATOR_ROLE, [Roles.ADMIN, Roles.COORDINATOR]);

function hasPermission(role: string, action: string) {
  console.log('action inside function', action);
  console.log('mappings inside function', mappings.keys());
  if (mappings.has(action)) {
    console.log('here')
    return mappings.get(action).includes(role);
  }

  return false;
}

export { Roles, Actions };
export default hasPermission;
