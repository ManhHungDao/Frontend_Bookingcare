import React from "react";
import { connect } from "react-redux";
import LoadingOverlay from "react-loading-overlay";
LoadingOverlay.propTypes = undefined
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
    showLoading: state.app.showLoading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(Loading);
