import { ROLES } from "../Config/auth/constants";
import { ADMIN_NAV } from "../Layout/Dashboard/Navigation/adminNav";
import { EXPERT_NAV } from "../Layout/Dashboard/Navigation/expertNav";
import { USER_NAV } from "../Layout/Dashboard/Navigation/userNav";
import { filterNavByPermissions } from "./filterNav";
import { resolveAdminPermissions } from "./resolveAdminPermissions";

export const getNav = (user) => {
  if (!user) return [];
  console.log("Getting nav for user:", user);

  const role = user.role;

  // 🔥 SUPER ADMIN SEES EVERYTHING
  if (role === ROLES.SUPER_ADMIN) {
    return ADMIN_NAV;
  }

  // 🔐 REGULAR ADMIN → FILTER BY PERMISSIONS
  if (role === ROLES.ADMIN) {
    const permissions = resolveAdminPermissions(user.adminTypes || []);
    return filterNavByPermissions(ADMIN_NAV, permissions);
  }

  if (user.role === ROLES.EXPERT) return EXPERT_NAV;
  if (user.role === ROLES.USER) return USER_NAV;

  return [];
};
