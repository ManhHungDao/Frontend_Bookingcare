import React, { useEffect, useState } from "react";
import { Box, Stack, Pagination, Divider } from "@mui/material";
import ProfileDoctor from "../../Doctor/ProfileDoctor";
import { connect } from "react-redux";
import * as actions from "../../../../store/actions";
import { getAllUserService } from "../../../../services/userService";

const DoctorList = ({ id }) => {
  const [doctors, setDoctors] = useState([]);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(5);
  const [count, setCount] = useState(1);
  const fetchDataAPI = async (page, size, filter = "") => {
    const data = {
      page,
      size,
      filter,
      clinicId: id,
    };
    const res = await getAllUserService(data);

    if (res && res.success) {
      setDoctors(
        res?.users.map((i) => {
          return {
            id: i._id,
          };
        })
      );
      setCount(res?.count);
    }
  };
  useEffect(() => {
    fetchDataAPI(page, size, "");
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    fetchDataAPI(newPage, size, "");
  };
  return (
    <Box
      sx={{
        mt: 3,
        mb: 3,
      }}
    >
      {doctors &&
        doctors.map((e, i) => (
          <div
            key={e + i + ""}
            style={{
              backgroundColor: "#fff",
              padding: "10px",
              borderRadius: "4px",
              margin: "10px 0",
              paddingBottom: 0,
            }}
          >
            <Stack
              sx={{
                boxShadow: `rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px`,
                borderRadius: "4px",
                padding:"7px"
              }}
            >
              <Stack
                sx={{
                  marginLeft: { sm: 0, lg: "140px" },
                }}
              >
                <ProfileDoctor id={e.id} />
              </Stack>
            </Stack>
          </div>
        ))}
      <Stack mt={3}>
        {count > 5 && (
          <span className="d-flex justify-content-center">
            <Pagination
              count={Math.ceil(count / 5)}
              color="primary"
              onChange={handleChangePage}
              page={page}
            />
          </span>
        )}
      </Stack>
    </Box>
  );
};

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(DoctorList);
