import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import HomeHeader from "../../HomePage/Section/Header";
import HomeFooter from "../../HomePage/Section/Footer";
import Header from "../../../components/Header";
import {
  Grid,
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  IconButton,
  Tooltip,
  TextField,
  Container,
} from "@mui/material";
import { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";
import CachedIcon from "@mui/icons-material/Cached";
import "dayjs/locale/vi";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import RemoveRedEyeRoundedIcon from "@mui/icons-material/RemoveRedEyeRounded";
import _ from "lodash";

const ManageBooking = ({
  allcodeType,
  fetchAllcodeByType,
  getAllBookingByEmail,
  listBookingByEmail,
  patientInfo,
}) => {
  const [date, setDate] = useState(
    dayjs(new Date().setHours(0, 0, 0)).format("D MMMM YYYY")
  );
  const [list, setList] = useState([]);

  const fetchData = (date) => {
    const data = {
      email: patientInfo.email,
      date,
    };
    getAllBookingByEmail(data);
  };

  useEffect(() => {
    if (_.isEmpty(allcodeType))
      fetchAllcodeByType({
        page: 1,
        size: 999,
        filter: "TIME",
      });
  }, []);

  useEffect(() => {
    if (!_.isEmpty(listBookingByEmail) && listBookingByEmail.length > 0)
      setList(listBookingByEmail);
    else {
      setList([]);
    }
  }, [listBookingByEmail]);

  useEffect(() => {
    fetchData(dayjs(date).unix());
  }, [date]);
  const handleRefresh = () => {
    setDate(dayjs(new Date().setHours(0, 0, 0)));
  };
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "#64b9e5",
      color: "black",
    },
    [`&.${tableCellClasses.body}`]: {
      padding: "10px",
      fontSize: "12px",
      maxWidth: "150px",
      height: "50px",
    },
  }));
  const statusList = [
    { name: "Lịch hẹn mới", color: "#80d8ff" },
    { name: "Chờ xác nhận", color: "#78909c" },
    { name: "Đã xác nhận", color: "#26a69a" },
    { name: "Đang khám", color: "#e6ee9c" },
    { name: "Hoàn thành", color: "#00e676" },
    { name: "Đã hủy", color: "#ff9100" },
  ];
  const TableRowName = () => (
    <TableRow className="table__clinic--header">
      <StyledTableCell>Bác sĩ </StyledTableCell>
      <StyledTableCell>Gói khám </StyledTableCell>
      <StyledTableCell>Thời gian </StyledTableCell>
      <StyledTableCell>Trạng thái</StyledTableCell>
      <StyledTableCell></StyledTableCell>
    </TableRow>
  );
  const TableColumn = (props) => {
    const { id, doctor, packet, date, schedule } = props;
    return (
      <>
        <TableRow>
          <StyledTableCell>{doctor?.name ? doctor.name : "-"}</StyledTableCell>
          <StyledTableCell>{packet?.name ? packet.name : "-"}</StyledTableCell>
          <StyledTableCell>
            {allcodeType.list.length > 0 &&
              allcodeType.list.map((i) => {
                if (i._id === schedule.time) return i.valueVI;
              })}{" "}
            - {dayjs.unix(date).format("DD/MM/YYYY")}
          </StyledTableCell>
          <StyledTableCell>
            {schedule?.status && (
              <>
                {statusList.map((i) => {
                  if (i.name === schedule.status)
                    return (
                      <>
                        <Box
                          p={1}
                          sx={{
                            backgroundColor: i.color,
                            borderRadius: 1,
                            width: "fit-content",
                          }}
                        >
                          {i.name}
                        </Box>
                      </>
                    );
                })}
              </>
            )}
          </StyledTableCell>
          <StyledTableCell>
            <Tooltip title="Xem">
              <IconButton>
                <RemoveRedEyeRoundedIcon />
              </IconButton>
            </Tooltip>
          </StyledTableCell>
        </TableRow>
      </>
    );
  };
  return (
    <>
      <HomeHeader />
      <Box
        sx={{
          p: 3,
          paddingTop: "85px",
          minHeight: `calc(100vh - 225px)`,
        }}
      >
        <Container>
          <Header title="quản lý lịch khám" />
          <Box mb={"7px"}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={3}>
                <LocalizationProvider
                  dateAdapter={AdapterDayjs}
                  adapterLocale="vi"
                >
                  <DatePicker
                    label="Ngày"
                    openTo="day"
                    views={["year", "month", "day"]}
                    value={date}
                    onChange={(newValue) => {
                      setDate(dayjs(new Date(newValue).setHours(0, 0, 0)));
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item sm={6} md={3} display="flex" alignItems="center">
                <Tooltip title="Làm mới">
                  <IconButton
                    onClick={() => {
                      handleRefresh();
                    }}
                  >
                    <CachedIcon />
                  </IconButton>
                </Tooltip>
              </Grid>
            </Grid>
          </Box>
          <TableContainer component={Paper} sx={{ maxHeight: 560 }}>
            <Table
              sx={{ minWidth: 650 }}
              size="small"
              aria-label="simple table"
              stickyHeader
            >
              <TableHead>
                <TableRowName />
              </TableHead>
              <TableBody>
                {list &&
                  list.length > 0 &&
                  list.map((e, i) => (
                    <React.Fragment key={i}>
                      <TableColumn {...e} />
                    </React.Fragment>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Container>
      </Box>

      <HomeFooter />
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    allcodeType: state.client.allcodeType,
    listBookingByEmail: state.patient.listBookingByEmail,
    patientInfo: state.patient.patientInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllcodeByType: (data) =>
      dispatch(actions.fetchAllcodeByTypeHomeAction(data)),
    getAllBookingByEmail: (data) =>
      dispatch(actions.getAllBookingByEmailAction(data)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ManageBooking);
