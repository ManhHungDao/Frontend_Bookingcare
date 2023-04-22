import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as actions from "../../../../store/actions";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import ButtonComponent from "../../../../components/ButtonComponent";
import { Button, CardHeader } from "reactstrap";
import moment from "moment/moment";
import { Card, CardContent, Divider, Grid, Typography } from "@mui/material";

const style = {
  position: "absolute",
  width: "100%",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  height: "fit-content",
  maxHeight: "80vh",
  overflowY: "scroll",
  top: 0,
  bottom: 0,
  margin: "auto",
  left: 0,
  right: 0,
};

const RecentMedicalHistory = ({
  email,
  listData,
  getRecentMedicalHistoryn,
}) => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState("");
  console.log("🚀 ~ file: RecentMedicalHistory.js:33 ~ data:", data);

  useEffect(() => {
    getRecentMedicalHistoryn(email);
  }, [email]);

  useEffect(() => {
    setData(
      listData.map((e) => ({
        result: e.result,
        prescription: e.detail,
        createdAt: moment(e.createdAt).format("HH:mm - DD/MM/YYYY"),
        updatedAt: moment(e.updatedAt).format("HH:mm - DD/MM/YYYY"),
      }))
    );
  }, [listData]);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <ButtonComponent
        content="Kết quả khám gần đây"
        handleClick={handleOpen}
        bgcolor="#bbdefb"
        color="#141414"
        hoverBgColor="#1976d2"
        hoverColor="#fff"
      />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style }}>
          <Grid container spacing={2}>
            {data.length > 0 &&
              data.map((e, i) => (
                <Grid item key={i} xs={12} md={6} xl={4}>
                  <Card>
                    <CardContent>
                      <Typography sx={{ fontWeight: "bold", fontSize: "16px" }}>
                        Thời gian {e.createdAt} - Cập nhập {e.updatedAt}
                      </Typography>
                      <Divider sx={{ margin: "10px 0" }} />
                      <Typography sx={{ fontWeight: "bold", fontSize: "16px" }}>
                        Kết quả:
                      </Typography>
                      <span
                        className="render__prescrtiption--detail"
                        dangerouslySetInnerHTML={{
                          __html: e.result,
                        }}
                      ></span>
                      <Typography sx={{ fontWeight: "bold", fontSize: "16px" }}>
                        Đơn thuốc:
                      </Typography>

                      <span
                        className="render__prescrtiption--detail"
                        dangerouslySetInnerHTML={{
                          __html: e.prescription,
                        }}
                      ></span>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
          </Grid>

          <span className="d-flex justify-content-end">
            <Button
              onClick={handleClose}
              sx={{ marginLeft: "auto !important" }}
            >
              Đóng
            </Button>
          </span>
        </Box>
      </Modal>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    listData: state.admin.listRecentMedicalHistory,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getRecentMedicalHistoryn: (email) =>
      dispatch(actions.getRecentMedicalHistoryAction(email)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RecentMedicalHistory);
