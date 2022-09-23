import { useState } from 'react';
import PostCode from 'react-daum-postcode';

/*
Daum 우편번호 검색 API

1. 컴포넌트 생성

2. 주소 필드에 우편번호 컴포넌트 열기 이벤트 등록 (useState)

3. callback 작성 
  3-1. zip, address를 저장 (Hooks 등을 사용)
  3-2. 우편번호 컴포넌트 닫기 (useState)

ex.
const [openPostCode, setOpenPostCode] = useStatus(false); // Step.1

{openPostcode && <div><DaumPostCode callback={handlePostCodeCallback} /></div>} // Step.2

const handlePostCodeCallback = (zip: string, addr1: string) => { // Step.3
  formik.setFieldValue('zip', zip);
  formik.setFieldValue('addr1', addr1);
  
  setOpenPostcode(false); 
}
*/

interface PostCodeProps {
  callback: (data: string, fullAddress: string) => void;
}

const DaumPostCode = ({callback}: PostCodeProps) => {
  const handleCompletePostcode = (data:any) => {
    let fullAddress = data.address;
    let extraAddress = '';

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress += extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
    }

    callback(data.zonecode, fullAddress);
  };

  return (
    <>
      <PostCode onComplete={handleCompletePostcode}/>
    </>
  )
}

export default DaumPostCode;