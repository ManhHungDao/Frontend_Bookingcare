import React, { useEffect } from "react";
import * as actions from "../../store/actions";
import { connect } from "react-redux";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import TextField from "@mui/material/TextField";
import { toast } from "react-toastify";

function AutocompleteAddress({
  isErr,
  errName,
  setAddress,
  setCoordinates,
  address,
  setProvince,
  allcodes,
  fetchAllcode,
}) {
  useEffect(() => {
    if (!(allcodes && allcodes.length > 0)) fetchAllcode();
  }, []);
  const handleSelect = async (value) => {
    const results = await geocodeByAddress(value);
    let length = results[0].address_components.length;
    let province = "";
    if (
      results[0].address_components[length - 2].long_name !== "Vietnam" ||
      results[0].address_components[length - 1].long_name !== "Vietnam"
    )
      toast.warning("Chọn địa chỉ ở Việt Nam");
    if (results[0].address_components[length - 2].long_name === "Vietnam")
      province = results[0].address_components[length - 3].long_name;
    else province = results[0].address_components[length - 2].long_name;
    setProvince(province);
    setAddress(value);
    if (setCoordinates) {
      const latLng = await getLatLng(results[0]);
      setCoordinates(latLng);
    }
  };
  // const getCodeProvince = (name) => {
  //   let listProvince = [];
  //   if (allcodes && allcodes.length > 0)
  //     listProvince = allcodes.filter((e) => e.type === "PROVINCE");
  //   let province = listProvince.filter(
  //     (e) => e.valueVI.toUpperCase() === name.toUpperCase()
  //   );
  //   console.log('check',province);
  //   return province[0]._id;
  // };
  return (
    <PlacesAutocomplete
      value={address}
      onChange={setAddress}
      onSelect={handleSelect}
    >
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
        <div>
          <TextField
            required
            id="outlined-required"
            label="Địa chỉ"
            fullWidth
            error={isErr}
            helperText={errName}
            {...getInputProps({ placeholder: "Nhập địa chỉ" })}
          />
          {loading ? <div>...loading</div> : null}
          {suggestions.map((suggestion, index) => {
            const style = {
              backgroundColor: suggestion.active ? "#41b6e6" : "#fff",
            };

            return (
              <div
                key={index}
                {...getSuggestionItemProps(suggestion, { style })}
              >
                {suggestion.description}
              </div>
            );
          })}
        </div>
      )}
    </PlacesAutocomplete>
  );
}
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
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AutocompleteAddress);
