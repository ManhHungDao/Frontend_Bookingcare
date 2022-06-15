export const adminMenu = [
  {
    //quan ly nguoi dung
    name: "menu.admin.manage-user",
    menus: [
      {
        name: "menu.admin.crud",
        link: "/system/user-manage",
      },
      {
        name: "menu.admin.crud-redux",
        link: "/system/user-redux",
      },
      {
        name: "menu.admin.manage-doctor",
        link: "/system/user-doctor",
      },
      {
        name: "menu.admin.manage-admin",
        link: "/system/user-admin",
      },
    ],
  },
  {
    //quan ly phòng khám
    name: "menu.admin.clinic",
    menus: [
      {
        name: "menu.admin.manage-clinic",
        link: "/system/manage-clinic",
      },
    ],
  },
  {
    //quan ly chuyen khoa
    name: "menu.admin.specialty",
    menus: [
      {
        name: "menu.admin.managr-specialty",
        link: "/system/managr-specialty",
      },
    ],
  },
  {
    //quan ly cẩm nang
    name: "menu.admin.handbook",
    menus: [
      {
        name: "menu.admin.manage-handbook",
        link: "/system/manage-handbook",
      },
    ],
  },
];

// subMenus: [
//           {
//             name: "menu.system.system-administrator.user-manage",
//             link: "/system/user-manage",
//           },
//           {
//             name: "menu.system.system-administrator.user-redux",
//             link: "/system/user-redux",
//           },
//         ],
