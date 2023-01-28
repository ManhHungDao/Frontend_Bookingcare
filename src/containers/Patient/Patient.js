import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { path } from "../../utils";
import HomePage from "../HomePage/HomePage";
import Home from "../../routes/Home";
import DetailDoctor from "./../Patient/Doctor/DetailDoctor";
import DetailSpecialty from "./../Patient/Specialty/DetailSpecialty";
import DetailClinic from "./../Patient/Clinic/DetailClinic";
import Doctor from "../../routes/Doctor";
import VerifyEmail from "../../containers/HomePage/VerifyEmail";
import TableSpecialtyClinic from "./../Patient/Clinic/TableSpecialtyClinic";
import RenderList from "./../Patient/Common/RenderList";
import DetailHandbook from "./../Patient/Handbook/DetailHandbook";
import ListPostHandbook from "./../Patient/Handbook/ListPostHandbook";
import ViewAllHandbook from "./../Patient/Handbook/ViewAllHandbook";
import Packet from "./../Patient/Packet/Packet";
import Detail_packet from "./../Patient/Packet/Detail_packet";
const Patient = ({ systemMenuPath }) => {
  return (
    <>
      <Switch>
        <Route path={"/render-list/packet"} component={Packet} />
        <Route path={"/detail-packet/:id"} exact component={Detail_packet} />
        <Route path={path.HOME} exact component={Home} />
        <Route path={path.HOMEPAGE} exact component={HomePage} />
        <Route path={path.DETAIL_DOCTOR} component={DetailDoctor} />
        <Route path={path.DETAIL_SPECIALTY} component={DetailSpecialty} />
        <Route path={path.DETAIL_CLINIC} component={DetailClinic} />
        <Route path={path.HANDBOOK} component={ViewAllHandbook} />
        <Route path={path.DETAIL_HANDBOOK} component={DetailHandbook} />
        <Route path={path.VERIFY_BOOKING} component={VerifyEmail} />
        <Route
          path={path.TABLE_CLINIC_SPECIALTY}
          component={TableSpecialtyClinic}
        />
        <Route path={path.DETAIL_CLINIC_SPECIALTY} component={DetailClinic} />
        <Route path={path.RENDER_LIST} component={RenderList} />
        <Route path={path.LIST_POST_HANDBOOK} component={ListPostHandbook} />
        <Route
          component={() => {
            return <Redirect to={systemMenuPath} />;
          }}
        />
      </Switch>
    </>
  );
};

export default Patient;
