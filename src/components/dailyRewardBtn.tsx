import axios from 'axios';
import Button from '@mui/material/Button';
import { checkLogin } from '../core/common/checkLogin';

const DailyRewardBtn = () => {
  const reward = async () => {
    const isLogin = checkLogin();
    if(!isLogin) { 
      alert('로그인 후 이용해주세요.');
      return; 
    }

    axios.get(
      'http://localhost:8080/auth/daily-reward',
      { withCredentials: true }
    ).then((response) => {
      alert('보상을 받았습니다.');
    }).catch((error) => {
      alert('로그인 후 이용해주세요.');
    })
  }

  return (
    <Button 
      variant="contained" 
      onClick={reward} 
    >
      일일보상받기
    </Button>
  )
}

export default DailyRewardBtn;