import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import { languages } from "../../../utils";
import "./TableSpecialtyClinic.scss";
import { FormattedMessage } from "react-intl";
import HomeFooter from "../../HomePage/HomeFooter";
import HomeHeader from "../../HomePage/HomeHeader";
import { getClinic } from "../../../services/userService";

class TableSpecialtyClinic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listSpecialty: [],
    };
  }

  componentDidMount() {
    const clinicId = this.props.match.params.id;
    this.props.getListSpecialtyByClinicId(clinicId);
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
    }
    if (this.props.listSpecialty !== prevProps.listSpecialty) {
      this.setState({
        listSpecialty: this.props.listSpecialty,
      });
    }
  }
  handleClickSpecialty = (id) => {
    const clinicId = this.props.match.params.id;
    this.props.history.push(
      `/detail-clinic-specialty/clinicId=${clinicId}/specialtyId=${id}`
    );
  };
  render() {
    const { language } = this.props;
    const { listSpecialty } = this.state;
    return (
      <>
        <HomeHeader />
        <ul className="menu-clinic-specialty">
          {listSpecialty &&
            listSpecialty.length > 0 &&
            listSpecialty.map((item) => {
              return (
                <li
                  key={item.id}
                  onClick={() => this.handleClickSpecialty(item.id)}
                >
                  {item.name}
                </li>
              );
            })}
        </ul>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    listSpecialty: state.admin.listSpecialtyByClinic,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getListSpecialtyByClinicId: (id) =>
      dispatch(actions.getListSpecialtyByClinicId(id)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TableSpecialtyClinic);
