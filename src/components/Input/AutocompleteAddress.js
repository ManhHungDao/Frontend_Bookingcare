import React from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import TextField from "@mui/material/TextField";

export default function AutocompleteAddress({
  isErr,
  errName,
  setAddress,
  setCoordinates,
  address,
  setProvince,
}) {
  const handleSelect = async (value) => {
    const results = await geocodeByAddress(value);
    let length = results[0].address_components.length;
    let province = "";
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
