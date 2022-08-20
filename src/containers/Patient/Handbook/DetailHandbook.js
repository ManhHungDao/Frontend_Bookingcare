import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import { languages } from "../../../utils";
import "./DetailHandbook.scss";
import { FormattedMessage } from "react-intl";
import HomeHeader from "../../HomePage/HomeHeader";
import { toast } from "react-toastify";
import HomeFooter from "../../HomePage/HomeFooter";
import {
  getDetailHandbook,
  getRelatedHandbook,
  getListHandbook,
} from "../../../services/userService";

class DetailHandbook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detailHandbook: "",
      relatedHandBook: "",
      listHandbook: [],
    };
  }

  async componentDidMount() {
    const handbookId = this.props.match.params.id;
    const res = await getDetailHandbook(handbookId);
    if (res && res.errCode === 0) {
      this.setState({
        detailHandbook: res.data,
      });
    } else {
      toast.error("Get Detail Handbook Failed");
    }

    const resListHB = await getListHandbook();
    if (resListHB && resListHB.errCode === 0) {
      this.setState({
        listHandbook: resListHB.data,
      });
    } else {
      toast.error("Get Detail Handbook Failed");
    }
  }
  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
    }
    if (this.state.detailHandbook !== prevState.detailHandbook) {
      const res = await getRelatedHandbook(
        this.state.detailHandbook.handbookId
      );
      if (res && res.errCode === 0) {
        this.setState({
          relatedHandBook: res.data,
        });
      } else {
        toast.error("Get Related Handbook Failed");
      }
    }
  }
  renderNoteHandbook = () => {
    let content;
    if (this.props.language === languages.VI)
      content =
        "BookingCare là Nền tảng Y tế chăm sóc sức khỏe toàn diện hàng đầu Việt Nam kết nối người dùng với trên 150 bệnh viện - phòng khám uy tín, hơn 1,000 bác sĩ chuyên khoa giỏi và hàng nghìn dịch vụ, sản phẩm y tế chất lượng cao.";
    else
      content = `BookingCare is Vietnam's leading comprehensive healthcare platform connecting users with over 150 prestigious hospitals - clinics, more than 1,000 good specialists and thousands of quality medical products and services high.`;
    return (
      <div className="handbook-note-hash">
        <div className="right">
          <i className="fas fa-lightbulb"></i>
        </div>
        <div className="left">{content}</div>
      </div>
    );
  };
  render() {
    const { language } = this.props;
    const { detailHandbook, relatedHandBook, listHandbook } = this.state;
    return (
      <>
        <HomeHeader />
        <div className="handbook-container grid">
          <h1 className="handbook-title">
            {detailHandbook.title ? detailHandbook.title : ""}
          </h1>
          <div className="handbook-description">
            {detailHandbook.description ? detailHandbook.description : ""}
          </div>
          {this.renderNoteHandbook()}
          {detailHandbook && detailHandbook.contentHTML && (
            <p
              className="handbook-content"
              contentEditable="true"
              dangerouslySetInnerHTML={{
                __html: detailHandbook.contentHTML,
              }}
            ></p>
          )}
          <div className="handbook-footer">
            <p className="handbook-footer_note">
              {detailHandbook.note ? detailHandbook.note : ""}
            </p>
            <div className="detail-handbook"></div>
          </div>
        </div>
        <div className="handbook-related grid">
          <ul className="list-handbook-related">
            <h1 className="title-related">Bài viết liên quan</h1>
            {relatedHandBook &&
              relatedHandBook.length > 0 &&
              relatedHandBook.map((item, index) => {
                return (
                  <li className="handbook-related_item" key={index}>
                    <div
                      className="item-image"
                      style={{ backgroundImage: `url(${item.image})` }}
                    ></div>
                    {/* <img className="item-image" src={item.image} /> */}
                    <h4 className="item-title">
                      {item.title ? item.title : ""}
                    </h4>
                  </li>
                );
              })}
          </ul>
          <hr className="seperate-section" />
        </div>
        <div className="list-handbook grid">
          <p className="list-handbook-title">danh mục cẩm nang</p>
          <div className="list-handbook-container">
            {listHandbook &&
              listHandbook.length > 0 &&
              listHandbook.map((item, index) => {
                return (
                  <p className="item-name-handbook" key={index}>
                    {item.name}
                  </p>
                );
              })}
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailHandbook);
