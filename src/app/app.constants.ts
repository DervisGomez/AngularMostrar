export const CONSTANTS = {
    // BACK_URL: 'http://localhost:3000'
    BACK_URL: 'https://bigwave.herokuapp.com'
}

export const API_ROUTES = {
    login: (email, pass) => {
        return `${CONSTANTS.BACK_URL}/auth/sign_in?email=${email}&password=${pass}`;
    },
    registerUser: () => {
        return `${CONSTANTS.BACK_URL}/auth`;
    },
    forgotPasswordStepOne(){
        return `${CONSTANTS.BACK_URL}/forgot-password-step-one`;
    }
}