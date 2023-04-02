import React, { useState, useEffect, Component } from "react";
import GoogleMap from "google-map-react";
import image from "../../assets/placeholder.png";
import PropTypes from "prop-types";
import "./mapStyle.css";

const AnyReactComponent = ({ text, id, selectd, lat, lng, phones }) => {
  const onClickPlace = () => {
    window.open("https://maps.google.com?q=" + lat + "," + lng);
  };

  return (
    <div
      className="google_map"
      style={{
        position: "relative",
      }}
    >
      <div className="hint">
        <div
          className="hint__content"
          onClick={() => {
            onClickPlace();
          }}
        >
          <h5>{text}</h5>
        </div>
      </div>
      <img src={image} style={{ width: "30px ", height: "30px " }} alt="map" />
    </div>
  );
};

export default class GoogleMaps extends Component {
  static propTypes = {
    center: PropTypes.array,
    zoom: PropTypes.number,
    greatPlaceCoords: PropTypes.any,
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <GoogleMap
        apiKey={"AIzaSyBVjJC0YfitZBQ16t7fnPvK7R8nvFY9CN0"} // set if you need stats etc ...
        center={this.props.center}
        zoom={this.props.zoom}
        hoverDistance={40 / 2}
      >
        <AnyReactComponent
          lat={this.props.lat}
          lng={this.props.long}
          text={this.props.name}
        />
      </GoogleMap>
    );
  }
}
