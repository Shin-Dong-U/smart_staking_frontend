import { useState } from 'react';
import axios from "axios";
import { Container, CssBaseline, Box, Avatar, Typography, TextField, FormControlLabel, Checkbox, Button, Grid, Link, createTheme, ThemeProvider } from "@mui/material"; 
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

import Copyright from "../components/common/copyright";

export const  Login = () => {
  const [data, setData] = useState({  id: '', password: ''  });

  const handleChange = (e: any) => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    });
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('submit clicked');

    dologin();
  };
  
  const dologin = () => {
    if(data.id === '' || data.password === '') {
      alert('아이디와 비밀번호를 입력하세요.');
      return;
    }
    return;
    axios
      .post('insert url', data)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            로그인
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              label="아이디"
              name="id"
              autoFocus
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={handleChange}
            />
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              로그인
            </Button>
            <Grid container>
              <Grid item xs>
                <Button>
                  회원가입
                </Button>
              </Grid>
              <Grid item>
                <Button>
                  1:1문의하기
                </Button>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs>
                <Button>
                  아이디찾기
                </Button>
              </Grid>
              <Grid item>
                <Button>
                  비밀번호찾기
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    
  );
}

export default Login;