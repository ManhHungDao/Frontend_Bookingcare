import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../theme";
import ProgressCircle from "./ProgressCircle";

const StatBox = ({ title, subtitle, icon, img }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box
      width="100%"
      p={3}
      sx={{
        backgroundColor: "rgb(242 240 240)",
        borderRadius:"4px"
      }}
      display="flex"
      justifyContent="center"
      alignItems="center"
      gap={2}
    >
      <img src={img} width="50px" height="50px" />
      <Box>
        <Typography
          variant="h4"
          fontWeight="bold"
          sx={{ color: colors.grey[100] }}
        >
          {title}
        </Typography>
        <Typography variant="h5" sx={{ color: colors.greenAccent[500] }}>
          {subtitle}
        </Typography>
      </Box>
    </Box>
  );
};

export default StatBox;
