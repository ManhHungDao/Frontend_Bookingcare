import { cloneElement } from "react";
import { connect } from "react-redux";

const hasPermission = ({ permissions, scopes }) => {
  const scopesMap = {};
  scopes.forEach((scope) => {
    scopesMap[scope] = true;
  });

  return permissions.some((permission) => scopesMap[permission]);
};

export const PermissionsGate = ({
  children,
  scopes = [],
  permissions,
  userInfo,
}) => {
  if (userInfo.roleId === "R1" || userInfo.roleId === "R0")
    return <>{children}</>;
  const permissionGranted = hasPermission({ permissions, scopes });

  if (!permissionGranted) return <></>;

  return <>{children}</>;
};

const mapStateToProps = (state) => ({
  permissions: state.user.accountPermission,
  userInfo: state.user.userInfo,
});

export default connect(mapStateToProps)(PermissionsGate);
