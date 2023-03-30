import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import { Box, Stack, Typography, Divider, Grid, Link } from "@mui/material";
import _ from "lodash";

const ProfileDoctor = ({ clinic, payment, price }) => {
  return (
    <Stack
      display="flex"
      gap={1}
      direction="column"
      sx={{
        paddingLeft: 2,
        borderLeft: "1px solid #ddd",
      }}
    >
      <Typography>
        <b>
          Phòng khám:&nbsp;
          <Link href={`/clinic/${clinic?.id}`} underline="hover">
            {clinic?.name}
          </Link>
        </b>
      </Typography>
      <Divider />
      <Box
        sx={{
          backgroundColor: "#f8f8f8",
          border: "1px solid #ddd",
          maxWidth: "fit-content",
        }}
      >
        <Stack
          display="flex"
          justifyContent={"space-between"}
          alignItems="center"
          direction={"row"}
        >
          <Typography variant="subtitle2" p={1}>
            Giá khám
          </Typography>
          <Typography variant="subtitle2" p={1}>
            {price}
          </Typography>
        </Stack>
        <Divider />
        <Typography variant="subtitle2" p={1}>
          Người bệnh có thể thanh toán chi phí bằng hình thức &nbsp;
          {payment}
        </Typography>
      </Box>
    </Stack>
  );
};
const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    allcodes: state.admin.allcodes,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllcode: () => dispatch(actions.fetchAllcodeAction()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor);
