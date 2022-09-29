import { useState } from 'react';
import { useRouter } from 'next/router';
import axios, { AxiosResponse } from 'axios';
import { Container, CssBaseline, Box, Avatar, Typography, TextField, Button, Grid, Link } from '@mui/material';

import { getBackendServerUrl } from '../config/config';
import { preparationNotification } from '../core/common/utils';
import Copyright from '../components/common/copyright';
import storage from '../core/common/storage';

export const Login = () => {
  const router = useRouter();
  const [data, setData] = useState({ id: '', password: '' });

  const handleChange = (e: any) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onLogin();
  };

  const onLogin = () => {
    if (data.id === '' || data.password === '') {
      alert('아이디와 비밀번호를 입력하세요.');
      return;
    }

    const serverUrl = getBackendServerUrl();

    axios
      .post(`${serverUrl}/user/login`, data, { withCredentials: true })
      .then(function (response) {
        onLoginSuccess(response);
        router.push('/');
      })
      .catch(function (error) {
        alert('아이디 또는 비밀번호가 일치하지 않습니다.');
      });
  };

  const onLoginSuccess = (response: AxiosResponse) => {
    storage().setItem('user', JSON.stringify(response.data));
  };

  return (
    <>
      <div className='wrapper'>
        <Container component='main'>
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <img src='/img/logo.jpg' alt='logo' style={{ maxWidth: 150 }} />

            <Box component='form' onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField margin='normal' required fullWidth label='아이디' name='id' autoFocus autoComplete='off' onChange={handleChange} onBlur={handleChange} />
              <TextField
                margin='normal'
                required
                fullWidth
                name='password'
                label='Password'
                type='password'
                id='password'
                autoComplete='current-password'
                onChange={handleChange}
                onBlur={handleChange}
              />

              <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
                로그인
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href='/register'>
                    <Button>회원가입</Button>
                  </Link>
                </Grid>
                <Grid item>
                  <Button onClick={preparationNotification}>1:1문의하기</Button>
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs>
                  <Button onClick={preparationNotification}>아이디찾기</Button>
                </Grid>
                <Grid item>
                  <Button onClick={preparationNotification}>비밀번호찾기</Button>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </div>

      <footer className='footer'>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </footer>
    </>
  );
};

export default Login;
