import React, { useState } from "react";
import NumberFormat from "react-number-format";
import { FormattedMessage } from "react-intl";
import { languages } from "../../../utils";

const InfoPacket = ({
  packetName,
  packetAddress,
  packetPrice,
  language,
  packetNote,
  TypePayment,
}) => {
  const [isShowDetail, setIsShowDetail] = useState(false);
  const options = [
    { value: "E1", label: "Cơ bản" },
    { value: "E2", label: "Nâng cao" },
    { value: "E3", label: "Nam" },
    { value: "E4", label: "Nữ" },
  ];
  return (
    <div>
      <div className="doctor-extra-info-contrainer">
        <div className="content-up">
          <h5 className="content-title">
            <FormattedMessage id="patient.extra-info-doctor.address" />
          </h5>
          <div className="content-name">{packetName}</div>
          <div className="content-address">{packetAddress}</div>
        </div>
        <hr />
        <div className="content-down">
          {isShowDetail ? (
            <div>
              <h5 className="content-title">
                <FormattedMessage id="patient.extra-info-doctor.price" />
              </h5>
              <div className="content-price">
                <div className="up">
                  <div className="name">
                    <FormattedMessage id="patient.extra-info-doctor.price" />
                  </div>
                  <div className="price">
                    <NumberFormat
                      className="foo"
                      displayType={"text"}
                      thousandSeparator={true}
                      value={packetPrice}
                      suffix={language === languages.VI ? "VNĐ" : "$"}
                    />
                  </div>
                </div>
                <div className="down">{packetNote}</div>
              </div>
              <div className="content-info-payment">
                <span>
                  <FormattedMessage id="patient.extra-info-doctor.payment" />
                </span>
                <span className="type-payment">
                  {options.map((i) => {
                    if (i.value === TypePayment) return i.label;
                  })}
                </span>
                {/* <span className="type-payment">{TypePayment}</span> */}
              </div>
              <div
                className="content-close"
                onClick={() => setIsShowDetail(!isShowDetail)}
              >
                <FormattedMessage id="patient.extra-info-doctor.close" />
              </div>
            </div>
          ) : (
            <h5 className="content-title">
              <span className="price">
                <FormattedMessage id="patient.extra-info-doctor.price" />:
              </span>
              <NumberFormat
                className="foo"
                displayType={"text"}
                thousandSeparator={true}
                value={packetPrice}
                suffix={language === languages.VI ? "VNĐ" : "$"}
              />
              <span
                className="view-detail"
                onClick={() => setIsShowDetail(!isShowDetail)}
              >
                <FormattedMessage id="patient.extra-info-doctor.detail" />
              </span>
            </h5>
          )}
        </div>
      </div>
    </div>
  );
};
export default InfoPacket;
