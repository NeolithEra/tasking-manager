import * as safeStorage from '../../utils/safe_storage';
import { fetchUserDetails } from '../../network/auth';


export const types = {
  SET_USER_DETAILS: 'SET_USER_DETAILS',
  SET_TOKEN: 'SET_TOKEN',
  SET_PICTURE: 'SET_PICTURE',
  CLEAR_SESSION: 'CLEAR_SESSION'
};

export function clearUserDetails() {
  return {
    type: types.CLEAR_SESSION,
  };
}

export const logout = () => dispatch => {
  safeStorage.removeItem('username');
  safeStorage.removeItem('token');
  safeStorage.removeItem('userPicture');
  dispatch(clearUserDetails());
};

export function updateUserDetails(userDetails) {
  return {
    type: types.SET_USER_DETAILS,
    userDetails: userDetails
  };
}

export function updateToken(token) {
  return {
    type: types.SET_TOKEN,
    token: token
  };
}

export function updateUserPicture(userPicture) {
  return {
    type: types.SET_PICTURE,
    userPicture: userPicture
  };
}

export const setAuthDetails= (username, token, userPicture) => dispatch => {
    const encoded_token = btoa(token);
    safeStorage.setItem('username', username);
    safeStorage.setItem('token', encoded_token);
    dispatch(updateToken(encoded_token));
    if (userPicture) {
      safeStorage.setItem('userPicture', userPicture);
      dispatch(updateUserPicture(userPicture));
    }
    fetchUserDetails(username, encoded_token).then(
      userDetails => dispatch(updateUserDetails(userDetails))
    );
  }

export const setUserDetails= (userDetails) => dispatch => {
    dispatch(updateUserDetails(userDetails));
  }
