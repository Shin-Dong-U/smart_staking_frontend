import { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Link from 'next/link';
import Logout from '../user/logout';
import storage from '../../core/common/storage';

type ButtonAppBarProps = {
  isLogin: boolean;
}

export default function ButtonAppBar({isLogin}: ButtonAppBarProps) {
  const [userName, setUserName] = useState('');
  
  useEffect(() => {
    if(isLogin) {
      const user = storage().getUser();
      if(user) { setUserName(user.name); }
    }
  }, [isLogin]);
  
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Link href="/">
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Home
            </Typography>
          </Link>
          <Typography align='right'>
            {userName && <span>{userName}님 환영합니다.</span>}
          </Typography>
          <div>
          { isLogin ? (
            <Logout />
          ) : (
            <Link href="/login">
              <Button color="inherit">Login</Button>
            </Link>
          )}
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}