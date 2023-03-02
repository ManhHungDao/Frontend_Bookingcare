import React, { useState, useEffect } from "react";
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";
import ArrowCircleUpRoundedIcon from "@mui/icons-material/ArrowCircleUpRounded";
const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const styles = {
    position: "fixed",
    bottom: "20px",
    right: " 100px",
    color: "cornflowerblue",
    fontSize: "38px",
    cursor: "pointer",
  };
  return (
    <>
      { isVisible && (
        <Tooltip
          style={styles}
          onClick={scrollToTop}
          title="Back To Top"
          sx={{}}
        >
          <ArrowCircleUpRoundedIcon />
        </Tooltip>
      )}
    </>
  );
};

export default BackToTop;
