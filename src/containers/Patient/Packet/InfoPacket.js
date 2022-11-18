import React from "react";
import NumberFormat from "react-number-format";
import { FormattedMessage } from "react-intl";
import { languages } from "../../../utils";

const InfoPacket = (props) => {
  return (
    // <div>
    //   <div className="doctor-extra-info-contrainer">
    //     <div className="content-up">
    //       <h5 className="content-title">
    //         <FormattedMessage id="patient.extra-info-doctor.address" />
    //       </h5>
    //       <div className="content-name">
    //         {extraInfoPacket && extraInfoPacket.clinicDataDoctor
    //           ? extraInfoPacket.clinicDataDoctor.name
    //           : ""}
    //       </div>
    //       <div className="content-address">
    //         {extraInfoPacket && extraInfoPacket.clinicDataDoctor
    //           ? extraInfoPacket.clinicDataDoctor.address
    //           : ""}
    //       </div>
    //     </div>
    //     <hr />
    //     <div className="content-down">
    //       {isShowDetail ? (
    //         <div>
    //           <h5 className="content-title">
    //             <FormattedMessage id="patient.extra-info-doctor.price" />
    //           </h5>
    //           <div className="content-price">
    //             <div className="up">
    //               <div className="name">
    //                 <FormattedMessage id="patient.extra-info-doctor.price" />
    //               </div>
    //               <div className="price">
    //                 <NumberFormat
    //                   className="foo"
    //                   displayType={"text"}
    //                   thousandSeparator={true}
    //                   value={price}
    //                   suffix={language === languages.VI ? "VNĐ" : "$"}
    //                 />
    //               </div>
    //             </div>
    //             <div className="down">
    //               {extraInfoPacket && extraInfoPacket.note
    //                 ? extraInfoPacket.note
    //                 : ""}
    //             </div>
    //           </div>
    //           <div className="content-info-payment">
    //             <span>
    //               <FormattedMessage id="patient.extra-info-doctor.payment" />
    //             </span>
    //             <span className="type-payment">{typePayment}</span>
    //           </div>
    //           <div
    //             className="content-close"
    //             onClick={this.handleShowHideDetail}
    //           >
    //             <FormattedMessage id="patient.extra-info-doctor.close" />
    //           </div>
    //         </div>
    //       ) : (
    //         <h5 className="content-title">
    //           <span className="price">
    //             <FormattedMessage id="patient.extra-info-doctor.price" />:
    //           </span>
    //           <NumberFormat
    //             className="foo"
    //             displayType={"text"}
    //             thousandSeparator={true}
    //             value={price}
    //             suffix={props.language === languages.VI ? "VNĐ" : "$"}
    //           />
    //           <span className="view-detail" onClick={this.handleShowHideDetail}>
    //             <FormattedMessage id="patient.extra-info-doctor.detail" />
    //           </span>
    //         </h5>
    //       )}
    //     </div>
    //   </div>
    // </div>
    <div></div>
  );
};
const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    // extraInfoDoctor: state.admin.extraInfoDoctor,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // fetchExtraInfoDoctor: (id) => dispatch(actions.fetchExtraInfoDoctor(id)),
  };
};
export default InfoPacket;
