import { Typography, Box, useTheme, Button } from "@mui/material";
import { Stack } from "@mui/system";
import { tokens } from "../theme";
import AddCircleIcon from "@mui/icons-material/AddCircle";
const Header = ({ title, subtitle, titleBtn, isShowBtn, onClick }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box mb="30px" display={"flex"} justifyContent={"space-between"}>
      <Stack>
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
      </Stack>
      {isShowBtn && (
        <Stack>
          <Button
            sx={{
              backgroundColor: colors.blueAccent[500],
              color: "#fff",
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
              ":hover": {
                bgcolor: colors.blueAccent[300], // theme.palette.primary.main
                // color: hoverColor,
              },
            }}
            variant="contained"
            startIcon={<AddCircleIcon />}
            onClick={onClick}
          >
            {titleBtn}
          </Button>
        </Stack>
      )}
    </Box>
  );
};

export default Header;
