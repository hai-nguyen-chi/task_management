enum Permissions {
  read_user = 'read_user',
  create_user = 'create_user',
  update_user = 'update_user',
  delete_user = 'delete_user',
  read_project = 'read_project',
  create_project = 'create_project',
  update_project = 'update_project',
  delete_project = 'delete_project',
  read_sprint = 'read_sprint',
  create_sprint = 'create_sprint',
  update_sprint = 'update_sprint',
  delete_sprint = 'delete_sprint',
  read_tag = 'read_tag',
  create_tag = 'create_tag',
  update_tag = 'update_tag',
  delete_tag = 'delete_tag'
}

const user_permission = [
  Permissions.read_user,
  Permissions.update_user,
  Permissions.read_project,
  Permissions.read_sprint,
  Permissions.read_tag,
  Permissions.create_tag,
  Permissions.update_tag,
  Permissions.delete_tag
]

export { Permissions, user_permission }
