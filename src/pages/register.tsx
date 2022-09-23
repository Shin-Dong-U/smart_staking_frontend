import { useState, useEffect } from 'react';
import { Container, Grid, Box, Tabs, Tab } from '@mui/material';

import RequireTerms from '../components/user/terms';
import Register from '../components/user/register';

const StepRegister = () => {
  const [tabIdx, setTabIdx] = useState('1');
  const [terms, setTerms] = useState({
    site: false,
    requireInformation: false,
    promotion: false
  });
  const [activeTab2, setActiveTab2] = useState(false);
  const [activeTab3, setActiveTab3] = useState(false);

  useEffect(() => {
    handleChange(tabIdx);
    activeTab(tabIdx);
  }, [tabIdx]);


  const handleChange = ( newValue: string) => {
    setTabIdx(newValue);
  };

  const activeTab = (tabIdx: string) => {
    switch (tabIdx) {
      case '2':
        setActiveTab2(true);
        break;
    }
  }

  return (
    <Container component="main" maxWidth="md" sx={{ pt: 10}} >
      <Grid>
        <Tabs value={tabIdx} onChange={(event, value) => { handleChange(value)} }>
          <Tab label="약관동의" value="1" onClick={()=>setActiveTab2(false)}/>
          <Tab label="회원가입" value="2"  disabled={!activeTab2}/>
        </Tabs>
        <Box>
          {tabIdx === "1" && <RequireTerms setTerms={setTerms} handleNext={setTabIdx} />}
          {tabIdx === "2" && <Register terms={terms} />}
        </Box>
      </Grid>
    </Container>
  )
}

export default StepRegister;