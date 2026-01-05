import { PERMISSIONS } from "../Config/auth/permissions";
import { ADMIN_TYPES } from "../Config/auth/constants";

export const resolveAdminPermissions = (adminTypes = []) => {
  const permissions = [];

  adminTypes.forEach((type) => {
    switch (type) {
      case ADMIN_TYPES.BLOGS:
        permissions.push(PERMISSIONS.BLOGS.VIEW, PERMISSIONS.BLOGS.MANAGE);
        break;

      case ADMIN_TYPES.ORDERS:
        permissions.push(PERMISSIONS.ORDERS.VIEW, PERMISSIONS.ORDERS.MANAGE);
        break;

      case ADMIN_TYPES.FINANCE:
        permissions.push(PERMISSIONS.FINANCE.VIEW);
        break;

      case ADMIN_TYPES.SUPPORT:
        permissions.push(PERMISSIONS.SUPPORT.VIEW);
        break;

      case ADMIN_TYPES.USERS:
        permissions.push(PERMISSIONS.USERS.VIEW, PERMISSIONS.USERS.MANAGE);
        break;

      case ADMIN_TYPES.SETTINGS:
        permissions.push(PERMISSIONS.SETTINGS.MANAGE);
        break;

      default:
        break;
    }
  });

  return permissions;
};
