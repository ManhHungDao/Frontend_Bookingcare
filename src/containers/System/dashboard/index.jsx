import { connect } from "react-redux";
import { Box, IconButton, Typography, Grid } from "@mui/material";
import * as actions from "../../../store/actions";
import Header from "../../../components/Header";
import StatBox from "../../../components/StatBox";
import iconsHospital from "../../../assets/icon-dashboard/hospital.png";
import iconDoctor from "../../../assets/icon-dashboard/doctor.png";
import iconSpecialty from "../../../assets/icon-dashboard/specialty.png";
import iconDocument from "../../../assets/icon-dashboard/document.png";
import { useEffect ,useState} from "react";

const Dashboard = ({ getAllCountAction, count }) => {
  const [data, setData] = useState({});

  useEffect(() => {
    getAllCountAction();
  }, []);

  useEffect(() => {
    if (count) {
      setData(count);
    }
  }, [count]);

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={6} lg={3}>
          <StatBox
            title={data?.clinic ? data.clinic : ""}
            subtitle="Cơ sở khám"
            img={iconsHospital}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={3}>
          <StatBox
            title={data?.specialty ? data.specialty : ""}
            subtitle="Chuyên khoa"
            img={iconSpecialty}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={3} xl={3}>
          <StatBox
            title={data?.user ? data.user : ""}
            subtitle="Bác sĩ"
            img={iconDoctor}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={3} xl={3}>
          <StatBox
            title={data?.handbook ? data.handbook : ""}
            subtitle="Bài viết"
            img={iconDocument}
          />
        </Grid>
        
      </Grid>
    </Box>
  );
};

const mapStateToProps = (state) => ({
  isLoggedIn: state.user.isLoggedIn,
  count: state.user.count,
});

const mapDispatchToProps = (dispatch) => {
  return {
    getAllCountAction: () => dispatch(actions.getAllCountAction()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
