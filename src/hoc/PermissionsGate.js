import { cloneElement } from "react";
import { connect } from "react-redux";

const hasPermission = ({ permissions, scopes }) => {
  console.log("scopes:", scopes);
  console.log(" permissions:", permissions);
  const scopesMap = {};
  scopes.forEach((scope) => {
    scopesMap[scope] = true;
  });

  return permissions.some((permission) => scopesMap[permission]);
};

export const PermissionsGate = ({ children, scopes = [], permissions }) => {
  const permissionGranted = hasPermission({ permissions, scopes });
  console.log(" permissionGranted:", permissionGranted);

  if (!permissionGranted) return <></>;

  return <>{children}</>;
};

const mapStateToProps = (state) => ({
  permissions: state.user.accountPermission,
});

export default connect(mapStateToProps)(PermissionsGate);
