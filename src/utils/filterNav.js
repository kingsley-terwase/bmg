export const filterNavByPermissions = (nav, permissions) => {
  nav.filter((item) => {
    if (!item.permission) return true;
    return permissions.includes(item.permission);
  });
};
