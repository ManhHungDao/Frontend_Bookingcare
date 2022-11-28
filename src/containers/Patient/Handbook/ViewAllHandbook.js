import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { useEffect, useState } from "react";
import { getHandBookHome } from "../../../services/userService";
import HomeHeader from "../../HomePage/HomeHeader";
import "./ViewAllHandbook.scss";

const ViewAllHandbook = (props) => {
  const [listHandbook, setListHandbook] = useState([]);
  const [page, setPage] = useState(0);
  const SKIP_COUNT = 10;

  const loadMore = () => {
    setPage(page + SKIP_COUNT);
  };
  useEffect(() => {
    const fetchData = async () => {
      const res = await getHandBookHome(SKIP_COUNT, page);
      if (res && res.errCode === 0) {
        const items = res.data || [];
        let newData = page > 0 ? [...listHandbook, ...items] : [...items];
        setListHandbook(newData);
      }
    };
    fetchData().catch((err) => console.log(err));
  }, [page]);
  const handleViewDetailHandbook = (id) => {
    if (props.history) props.history.push(`/detail-handbook/${id}`);
  };
  return (
    <>
      <HomeHeader />
      <div className="hanbook-container">
        <div className="container">
          <h1 className="pt-5">Cẩm Nang</h1>
          <div className="content-body-handbook">
            <div className="row">
              {listHandbook &&
                listHandbook.map((item) => (
                  <div
                    className="col-12 body-content-item"
                    key={item.id}
                    onClick={() => handleViewDetailHandbook(item.id)}
                  >
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
              <div className="col-12" style={{ padding: 0 }}>
                <span className="view-more" onClick={() => loadMore()}>
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
