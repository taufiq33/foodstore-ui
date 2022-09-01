import { USER_LOGIN, USER_LOGOUT } from './constant';

function userLogin(user, token) {
  return {
    type: USER_LOGIN,
    user,
    token,
  };
}

function userLogout() {
  return {
    type: USER_LOGOUT,
  };
}

export {
  userLogin,
  userLogout,
};
