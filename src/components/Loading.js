import React from "react";
import BeatLoader from "react-spinners/BeatLoader";
import { connect } from "react-redux";
import LoadingOverlay from "react-loading-overlay";
const Loading = ({ showLoading }) => {
  const style = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  };
  return (
    // <div style={style}>
    //   <BeatLoader
    //     color={"#338fd2"}
    //     loading={showLoading}
    //     size={20}
    //     aria-label="Loading Spinner"
    //     data-testid="loader"
    //   />
    // </div>

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
