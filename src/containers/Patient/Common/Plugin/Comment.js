import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";

class LikeAndShare extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.initFacebookSDK();
  }

  initFacebookSDK() {
    if (window.FB) {
      window.FB.XFBML.parse();
    }

    let { language } = this.props;
    let locale = "vi_VN"; //language //=== LANGUAGES.VI ? "vi_VN" : "en_US";
    window.fbAsyncInit = function () {
      window.FB.init({
        appId: 553207829984175,
        cookie: true, // enable cookies to allow the server to access
        // the session
        xfbml: true, // parse social plugins on this page
        version: "v2.5", // use version 2.1
      });
    };
    //           appId            : '553207829984175',

    // Load the SDK asynchronously
    (function (d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s);
      js.id = id;
      js.src = `https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.6`;
      fjs.parentNode.insertBefore(js, fjs);
    })(document, "script", "facebook-jssdk");
  }

  render() {
    let curURL = window.location.href; 
    return (
      <>
        <div
          class="fb-comments"
          // data-href="https://developers.facebook.com/docs/plugins/comments#configurator"
          data-href={curURL}
          data-width="1000"
          data-numposts="5"
        ></div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(LikeAndShare);