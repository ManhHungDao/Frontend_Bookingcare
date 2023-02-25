export const path = {
  HOME: "/*",
  HOMEPAGE: "home",
  ADMIN: "/admin/*",
  LOGIN: "/login",
  LOG_OUT: "/logout",
  DOCTOR: "/doctor",
  HANDBOOK: "/handbook",
  // DOCTOR: "/doctor/:id",
  SPECIALTY: "/specialty/:id",
  CLINIC: "clinic/:id",
  // HANDBOOK: "/handbook/:id",
  VERIFY_BOOKING: "/verify-booking",
  TABLE_CLINIC_SPECIALTY: "/table-clinic-specialty/:id",
  CLINIC_SPECIALTY:
    "/detail-clinic-specialty/clinicId=:clinicId/specialtyId=:specialtyId",
  RENDER_LIST: "/render-list/:type",
  LIST_POST_HANDBOOK: "/list-post-handbook/:id",
};

export const languages = {
  VI: "vi",
  EN: "en",
};

export const CRUD_ACTIONS = {
  CREATE: "CREATE",
  EDIT: "EDIT",
  DELETE: "DELETE",
  READ: "READ",
};

export const dateFormat = {
  SEND_TO_SERVER: "DD/MM/YYYY",
};

export const YesNoObj = {
  YES: "Y",
  NO: "N",
};
export const USER_ROLE = {
  ADMIN: "R1",
  DOCTOR: "R2",
  PATIENT: "R3",
};

export const TYPE = {
  ROLE: "ROLE",
  TIME: "TIME",
  POSITION: "POSITION",
  GENDER: "GENDER",
  PRICE: "PRICE",
  PROVINCE: "PROVINCE",
  PAYMENT: "PAYMENT",
  STATUS: "STATUS",
  SPECIALTY: "specialty",
  PACKET: "packet",
  CLINIC: "clinic",
  DOCTOR: "doctor",
};
