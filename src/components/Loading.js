import React from "react";
import { connect } from "react-redux";
import LoadingOverlay from "react-loading-overlay";
const Loading = ({ showLoading }) => {
  return (
    <LoadingOverlay
      active={showLoading}
      spinner
      text="Loading..."
    ></LoadingOverlay>
  );
};

const mapStateToProps = (state) => {
  return {
    showLoading: state.admin.showLoading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(Loading);
