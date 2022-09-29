import { useState, useEffect } from 'react'
import Header from './header'
import Nav from './nav'
import Footer from './footer'
import { checkLogin, goLogin } from '../../core/common/checkLogin';

interface LayoutProps {
  children: any
}

const Layout = ({ children }: LayoutProps) => {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    if(!isLogin) {  
      const _isLogin = checkLogin();
      setIsLogin(_isLogin);

      // if(!_isLogin) { goLogin(); }
    }
  }, []);

  return (
    <>
      <Header />
      <Nav isLogin={isLogin}/>
        <main>
          { children }
        </main>
      <Footer />
    </>
  )
}

export default Layout;