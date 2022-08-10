/* eslint-disable default-case */
import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import { languages } from "../../../utils";
import "./RenderList.scss";
import { FormattedMessage } from "react-intl";
import HomeHeader from "../../HomePage/HomeHeader";
import { TYPE } from "../../../utils";
import HomeFooter from "../../HomePage/HomeFooter";
import { getSpecialties } from "../../../services/userService";

class RenderList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listRender: [],
      listRenderSearch: [],
      isSearch: false,
    };
  }

  componentDidMount() {
    this.renderByType();
    const type = this.props.match.params.type;
    if (type === TYPE.DOCTOR || type === TYPE.CLINIC)
      this.setState({
        isSearch: !this.state.isSearch,
      });
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
    }
    if (this.props.location.pathname !== prevProps.location.pathname) {
      this.renderByType();
    }
  }
  renderByType = () => {
    const type = this.props.match.params.type;
    switch (type) {
      case TYPE.SPECIALTY: {
        this.setState({
          isSearch: false,
          listRender: this.props.listSpecialty,
          listRenderSearch: this.props.listSpecialty,
        });
        break;
      }
      //   case TYPE.PACKET: {
      //     res = await
      //     break;

      //   }
      case TYPE.CLINIC: {
        this.setState({
          listRenderSearch: this.props.listSpecialty,
          listRender: this.props.listClinic,
          isSearch: true,
        });
        break;
      }
      case TYPE.DOCTOR: {
        this.setState({
          isSearch: true,
          listRenderSearch: this.props.listSpecialty,
          listRender: this.props.listDoctor,
        });
        break;
      }
    }
  };
  toOtherPage = (id) => {
    const type = this.props.match.params.type;
    switch (type) {
      case TYPE.SPECIALTY: {
        if (this.props.history)
          this.props.history.push(`/detail-specialty/${id}`);

        break;
      }
      //   case TYPE.PACKET: {
      //       if (this.props.history) this.props.history.push(`/render-list/${id}`);

      //   }
      case TYPE.CLINIC: {
        if (this.props.history) this.props.history.push(`/detail-clinic/${id}`);

        break;
      }
      case TYPE.DOCTOR: {
        if (this.props.history) this.props.history.push(`/detail-doctor/${id}`);

        break;
      }
    }
  };
  renderPlaceHolder = () => {
    const type = this.props.match.params.type;
    let text;
    switch (type) {
      case TYPE.CLINIC: {
        if (this.props.language === languages.VI)
          text = `Tìm kiếm bệnh viện, phòng khám`;
        else text = `Search hospitals, clinics`;
        break;
      }
      case TYPE.DOCTOR: {
        if (this.props.language === languages.VI) text = `Tìm kiếm bác sĩ`;
        else text = `Search doctocs`;
        break;
      }
    }
    return text;
  };
  handleSearch = (event) => {
    let input = event.target.value;
    let dataSearch = this.state.listRender;
    if (input === "")
      this.setState({
        listRenderSearch: this.state.listRender,
      });
    dataSearch = dataSearch.filter((e) => {
      return e.name.toLowerCase().includes(input.toLowerCase());
    });
    this.setState({
      listRenderSearch: dataSearch,
    });
  };
  render() {
    const { language } = this.props;
    const { listRenderSearch, isSearch } = this.state;
    return (
      <>
        <HomeHeader />
        {isSearch && (
          <div className="search-bar">
            <input
              className="search"
              placeholder={this.renderPlaceHolder()}
              onChange={(event) => this.handleSearch(event)}
            />
          </div>
        )}
        <div className="list-render">
          {listRenderSearch &&
            listRenderSearch.length > 0 &&
            listRenderSearch.map((item) => {
              return (
                <div
                  key={item.id}
                  className="item-info"
                  onClick={() => {
                    this.toOtherPage(item.id);
                  }}
                >
                  {item.image && (
                    <div
                      className="image"
                      style={{ backgroundImage: `url(${item.image})` }}
                    ></div>
                  )}
                  <label className="name">
                    {item.name
                      ? item.name
                      : `${item.firstName + " " + item.lastName}`}
                  </label>
                </div>
              );
            })}
        </div>
        {/* <HomeFooter /> */}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    listClinic: state.admin.listClinicHome,
    listDoctor: state.admin.listTopDoctor,
    listSpecialty: state.admin.listSpecialty,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    /*  fetchTopDoctor: () => dispatch(actions.fetchTopDoctor()),
    getListClinicHome: () => dispatch(actions.getListClinicHome()),
    getSpecialtiesHome: () => dispatch(actions.getSpecialtiesHome()), */
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RenderList);
