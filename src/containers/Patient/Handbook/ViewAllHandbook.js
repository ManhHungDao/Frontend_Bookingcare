import React from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import { languages } from "../../../utils";
import { FormattedMessage } from "react-intl";
import { toast } from "react-toastify";
import { withRouter } from "react-router-dom";
import { useEffect, useState } from "react";
import { getHandBookHome } from "../../../services/userService";
import HomeHeader from "../../HomePage/HomeHeader";
import "./ViewAllHandbook.scss";

const ViewAllHandbook = () => {
  const [listHandbook, setListHandbook] = useState([]);
  const [loadMore, setLoadMore] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      const res = await getHandBookHome();
      if (res && res.errCode === 0) {
        setListHandbook(res.data);
      }
    };
    fetchData().catch((err) => console.log(err));
  }, []);

  return (
    <>
      {/* <HomeHeader /> */}
      <div className="hanbook-container">
        <div className="container">
          <h1 className="pt-5">Cẩm Nang</h1>
          <div className="content-body-handbook">
            <div className="row">
              {listHandbook &&
                listHandbook.map((item) => (
                  <div className="col-12 body-content-item" key={item.id}>
                    <div className="handbook-img">
                      <img
                        src={item?.image ? item.image : ""}
                        alt={item?.title ? item.title : ""}
                      />
                    </div>
                      <span className="handbook-name">
                        {item?.title ? item.title : ""}
                      </span>
                  </div>
                ))}
              <div className="col-12" style={{padding:0}}>
                <span className="view-more">
                  Xem thêm<i className="fas fa-caret-down"></i>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
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
