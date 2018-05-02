export const CONSTANTS = {
  BACK_URL: 'https://bigwave.herokuapp.com/v1'
}

export const API_ROUTES = {
  login(email, pass) {
    return `${CONSTANTS.BACK_URL}/auth/sign_in?email=${email}&password=${pass}`;
  },
  registerUser() {
    return `${CONSTANTS.BACK_URL}/auth`;
  },
  forgotPasswordStepOne() {
    return `${CONSTANTS.BACK_URL}/forgot-password-step-one`;
  },
  updateUser() {
    return `auth`;
  },
  currentUser() {
    return `users/current`;
  },
  createPyme() {
    return `pymes/create`;
  },
  getPymes() {
    return `pymes`;
  },
  getMyPymes() {
    return `pymes/own`;
  },
  deletePyme() {
    return `pymes/:pyme_id/destroy`;
  },
  createSeller() {
    return `sellers/create`;
  },
  getSellers() {
    return `/sellers`;
  },
  getMySellers() {
    return `sellers/own`;
  },
  deleteSeller() {
    return `sellers/:seller_id/destroy`;
  },
  createIndependent() {
    return `independent/create`;
  },
  getIndependents() {
    return `/independents`;
  },
  getMyIndependents() {
    return `independents/own`;
  },
  deleteIndependent() {
    return `independents/:independent_id/destroy`;
  }
};
