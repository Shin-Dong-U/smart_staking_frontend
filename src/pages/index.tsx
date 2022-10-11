import { useState, useEffect } from 'react'
import Head from 'next/head'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Typhograpy from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import styles from '../styles/Home.module.css'
import Layout from '../components/layout/layout'
import { checkLogin, goLogin } from '../core/common/checkLogin';
import Logout from '../components/user/logout'
import DailyRewardBtn from '../components/dailyRewardBtn'
import GoldDashboard from '../components/dashboard/gold'
import YolifeDashboard from '../components/dashboard/yolife'
import StakingDashboard from '../components/dashboard/staking'

const Home = () => {
  return (
    <Grid container spacing={3} sx={{p:3}}>
      <Grid item xs={4}>
        <GoldDashboard />
      </Grid>
      
      <Grid item xs={4}>
        <YolifeDashboard />
      </Grid>
      <Grid item xs={4}>
        <StakingDashboard />
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={12} sx={{mt: 5}}>
          <DailyRewardBtn />
          <Typhograpy variant="h6" align="center">
            입금계좌 : 국민은행 649301-04-094922 요요허브 주식회사
          </Typhograpy>
        </Grid>
      </Grid>
    </Grid>
  )
}

Home.getLayout = (page: any) => (
  <Layout>
    {page}
  </Layout>
);

export default Home;