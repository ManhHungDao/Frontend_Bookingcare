// import React, { Component } from "react";
// import { connect } from "react-redux";
// import { BrowserRouter, Route, Routes } from "react-router-dom";
// import { ConnectedRouter as Router } from "connected-react-router";
// import { history } from "../redux";
// import { ToastContainer } from "react-toastify";
// import CustomScrollbars from "../components/CustomScrollbars";
// import {
//   userIsAuthenticated,
//   userIsNotAuthenticated,
// } from "../hoc/authentication";

// import { path } from "../utils";
// import Login from "./Auth/login";
// import SystemRoute from "./System/SystemRoute";
// import Doctor from "../routes/Doctor";
// import PatientRoute from "./Patient/PatientRoute";
// import Loading from "../components/Loading";
// import HomePage from "./HomePage/HomePage";

// class App extends Component {
//   handlePersistorState = () => {
//     const { persistor } = this.props;
//     let { bootstrapped } = persistor.getState();
//     if (bootstrapped) {
//       if (this.props.onBeforeLift) {
//         Promise.resolve(this.props.onBeforeLift())
//           .then(() => this.setState({ bootstrapped: true }))
//           .catch(() => this.setState({ bootstrapped: true }));
//       } else {
//         this.setState({ bootstrapped: true });
//       }
//     }
//   };

//   componentDidMount() {
//     this.handlePersistorState();
//   }

//   render() {
//     return (
//       <>
//         <Loading />
//         <BrowserRouter>
//           <Router history={history}>
//             <div className="main-container">
//               <span className="content-container">
//                 <CustomScrollbars style={{ height: "100vh", width: "100%" }}>
//                   <Routes>
//                     {/* <Route path={path.HOME} element={HomePage} /> */}
//                     <Route path='/home' element={HomePage} />
//                     <Route path={path.HOMEPAGE} element={HomePage} />
//                     <Route
//                       path={path.LOGIN}
//                       element={userIsNotAuthenticated(Login)}
//                     />
//                     <Route
//                       path={path.SYSTEM}
//                       element={userIsAuthenticated(SystemRoute)}
//                     />
//                     <Route
//                       path={path.DOCTOR}
//                       element={userIsAuthenticated(Doctor)}
//                     />
//                   </Routes>
//                 </CustomScrollbars>
//               </span>
//               <ToastContainer
//                 position="top-right"
//                 autoClose={3000}
//                 hideProgressBar={false}
//                 newestOnTop={false}
//                 closeOnClick
//                 rtl={false}
//                 pauseOnFocusLoss
//                 draggable
//                 pauseOnHover
//               />
//             </div>
//           </Router>
//         </BrowserRouter>
//       </>
//     );
//   }
// }

// const mapStateToProps = (state) => {
//   return {
//     started: state.app.started,
//     isLoggedIn: state.user.isLoggedIn,
//   };
// };

// const mapDispatchToProps = (dispatch) => {
//   return {};
// };

// export default connect(mapStateToProps, mapDispatchToProps)(App);
