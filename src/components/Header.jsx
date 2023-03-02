import { Typography, Box, Button, Grid, Switch } from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import * as actions from "../store/actions";

const Header = ({
  title,
  subtitle,
  titleBtn,
  isShowBtn,
  activeMenu,
  link,
  isChecked,
  setChecked,
  isShowSwitch,
  titleSwich,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onClick = () => {
    navigate(link);
    dispatch({ type: actions.SET_MENU, data: activeMenu });
  };
  const handleChange = (event) => {
    setChecked(event.target.checked);
  };
  return (
    <Box mb="30px">
      <Grid container>
        <Grid item xs={12} md={6} direction="column">
          <Typography
            variant="h2"
            color="#141414"
            fontWeight="bold"
            sx={{ m: "0 0 5px 0" }}
          >
            {title}
          </Typography>
          {/* <Typography variant="h5" color="#3da58a" sx={{width:"100%"}}>
            {subtitle}
          </Typography> */}
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
                color: "#141414",
                fontSize: "14px",
                fontWeight: "light",
                padding: "5px 10px",
                ":hover": {
                  bgcolor: "rgb(151, 200, 240)",
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
        {isShowSwitch && (
          <Grid
            item
            xs={12}
            md={6}
            display="flex"
            justifyContent="flex-end"
            alignItems="center"
            sx={{ height: "fit-content" ,gap:"5px"}}
          >
            <div>
              <Typography>{titleSwich}</Typography>
            </div>
            <Switch
              checked={isChecked}
              onChange={handleChange}
              inputProps={{ "aria-label": "controlled" }}
              color="secondary"
            />
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default Header;
