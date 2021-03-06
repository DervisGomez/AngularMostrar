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
  updatePyme() {
    return `pymes/:pyme_id/update`;
  },
  getAPyme() {
    return `pymes/:profile_id`;
  },
  getPymeProducts() {
    return `pyme/:profile_id/products`;
  },
  createProductsPyme() {
    return `:type_profile/:id_profile/products`;
  },
  deletePymesProducts() {
    return `pymes/:profile_id/products/:product_id/destroy`;
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
  updateSeller() {
    return `sellers/:seller_id/update`;
  },
  getASeller() {
    return `sellers/:profile_id`;
  },
  getSellerProducts() {
    return `seller/:profile_id/products`;
  },
  createProductsSeller() {
    return `:type_profile/:id_profile/products`;
  },
  deleteSellersProducts() {
    return `sellers/:profile_id/products/:product_id/destroy`;
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
  },
  updateIndependent() {
    return `independents/:independent_id/update`;
  },
  getAIndependent() {
    return `independents/:profile_id`;
  },
  getIndependentProducts() {
    return `independent/:profile_id/products`;
  },
  createProductsIndependent() {
    return `:type_profile/:id_profile/products`;
  },
  deleteIndependentsProducts() {
    return `independents/:profile_id/products/:product_id/destroy`;
  }
};
