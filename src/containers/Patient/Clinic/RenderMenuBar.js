import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { FormattedMessage } from "react-intl";

const keyMenu = [
  {
    value: "serviceHTML",
    id: "#service",
    name: <FormattedMessage id="patient.detail-doctor.service" />,
  },
  {
    value: "strengthHTML",
    id: "#strength",
    name: <FormattedMessage id="patient.detail-doctor.strengths" />,
  },
  {
    value: "equipmentHTML",
    id: "#equipment",
    name: <FormattedMessage id="patient.detail-doctor.equipment" />,
  },
  {
    value: "locationHTML",
    id: "#location",
    name: <FormattedMessage id="patient.detail-doctor.location" />,
  },
  {
    value: "treatmentHTML",
    id: "#treatment",
    name: <FormattedMessage id="patient.detail-doctor.treatment" />,
  },
  {
    value: "examinationHTML",
    id: "#examination",
    name: <FormattedMessage id="patient.detail-doctor.examination" />,
  },
];

const RenderMenuBar = ({ handleOpenSeeMore }) => {
  //   useEffect(() => {
  //     let itemMenu = [];
  //     itemMenu.push({
  //       id: "#introduce",
  //       name: <FormattedMessage id="patient.detail-doctor.introduce" />,
  //     });
  //     const listKey = Object.keys(data);
  //     listKey.forEach((item) => {
  //       keyMenu.forEach((element) => {
  //         if (element.value === item) {
  //           itemMenu.push({
  //             name: item.name,
  //             id: item.id,
  //           });
  //         }
  //       });
  //     });
  //     setMenu(itemMenu);
  //   }, [data]);
  return (
    <ul className="menu-detail">
      {keyMenu.map((item, index) => {
        return (
          <li key={index} onClick={handleOpenSeeMore()}>
            <a href={item.id}>{item.name}</a>
          </li>
        );
      })}
    </ul>
  );
};

export default RenderMenuBar;
