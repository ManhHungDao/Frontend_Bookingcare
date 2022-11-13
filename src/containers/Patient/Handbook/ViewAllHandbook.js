import React from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import { languages } from "../../../utils";
import { FormattedMessage } from "react-intl";
import { toast } from "react-toastify";
import { withRouter } from "react-router-dom";
import { useEffect } from "react";
import { getListHandbook } from "../../../services/userService";
import { useState } from "react";
import SubHeader from "../../HomePage/SubHeader";

const ViewAllHandbook = () => {
  const [listHandbook, setListHandbook] = useState([]);
  const [loadMore, setLoadMore] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      const res = await getListHandbook();
      if (res && res.errCode === 0) {
        setListHandbook = res.data;
      }
    };
    fetchData().catch((err) => console.log(err));
  }, [loadMore]);

  return (
    <>
      <SubHeader isShowSupport={true} name="Cẩm nang" />
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ViewAllHandbook)
);
