import axios from 'axios';
import { getBackendServerUrl } from '../../config/config';
import { CertificationUser, Person } from '../model/CertificationUser';

export const openCertificationPopup = (orderId: string): Window | null => {
  const serverUrl = getBackendServerUrl();
  const url = `${serverUrl}/certification/${orderId}`;

  const popupId = 'auth_popup';
  const option = 'toolbar=no,status=no,statusbar=no,menubar=no,scrollbars=no,resizable=no';

  return window.open(url, popupId, option);
};

export const isClosedPopup = (popup: Window | null) => {
  return !popup || popup.closed;
};

export const monitoringUntilClosedPopup = (popup: Window | null, callback: Function) => {
  const FIVE_MINUTE = 60 * 5 * 10;
  let count = 0;

  const intervalFunction = setInterval(() => {
    if (count > FIVE_MINUTE) {
      clearInterval(intervalFunction);
    }

    if (isClosedPopup(popup)) {
      clearInterval(intervalFunction);
      callback();
    }
    count += 1;
  }, 100);
};

export const getCertificationUser = async (orderId: string): Promise<CertificationUser | null> => {
  const serverUrl = getBackendServerUrl();
  const url = `${serverUrl}/certification/result/${orderId}`;
  const response = await axios.get(url, { withCredentials: true });

  if (response.status === 200) {
    return response.data;
  } else {
    console.log(response);
    return null;
  }
};

export const isSuccessCertification = (user: CertificationUser | null): boolean => {
  if (user && user.resCd === '0000') {
    return true;
  }

  return false;
};

export const parsePerson = (user: CertificationUser | null): Person | null => {
  if (!user) {
    return null;
  }

  return {
    name: user.userName,
    phone: user.phoneNo,
    birth: user.birthDay,
    sexCode: user.sexCode,
    localCode: user.localCode,
    ci: user.ci,
    di: user.di,
  };
};
