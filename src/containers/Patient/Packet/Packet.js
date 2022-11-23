/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import {
  getAllPacketService,
  getPacketByDanhMucService,
} from "../../../services/userService";
import SubHeader from "../../HomePage/SubHeader";
import "./Packet.scss";
import { FormattedMessage } from "react-intl";
import HomeFooter from "../../HomePage/HomeFooter";
// import { FormattedMessage } from "react-intl";

class Packet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listPacket: "",
      listDanhMuc: [],
    };
  }

  async componentDidMount() {
    let data = await getAllPacketService();
    this.setState({
      listPacket: data.data,
    });

    this.setState({
      listDanhMuc: [
        {
          image:
            "https://res.cloudinary.com/dhzi2feeu/image/upload/v1668138755/Booking/095803-nangcao_styns8.webp",
          name: "Cơ bản",
          value: "E1",
        },
        {
          image:
            "https://res.cloudinary.com/dhzi2feeu/image/upload/v1668138755/Booking/095749-khamtongquat_pqfvt8.webp",
          name: "Nâng cao",
          value: "E2",
        },
        {
          image:
            "https://res.cloudinary.com/dhzi2feeu/image/upload/v1668138755/Booking/095756-nam_dwo3c6.webp",
          name: "Nam",
          value: "E3",
        },
        {
          image:
            "https://res.cloudinary.com/dhzi2feeu/image/upload/v1668138755/Booking/095828-nu_y9mqqu.webp",
          name: "Nữ",
          value: "E4",
        },
      ],
    });
  }
  // componentDidUpdate(prevProps, prevState, snapshot) {
  //   if (this.props.language !== prevProps.language) {
  //   }
  // }

  getPacketByDanhMuc = async (id) => {
    let list = await getPacketByDanhMucService(id);
    this.setState({
      listPacket: list.data,
    });
  };

  handleViewDetail = (id) => {
    this.props.history.push(`/detail-packet/${id}`);
  };

  handleClickViewMore = ()=>{
    
  }

  render() {
    const { language } = this.props;
    let listPacket1 = this.state.listPacket;
    let listDanhMuc1 = this.state.listDanhMuc;
    console.log(listDanhMuc1);
    return (
      <>
        <SubHeader name={"Gói khám"} isShowSupport={true} />
        <div className="packet-container container">
          <div className="row">
            <div className="section-header">
              <div className="title-section">
                <h1 className="titlePage">Chọn danh mục</h1>
              </div>
              <div
                className="btn-section"
                onClick={() => this.handleClickViewMore()}
              >
                <FormattedMessage id="homepage.more-info" />
              </div>
            </div>
            <div className="cardDanhMuc">
              {listDanhMuc1 &&
                listDanhMuc1.map((item) => {
                  return (
                    <div
                      key={item.id}
                      className="col-3 itemCardDanhMuc"
                      onClick={() => {
                        this.getPacketByDanhMuc(item.value);
                      }}
                    >
                      <img src={item.image} className="imgDanhMuc" alt="" />
                      <div className="nameDanhMuc">{item.name}</div>
                    </div>
                  );
                })}
            </div>
          </div>
          <div className="row">
            <div className="section-header">
              <div className="title-section">
                <h1 className="titlePage">Gói khám nổi bật</h1>
              </div>
              <div
                className="btn-section"
                onClick={() => this.handleClickViewMore()}
              >
                <FormattedMessage id="homepage.more-info" />
              </div>
            </div>
            <div className="detail-packet row">
              {listPacket1 != "" &&
                listPacket1.map((item) => {
                  return (
                    <div
                      key={item.id}
                      onClick={() => {
                        this.handleViewDetail(item.id);
                      }}
                      className="col-3 detail-packet-item"
                      style={{
                        height: "auto",
                        transform: "scale(0.9, 0.9)",
                      }}
                    >
                      <img
                        className="imgPacket"
                        style={{
                          backgroundImage: `url(${item.image})`,
                          backgroundSize: `auto 100%`,
                          width: "100%",
                          height: "200px",
                          objectFit: "cover",
                          backgroundRepeat: "no-repeat",
                        }}
                      />
                      <p className="title-detail-packet">{item.title}</p>
                      <p className="price">
                        <span className="text-price">Giá :</span>
                        <span className="title-detail-packet">
                          {item.price}đ
                        </span>
                      </p>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
        <HomeFooter />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Packet));
