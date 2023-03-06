/* eslint-disable no-lone-blocks */
import actionTypes from "./actionTypes";
import {
  updateUserService,
  createNewUserService,
  getAllUserService,
  getSingleUserService,
  deleteUserService,
} from "../../services/userService";
import {
  updateClinic,
  getSingleClinic,
  getAllClinic,
  createClinic,
  deleteClinc,
} from "../../services/clinicService";
import {
  getSingleSpecialty,
  getAllSpecialty,
  createSpecialty,
  deleteSpecialty,
  getClinicById,
} from "../../services/specialtySerivce.js";
import {
  getAllcode,
  createAllcode,
  updateAllcode,
  deleteAllcode,
  getAllcodeByType,
} from "../../services/allcodeService";
import { toast } from "react-toastify";

export const loadingToggleAction = (status) => {
  return {
    type: actionTypes.LOADING_TOGGLE_ACTION,
    data: status,
  };
};

export const fetchAllcodeAction = () => {
  return async (dispatch, getState) => {
    try {
      const res = await getAllcode();
      if (res && res.success) {
        dispatch({
          type: actionTypes.FETCH_ALLCODE_SUCCESS,
          data: res.allcodes,
        });
      }
    } catch (error) {
      dispatch({
        type: actionTypes.FETCH_ALLCODE_FAILED,
      });
      toast.error("Lấy tất cả mã thất bại");
    }
  };
};
export const fetchAllcodeByTypeAction = (type) => {
  return async (dispatch, getState) => {
    try {
      const res = await getAllcodeByType(type);
      if (res && res.success) {
        dispatch({
          type: actionTypes.FETCH_ALLCODE_TYPE_SUCCESS,
          data: res.allcodes,
        });
      }
    } catch (error) {
      dispatch({
        type: actionTypes.FETCH_ALLCODE_TYPE_FAILED,
      });
      toast.error(`Lấy tất cả mã ${type} thất bại`);
    }
  };
};
export const createAllCodeAction = (data) => {
  return async (dispatch, getState) => {
    try {
      dispatch(loadingToggleAction(true));
      const res = await createAllcode(data);
      if (res && res.success) {
        dispatch(loadingToggleAction(false));
        dispatch({
          type: actionTypes.CREATE_SUCCESS,
        });
        toast.success("Tạo mã thành công");
      }
    } catch (error) {
      dispatch(loadingToggleAction(false));
      dispatch({
        type: actionTypes.CREATE_FAILED,
      });
      toast.error("Tạo mã thất bại");
    }
  };
};

export const updateAllCodeAction = (id, data) => {
  return async (dispatch, getState) => {
    try {
      dispatch(loadingToggleAction(true));
      const res = await updateAllcode(id, data);
      if (res && res.success) {
        dispatch(loadingToggleAction(false));
        dispatch({
          type: actionTypes.UPDATE_SUCCESS,
        });
        toast.success("Cập nhập mã thành công");
      }
    } catch (error) {
      dispatch(loadingToggleAction(false));
      dispatch({
        type: actionTypes.UPDATE_FAILED,
      });
      if (error.response.data.error.code === 11000)
        toast.error("Mã định danh đã tồn tại");
      else toast.error("Cập nhập mã thất bại");
    }
  };
};

export const deleteAllCodeAction = (id) => {
  return async (dispatch, getState) => {
    try {
      dispatch(loadingToggleAction(true));
      const res = await deleteAllcode(id);
      if (res && res.success) {
        dispatch(loadingToggleAction(false));
        dispatch({
          type: actionTypes.DELETE_SUCCESS,
        });
        toast.success("Xóa mã thành công");
      }
    } catch (error) {
      dispatch(loadingToggleAction(false));
      dispatch({
        type: actionTypes.DELETE_FAILED,
      });
      toast.error("Xóa mã thất bại");
    }
  };
};

// USER ACTION
export const createNewUserAction = (data) => {
  return async (dispatch, getState) => {
    try {
      dispatch(loadingToggleAction(true));
      const res = await createNewUserService(data);
      if (res && res.success) {
        dispatch({
          type: actionTypes.CREATE_SUCCESS,
        });
        dispatch(loadingToggleAction(false));
        toast.success("Tạo người dùng thành công");
      }
    } catch (error) {
      dispatch(loadingToggleAction(false));
      dispatch({
        type: actionTypes.CREATE_FAILED,
      });
      if (error.response.data.error.code === 11000)
        toast.error("Email đã tồn tại");
      else toast.error("Tạo người dùng thất bại");
    }
  };
};

export const getSingleUserAction = (id) => {
  return async (dispatch, getState) => {
    try {
      dispatch(loadingToggleAction(true));
      const res = await getSingleUserService(id);
      if (res && res.success) {
        dispatch(loadingToggleAction(false));
      }
      dispatch({
        type: actionTypes.GET_USER_SUCCESS,
        data: res.user,
      });
    } catch (error) {
      dispatch(loadingToggleAction(false));
      dispatch({
        type: actionTypes.GET_USER_FAILED,
      });
      toast.error("Lấy thông tin người dùng thất bại");
    }
  };
};

export const getAllUserAction = (type) => {
  return async (dispatch, getState) => {
    try {
      dispatch(loadingToggleAction(true));
      const res = await getAllUserService(type);
      if (res && res.success) {
        dispatch(loadingToggleAction(false));
        dispatch({
          type: actionTypes.FETCH_ALL_USERS_SUCCESS,
          users: res.users,
        });
      }
    } catch (error) {
      dispatch(loadingToggleAction(false));
      dispatch({
        type: actionTypes.FETCH_ALL_USERS_FAILED,
      });
    }
  };
};

export const updateUserAction = (id, data) => {
  return async (dispatch, getState) => {
    try {
      dispatch(loadingToggleAction(true));
      const res = await updateUserService(id, data);
      if (res && res.success) {
        dispatch({
          type: actionTypes.UPDATE_SUCCESS,
        });
        dispatch(getAllUserAction());
        dispatch(loadingToggleAction(false));
        toast.success("Cập nhập thông tin thành công");
      }
    } catch (error) {
      dispatch(loadingToggleAction(false));
      dispatch({
        type: actionTypes.UPDATE_FAILED,
      });
      toast.error("Cập nhập thông tin thất bại");
    }
  };
};

export const deleteUserAction = (id) => {
  return async (dispatch, getState) => {
    try {
      {
        dispatch(loadingToggleAction(true));
        const res = await deleteUserService(id);
        if (res && res.success) {
          dispatch(loadingToggleAction(false));
          dispatch({
            type: actionTypes.DELETE_SUCCESS,
          });
          toast.success("Xóa người dùng thành công");
        }
      }
    } catch (error) {
      dispatch(loadingToggleAction(false));
      dispatch({
        type: actionTypes.DELETE_FAILED,
      });
      toast.error("Xóa người dùng thất bại");
    }
  };
};

// CLINIC ACTION
export const createClinicAction = (data) => {
  return async (dispatch, getState) => {
    try {
      {
        dispatch(loadingToggleAction(true));
        const res = await createClinic(data);
        if (res && res.success) {
          dispatch({
            type: actionTypes.CREATE_SUCCESS,
          });
          dispatch(loadingToggleAction(false));
          toast.success("Tạo phòng khám thành công");
        }
      }
    } catch (error) {
      dispatch(loadingToggleAction(false));
      dispatch({
        type: actionTypes.CREATE_FAILED,
      });
      toast.error("Tạo phòng khám thất bại");
    }
  };
};

export const getListClinicAction = () => {
  return async (dispatch, getState) => {
    try {
      dispatch(loadingToggleAction(true));
      const res = await getAllClinic();
      if (res && res.success) {
        dispatch({
          type: actionTypes.GET_LIST_CLINIC_SUCCEED,
          data: res.clinics,
        });
        dispatch(loadingToggleAction(false));
      }
    } catch (error) {
      dispatch(loadingToggleAction(false));
      dispatch({
        type: actionTypes.GET_LIST_CLINIC_FAILED,
      });
      toast.error("Lấy danh sách thất bại");
    }
  };
};

export const getSingleClinicAction = (id) => {
  return async (dispatch, getState) => {
    try {
      dispatch(loadingToggleAction(true));
      const res = await getSingleClinic(id);
      if (res && res.success) {
        dispatch({
          type: actionTypes.GET_CLINIC_SUCCEED,
          data: res.clinic,
        });
        dispatch(loadingToggleAction(false));
      }
    } catch (error) {
      dispatch(loadingToggleAction(false));
      dispatch({
        type: actionTypes.GET_CLINIC_FAILED,
      });
      toast.error("Lấy thông tin phòng khám thất bại");
    }
  };
};

export const updateClinicAction = (id, data) => {
  return async (dispatch, getState) => {
    try {
      dispatch(loadingToggleAction(true));
      const res = await updateClinic(id, data);
      if (res && res.success) {
        dispatch({
          type: actionTypes.UPDATE_SUCCESS,
        });
        dispatch(getListClinicAction());
        dispatch(loadingToggleAction(false));
        toast.success("Cập nhập thông tin thành công");
      }
    } catch (error) {
      dispatch(loadingToggleAction(false));
      toast.error("Cập nhập thông tin thất bại");
      dispatch({
        type: actionTypes.UPDATE_FAILED,
      });
    }
  };
};

export const deleteClincAction = (id) => {
  return async (dispatch, getState) => {
    try {
      dispatch(loadingToggleAction(true));
      const res = await deleteClinc(id);
      if (res && res.success) {
        dispatch(loadingToggleAction(false));
        dispatch({
          type: actionTypes.DELETE_SUCCESS,
        });
        toast.success("Xóa phòng khám thành công");
      }
    } catch (error) {
      dispatch(loadingToggleAction(false));
      dispatch({
        type: actionTypes.DELETE_FAILED,
      });
      toast.error("Xóa phòng khám thất bại");
    }
  };
};

// SPECIALTY
export const createSpecialtyAction = (data) => {
  return async (dispatch, getState) => {
    try {
      {
        dispatch(loadingToggleAction(true));
        const res = await createSpecialty(data);
        if (res && res.success) {
          dispatch({
            type: actionTypes.CREATE_SUCCESS,
          });
          dispatch(loadingToggleAction(false));
          toast.success("Tạo chuyên khoa thành công");
        }
      }
    } catch (error) {
      dispatch(loadingToggleAction(false));
      dispatch({
        type: actionTypes.CREATE_FAILED,
      });
      toast.error("Tạo chuyên khoa thất bại");
    }
  };
};

export const getAllSpecialtyAction = () => {
  return async (dispatch, getState) => {
    try {
      dispatch(loadingToggleAction(true));
      const res = await getAllSpecialty();
      if (res && res.success) {
        dispatch({
          type: actionTypes.GET_LIST_SPECIALTY_SUCCEED,
          data: res.specialties,
        });
        dispatch(loadingToggleAction(false));
      }
    } catch (error) {
      dispatch(loadingToggleAction(false));
      dispatch({
        type: actionTypes.GET_LIST_SPECIALTY_FAILED,
      });
      toast.error("Lấy danh sách thất bại");
    }
  };
};

export const deleteSpecialtyAction = (id) => {
  return async (dispatch, getState) => {
    try {
      dispatch(loadingToggleAction(true));
      const res = await deleteSpecialty(id);
      if (res && res.success) {
        dispatch({
          type: actionTypes.DELETE_SUCCESS,
        });
        dispatch(loadingToggleAction(false));
      }
    } catch (error) {
      dispatch(loadingToggleAction(false));
      dispatch({
        type: actionTypes.DELETE_FAILED,
      });
      toast.error("Xóa chuyên khoa thất bại");
    }
  };
};

export const getClinicByIdAction = (id) => {
  return async (dispatch, getState) => {
    try {
      dispatch(loadingToggleAction(true));
      const res = await getClinicById(id);
      if (res && res.success) {
        dispatch({
          type: actionTypes.GET_LIST_CLINIC_BYID_SUCCEED,
          data:res.specialties
        });
        dispatch(loadingToggleAction(false));
      }
    } catch (error) {
      dispatch(loadingToggleAction(false));
      dispatch({
        type: actionTypes.GET_LIST_CLINIC_BYID_FAILED,
      });
      toast.error("Lấy danh sách chuyên khoa thất bại");
    }
  };
};
