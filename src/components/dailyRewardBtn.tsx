import axios from 'axios';
import Button from '@mui/material/Button';
import { getBackendServerUrl } from '../config/config';
import { checkLogin } from '../core/common/checkLogin';

const DailyRewardBtn = () => {
  const reward = async () => {
    const isLogin = checkLogin();
    if (!isLogin) {
      alert('로그인 후 이용해주세요.');
      return;
    }

    const serverUrl = getBackendServerUrl();
    axios
      .get(`${serverUrl}/auth/daily-reward`, { withCredentials: true })
      .then((response) => {
        alert('배당금 수령');
      })
      .catch((error) => {
        alert('로그인 후 이용해주세요.');
      });
  };

  return (
    <Button variant='contained' onClick={reward}>
      배당금 수령
    </Button>
  );
};

export default DailyRewardBtn;
