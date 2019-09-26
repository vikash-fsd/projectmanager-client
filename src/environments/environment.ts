// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiBaseUri:"http://localhost:8080",
  
  endpoint_user_get:"/Users",
  endpoint_sort_user:"/sortUsers/",
  endpoint_search_user:"/searchUser/",
  endpoint_user_add:"/addUser",
  endpoint_user_edit:"/User",
  endpoint_user_update:"/updateUser",
  endpoint_user_delete:"/deleteUser",

  endpoint_project_get:"/Projects",
  endpoint_sort_project:"/sortProjects/",
  endpoint_search_project:"/searchProject/",
  endpoint_project_add:"/addProject",
  endpoint_project_edit:"/Project",
  endpoint_project_update:"/updateProject",
  endpoint_project_delete:"/deleteProject",

  endpoint_parentTask_get:"/parentTasks",
  endpoint_parentTask_add:"/addParentTask",
  endpoint_parentTask_edit:"/parentTask",
  endpoint_search_parentTask:"/searchParentTask",

  endpoint_task_get:"/Tasks",
  endpoint_sort_task:"/sortTasks/",
  endpoint_sort_projecttask:"/sortProjectTasks/",
  endpoint_task_add:"/addTask",
  endpoint_task_edit:"/Task",
  endpoint_task_update:"/updateTask",
  endpoint_task_delete:"/deleteTask"
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
