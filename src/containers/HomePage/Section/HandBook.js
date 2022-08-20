/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { getHandBookHome } from "../../../services/userService";
// slide slick
import { toast } from "react-toastify";
import Slider from "react-slick";
class HandBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listHandbook: [],
    };
  }

  async componentDidMount() {
    const res = await getHandBookHome();
    if (res && res.errCode === 0) {
      this.setState({
        listHandbook: res.data,
      });
    } else {
      toast.error("Get Handbook Home Failed");
    }
  }
  componentDidUpdate() {}

  render() {
    const settings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 2,
      slidesToScroll: 1,
    };
    const { listHandbook } = this.state;
    return (
      <>
        <div className="section section-handbook">
          <div className="section-container">
            <div className="section-header">
              <div className="title-section">
                <FormattedMessage id="homepage.handbook" />
              </div>
              <div className="btn-section">
                <FormattedMessage id="homepage.view-all" />
              </div>
            </div>
            <div className="section-body">
              <Slider {...settings}>
                {listHandbook &&
                  listHandbook.length > 0 &&
                  listHandbook.map((item, index) => {
                    return (
                      <div
                        key={index}
                        className="section-customize"
                        // onClick={() => this.handleViewDetailClinic(item)}
                      >
                        <div className="title-handbook">{item.title}</div>
                        <div
                          className="bg-image"
                          style={{ backgroundImage: `url(${item.image})` }}
                        ></div>
                        {/* <span className="title-handbook">{item.title}</span> */}
                      </div>
                    );
                  })}
              </Slider>
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HandBook);
