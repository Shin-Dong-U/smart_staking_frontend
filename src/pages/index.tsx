import { useState, useEffect } from 'react'
import Head from 'next/head'
import Grid from '@mui/material/Grid'
import Typhograpy from '@mui/material/Typography'
import styles from '../styles/Home.module.css'
import Layout from '../components/layout/layout'
import { checkLogin, goLogin } from '../core/common/checkLogin';
import Logout from '../components/user/logout'
import DailyRewardBtn from '../components/dailyRewardBtn'


const Home = () => {
  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12} sx={{mt: 5}}>
          <DailyRewardBtn />
          <Typhograpy variant="h6" align="center">
            입금계좌 : 국민은행 649301-04-094922 요요허브 주식회사
          </Typhograpy>
        </Grid>
      </Grid>
    </>
  )
}

Home.getLayout = (page: any) => (
  <Layout>
    {page}
  </Layout>
);

export default Home;