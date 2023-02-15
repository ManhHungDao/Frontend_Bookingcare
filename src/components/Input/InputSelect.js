import React, { useEffect, useState } from "react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";

const InputSelect = ({
  value,
  label,
  data,
  isError,
  errorText,
  minWidth,
  name,
  onChange,
}) => {
  const [list, setList] = useState([]);
  useEffect(() => {
    if (data) setList(data);
  }, [data]);

  return (
    <>
      {list && list.length > 0 && (
        <FormControl
          error={isError}
          sx={{ minWidth: minWidth ? minWidth : "100%" }}
        >
          <InputLabel id="demo-simple-select-autowidth-label">
            {name}
          </InputLabel>
          <Select
            labelId={
              isError
                ? "demo-simple-select-isError-label"
                : "demo-simple-select-autowidth-label"
            }
            id={isError ? "demo-simple-select-isError" : "demo-simple-select"}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            label={label}
          >
            {list &&
              list.length > 0 &&
              list.map((e, index) => (
                <MenuItem key={index} value={e.id}>
                  {e.name}
                </MenuItem>
              ))}
          </Select>
          {isError && <FormHelperText>{errorText}</FormHelperText>}
        </FormControl>
      )}
    </>
  );
};

export default InputSelect;
