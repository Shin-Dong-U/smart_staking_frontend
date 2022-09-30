import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import NextLink from 'next/link';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { v4 as uuid } from 'uuid';
import Head from 'next/head';
import { Box, Button, Container, Link, TextField, Typography } from '@mui/material';

import { getBackendServerUrl } from '../../config/config';
import DaumPostCode from '../common/daumPostCode';
import * as Cert from '../../core/auth/certification';
import { Person } from '../../core/model/CertificationUser';

const UNAVAILABLE_ID = ['admin', 'system', 'manager', 'user', 'yoyohub', 'yolife'];

export const Register = ({ terms }: any) => {
  const router = useRouter();
  const [openPostcode, setOpenPostcode] = useState(false);
  const [failMessage, setFailMessage] = useState('');
  const [needCertification, setNeedCertification] = useState(true);
  const [orderId, setOrderId] = useState(uuid());

  const formik = useFormik({
    initialValues: {
      id: '',
      password: '',
      passwordConfirm: '',
      password2: '',
      password2Confirm: '',
      email: '',
      yolifeId: '',
      recommendId: '',
      zip: '',
      addr1: '',
      addr2: '',
      name: '',
      phone: '',
      birth: '',
      ci: '',
      di: '',
      sexCode: '',
      localCode: '',
    },
    validationSchema: Yup.object({
      // id: Yup.string()
      //   .required('아이디를 입력해주세요.')
      //   .matches(/^[a-zA-Z0-9]{4,12}$/, '아이디는 영문, 숫자 4~12자리로 입력해주세요.')
      //   .test('is_unvailable_id', '사용할 수 없는 아이디 입니다.', function (value) {
      //     return !UNAVAILABLE_ID.includes(value + '');
      //   }),
      email: Yup.string().email('이메일 형식으로 입력해주세요').max(100).required('필수 입력 항목입니다'),
      password: Yup.string().min(4, '4글자 이상 입력해주세요').max(20, '20자 이내로 입력해주세요').required('필수 입력 항목입니다'),
      passwordConfirm: Yup.string().oneOf([Yup.ref('password'), null], '비밀번호가 일치하지 않습니다'),
      password2: Yup.string()
        .matches(/^[0-9]{4}$/, '4자리 숫자를 입력해주세요')
        .required('필수 입력 항목입니다'),
      password2Confirm: Yup.string().oneOf([Yup.ref('password2'), null], '2차 비밀번호가 일치하지 않습니다'),
      yolifeId: Yup.string().max(20, '20자 이내로 입력해주세요'),
      recommendId: Yup.string().min(4, '4글자 이상 입력해주세요').max(20, '20자 이내로 입력해주세요'),
      addr2: Yup.string().max(100, '100자 이내로 입력해주세요'),
    }),
    onSubmit: async () => {
      await handleSubmit();
    },
  });

  const handleSubmit = async () => {
    // 1. 본인인증 완료 여부 검사
    let _person;
    if (needCertification) {
      const { isSuccess, person } = await getCertificationResult();
      setNeedCertification(!isSuccess);

      if (!isSuccess) {
        setFailMessage('본인인증을 해주세요, 인증이 실패하였거나 만료 되었습니다.');
        alert('본인인증을 해주세요.');
        return;
      } else {
        _person = person;
      }
      setFailMessage('');
    }

    const body = { ...formik.values, ..._person };
    // 2. 회원가입
    const serverUrl = getBackendServerUrl();
    const result = await axios
      .post(`${serverUrl}/user/register`, body, { withCredentials: true })
      .then((res) => {
        alert('가입 되었습니다.');
        router.push('/login');
      })
      .catch((err) => {
        if (err.response) {
          alert(err.response.data);
        } else {
          alert('회원가입에 실패하였습니다. 문제가 지속될 경우 고객센터에 문의해주세요.');
        }
      });
  };

  // 다음 우편번호 검색 제어
  const handlePostCodeCallback = (zip: string, addr1: string) => {
    formik.setFieldValue('zip', zip);
    formik.setFieldValue('addr1', addr1);
    setOpenPostcode(false);
  };

  // 휴대폰 본인인증
  const handleCertification = async () => {
    setFailMessage('');
    Cert.openCertificationPopup(orderId);
  };

  // 본인 인증 결과 리턴 - 성공시 formik에 바인딩
  const getCertificationResult = async () => {
    const certUser = await Cert.getCertificationUser(orderId);
    const isSuccess = Cert.isSuccessCertification(certUser);
    const person = Cert.parsePerson(certUser);

    if (certUser && isSuccess) {
      bindCertificationUser(person);
    }

    return { isSuccess: isSuccess, person: person };
  };

  const bindCertificationUser = (person: Person | null) => {
    if (!person) {
      return;
    }
    
    formik.setFieldValue('id', person.id);
    formik.setFieldValue('name', person.name);
    formik.setFieldValue('phone', person.phone);
    formik.setFieldValue('birth', person.birth);
    formik.setFieldValue('sexCode', person.sexCode);
    formik.setFieldValue('localCode', person.localCode);
    formik.setFieldValue('ci', person.ci);
    formik.setFieldValue('di', person.di);
  };

  
  return (
    <>
      <Head>
        <title>회원가입</title>
      </Head>
      <Container maxWidth='sm'>
        <form onSubmit={formik.handleSubmit}>
          {/* <TextField
            label='아이디'
            type='text'
            name='id'
            margin='normal'
            fullWidth
            inputProps={{ readOnly: true }}
            onChange={formik.handleChange}
            value={formik.values.id}
            error={Boolean(formik.errors.id)}
            helperText={formik.errors.id}
          /> */}
          
          <Typography sx={{mt: 3}} color="primary">
            * 아이디는 &apos;010&apos;, &apos;-&apos; 를 제외한 휴대폰 번호로 자동 생성됩니다. 
          </Typography>
          <TextField
            label='비밀번호'
            type='password'
            name='password'
            margin='normal'
            fullWidth
            onChange={formik.handleChange}
            value={formik.values.password}
            error={Boolean(formik.errors.password)}
            helperText={formik.errors.password}
          />
          <TextField
            label='비밀번호확인'
            type='password'
            name='passwordConfirm'
            margin='normal'
            fullWidth
            onChange={formik.handleChange}
            value={formik.values.passwordConfirm}
            error={Boolean(formik.errors.passwordConfirm)}
            helperText={formik.errors.passwordConfirm}
          />
          <TextField
            label='2차 비밀번호 (4자리 숫자)'
            type='password'
            name='password2'
            margin='normal'
            fullWidth
            onChange={formik.handleChange}
            value={formik.values.password2}
            error={Boolean(formik.errors.password2)}
            helperText={formik.errors.password2}
          />
          <TextField
            label='2차 비밀번호 확인'
            type='password'
            name='password2Confirm'
            margin='normal'
            onChange={formik.handleChange}
            value={formik.values.password2Confirm}
            error={Boolean(formik.errors.password2Confirm)}
            helperText={formik.errors.password2Confirm}
            fullWidth
          />
          <TextField
            label='이메일'
            type='text'
            name='email'
            margin='normal'
            fullWidth
            onChange={formik.handleChange}
            value={formik.values.email}
            error={Boolean(formik.errors.email)}
            helperText={formik.errors.email}
          />
          <TextField
            label='요라이프아이디'
            type='text'
            name='yolifeId'
            margin='normal'
            fullWidth
            onChange={formik.handleChange}
            value={formik.values.yolifeId}
            error={Boolean(formik.errors.yolifeId)}
            helperText={formik.errors.yolifeId}
          />
          <TextField
            label='추천인아이디'
            type='text'
            name='recommendId'
            margin='normal'
            fullWidth
            onChange={formik.handleChange}
            value={formik.values.recommendId}
            error={Boolean(formik.errors.recommendId)}
            helperText={formik.errors.recommendId}
          />

          {openPostcode && (
            <div>
              <DaumPostCode callback={handlePostCodeCallback} />
            </div>
          )}

          <TextField
            label='우편번호'
            type='text'
            name='zip'
            margin='normal'
            fullWidth
            inputProps={{ readOnly: true }}
            onClick={() => setOpenPostcode(true)}
            onChange={formik.handleChange}
            value={formik.values.zip}
          />
          <TextField label='주소' type='text' name='addr1' margin='normal' fullWidth inputProps={{ readOnly: true }} onChange={formik.handleChange} value={formik.values.addr1} />
          <TextField
            label='상세주소'
            type='text'
            name='addr2'
            margin='normal'
            fullWidth
            onChange={formik.handleChange}
            value={formik.values.addr2}
            error={Boolean(formik.errors.addr2)}
            helperText={formik.errors.addr2}
          />
          {needCertification && (
            <div>
              <Button size='large' color='error' variant='contained' fullWidth onClick={handleCertification}>
                휴대폰 본인인증
              </Button>
            </div>
          )}

          <Box sx={{ py: 2 }}>
            <Button type='submit' size='large' color='primary' variant='contained' fullWidth>
              회원가입
            </Button>
          </Box>
          <Typography color='red'>{failMessage}</Typography>
        </form>
        <Typography color='textSecondary' variant='body2'>
          계정이 있으신가요?{' '}
          <NextLink href='/login' passHref>
            <Link variant='subtitle2' underline='hover'>
              로그인
            </Link>
          </NextLink>
        </Typography>
      </Container>
    </>
  );
};

export default Register;
