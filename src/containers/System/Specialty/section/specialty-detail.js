import {
  Box,
  Card,
  CardContent,
  CardHeader,
  TextField,
  Unstable_Grid2 as Grid,
} from "@mui/material";

import { connect } from "react-redux";
import * as actions from "../../../../store/actions";
import Select from "react-select";
import { useEffect, useState } from "react";

const SpecialtyDetail = ({
  selectClinic,
  setSelectClinic,
  selectSpecialty,
  setSelectSpecialty,
  getListClinicAction,
  allcodeType,
  fetchAllcodeByTypeAction,
  listClinic,
}) => {
  const [dataClinic, setDataClinic] = useState([]);
  const [dataSpecialty, setDataSpecialty] = useState([]);
  useEffect(() => {
    getListClinicAction();
    fetchAllcodeByTypeAction("SPECIALTY");
  }, []);

  useEffect(() => {
    if (listClinic && listClinic.length > 0)
      setDataClinic(listClinic.map((e) => ({ value: e._id, label: e.name })));
    if (allcodeType && allcodeType.length > 0)
      setDataSpecialty(
        allcodeType.map((e) => ({ value: e._id, label: e.valueVI }))
      );
  }, [listClinic, allcodeType]);
  return (
    <>
      <Card>
        <CardHeader title="Thông tin cá nhân" />
        <CardContent sx={{ pt: 0 }}>
          <Box sx={{ m: -1.5 }}>
            <Grid container spacing={3}>
              <Grid xs={12} md={6}>
                <Select
                  value={selectClinic}
                  onChange={setSelectClinic}
                  options={dataClinic}
                  placeholder="Chọn phòng khám"
                  styles={{
                    menuPortal: (base) => ({ ...base, zIndex: 99999 }),
                  }}
                />
              </Grid>
              <Grid xs={12} md={6}>
                <Select
                  value={selectSpecialty}
                  onChange={setSelectSpecialty}
                  options={dataSpecialty}
                  placeholder="Chọn chuyên khoa"
                  styles={{
                    menuPortal: (base) => ({ ...base, zIndex: 99999 }),
                  }}
                />
              </Grid>
            </Grid>
          </Box>
        </CardContent>
      </Card>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    listClinic: state.admin.listClinic,
    allcodeType: state.admin.allcodeType,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getListClinicAction: () => dispatch(actions.getListClinicAction()),
    clearStatus: () => dispatch(actions.clearStatus()),
    fetchAllcodeByTypeAction: (type) =>
      dispatch(actions.fetchAllcodeByTypeAction(type)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SpecialtyDetail);
