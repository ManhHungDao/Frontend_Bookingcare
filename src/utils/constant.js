export const path = {
  HOME: "/*",
  ADMIN: "/admin/*",
  DOCTOR: "/doctor/*",
  PATIENT: "/patient/*",
  MANAGER: "/manager/*",
  PACKET: "/packet/*",
  HANDBOOK: "/handbook/*",
  DETAIL_HANDBOOK: "/handbook/:id",
  SPECIALTY: "/specialty/:id",
  CLINIC: "clinic/:id",
  DETAIL_PACKET: "packet/:id",
  DETAIL_DOCTOR: "detail-doctor/:id",
  CONFIRM_BOOKING: "/confirm-booking",
  VIEWMORE_SPECIALTY: "/viewmore/specialty",
  VIEWMORE_CLINIC: "/viewmore/clinic",
  VIEWMORE_DOCTOR: "/viewmore/doctor",
  FEEDBACK: "/feedback",

  SYSTEM_LOGIN: "/system-login",
  LOGIN: "/login",
  RESGISTER: "/register",
  LOG_OUT: "/logout",
  FORGOT_PASSWORD: "/forgot-password",
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

export const roles = {
  patient: [
    { value: "patient.access", name: "Truy cập người dùng" },
    { value: "patient.view", name: "Xem danh sách người dùng" },
    { value: "patient.delete", name: "Xóa người dùng" },
  ],
  user: [
    { value: "user.access", name: "Truy cập bác sĩ" },
    { value: "user.view", name: "Xem danh sách bác sĩ" },
    { value: "user.add", name: "Thêm bác sĩ" },
    { value: "user.update", name: "Cập nhập bác sĩ" },
    { value: "user.delete", name: "Xóa bác sĩ" },
    { value: "user.schedule.access", name: "Truy cập lịch khám" },
    { value: "user.schedule.view", name: "Xem lịch khám" },
    { value: "user.schedule.add", name: "Thêm lịch khám" },
    { value: "user.schedule.update", name: "Cập nhập lịch khám" },
    { value: "user.schedule.delete", name: "Xóa lịch khám" },
  ],
  clinic: [
    { value: "clinic.access", name: "Truy cập cơ sở" },
    { value: "clinic.view", name: "Xem danh sách phòng khám" },
    { value: "clinic.add", name: "Thêm phòng khám" },
    { value: "clinic.update", name: "Cập nhập phòng khám" },
    { value: "clinic.delete", name: "Xóa phòng khám" },

    { value: "packet.access", name: "Truy cập gói khám" },
    { value: "packet.view", name: "Xem danh sách gói khám" },
    { value: "packet.add", name: "Thêm gói khám" },
    { value: "packet.update", name: "Cập nhập gói khám" },
    { value: "packet.delete", name: "Xóa gói khám" },

    { value: "packet.schedule.access", name: "Truy cập lịch gói khám" },
    { value: "packet.schedule.view", name: "Xem lịch gói khám" },
    { value: "packet.schedule.add", name: "Thêm lịch gói khám" },
    { value: "packet.schedule.update", name: "Cập nhập lịch gói khám" },
    { value: "packet.schedule.delete", name: "Xóa lịch gói khám" },
  ],
  specialty: [
    { value: "specialty.access", name: "Truy cập chuyên khoa" },
    { value: "specialty.view", name: "Xem danh sách" },
    { value: "specialty.add", name: "Thêm chuyên khoa" },
    { value: "specialty.update", name: "Cập nhập chuyên khoa" },
    { value: "specialty.delete", name: "Xóa chuyên khoa" },
  ],
  handbook: [
    { value: "handbook.access", name: "Truy cập cẩm nang" },
    { value: "handbook.view", name: "Xem danh sách" },
    { value: "handbook.add", name: "Thêm cẩm nang" },
    { value: "handbook.update", name: "Cập nhập cẩm nang" },
    { value: "handbook.delete", name: "Xóa cẩm nang" },
  ],
  code: [
    { value: "code.access", name: "Truy cập mã" },
    { value: "code.view", name: "Xem danh sách" },
    { value: "code.add", name: "Thêm mã" },
    { value: "code.update", name: "Cập nhập mã" },
    { value: "code.delete", name: "Xóa mã" },
  ],
};
