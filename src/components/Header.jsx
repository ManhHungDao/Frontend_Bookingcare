import { Typography, Box, useTheme, Button, Grid } from "@mui/material";
import { tokens } from "../theme";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import * as actions from "../store/actions";

const Header = ({ title, subtitle, titleBtn, isShowBtn, activeMenu, link }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const dispatch = useDispatch();
  const onClick = () => {
    navigate(link);
    dispatch({ type: actions.SET_MENU, data: activeMenu });
  };
  return (
    <Box mb="30px">
      <Grid container>
        <Grid item xs={12} md={6} direction="column">
          <Typography
            variant="h2"
            color={colors.grey[100]}
            fontWeight="bold"
            sx={{ m: "0 0 5px 0" }}
          >
            {title}
          </Typography>
          <Typography variant="h5" color={colors.greenAccent[400]}>
            {subtitle}
          </Typography>
        </Grid>
        {isShowBtn && (
          <Grid
            item
            xs={12}
            md={6}
            display="flex"
            justifyContent="flex-end"
            alignItems="flex-end"
            sx={{ height: "fit-content" }}
          >
            <Button
              sx={{
                backgroundColor: "rgb(33, 150, 243)",
                color: "#fff",
                fontSize: "14px",
                fontWeight: "light",
                padding: "5px 10px",
                ":hover": {
                  bgcolor: colors.blueAccent[300], // theme.palette.primary.main
                  // color: hoverColor,
                },
              }}
              variant="contained"
              startIcon={<AddIcon />}
              onClick={onClick}
            >
              {titleBtn}
            </Button>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default Header;
