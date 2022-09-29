import axios from 'axios';
import Button from '@mui/material/Button';
import { getBackendServerUrl } from '../../config/config';
import storage from '../../core/common/storage';
import { goLogin } from '../../core/common/checkLogin';

export const Logout = () => {
  const onLogout = () => {
    const serverUrl = getBackendServerUrl();
    axios.get(`${serverUrl}/user/logout`, { withCredentials: true }).finally(() => {
      storage().removeItem('user');
      goLogin();
    });
  };

  return (
    <>
      <Button color='inherit' onClick={onLogout}>
        로그아웃
      </Button>
    </>
  );
};

export default Logout;
