import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Terms } from '../../core/model/Terms';

interface TermsProps {
  setTerms: React.Dispatch<React.SetStateAction<Terms>>,
  handleNext: React.Dispatch<React.SetStateAction<string>>
}

export const RequireTerms: React.FunctionComponent<TermsProps> = ({setTerms, handleNext}) => {
  const handleClick = () => {
    setTerms({
      site: true,
      requireInformation: true,
      promotion: true
    });

    handleNext("2");
  }

  return (
    <Container>
      <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', height: "500px", overflowY:"scroll"}}>
        <Typography component="h1" variant="h5">
          이용약관
        </Typography>
        <Box sx={{ mt: 1 }}>
          <Typography component="h1" variant="h5">
            제1조 목적
          </Typography>
          <Typography component="h1" variant="h6">
            이 약관은 요요허브(이하 "회사"라 한다)가 제공하는 요요허브 서비스(이하 "서비스"라 한다)의 이용조건 및 절차에 관한 기본적인 사항을 규정함을 목적으로 합니다.
          </Typography>
          <Typography component="h1" variant="h5">
            제2조 용어의 정의
          </Typography>
          <Typography component="h1" variant="h6">
            이 약관에서 사용하는 용어의 정의는 다음과 같습니다.
          </Typography>
          <Typography component="h1" variant="h6">
            1. "회원"이라 함은 회사와 서비스 이용계약을 체결하고 회사가 제공하는 서비스를 이용하는 고객을 말합니다.
          </Typography>
          <Typography component="h1" variant="h6">
            2. "아이디(ID)"라 함은 회원의 식별과 서비스 이용을 위하여 회원이 정하고 회사가 승인하는 문자와 숫자의 조합을 말합니다.
          </Typography>
          <Typography component="h1" variant="h6">
            3. "비밀번호"라 함은 회원이 부여 받은 아이디와 일치된 회원임을 확인하고 비밀보호를 위해 회원 자신이 정한 문자와 숫자의 조합을 말합니다.
          </Typography>
          <Typography component="h1" variant="h6">
            4. "해지"라 함은 회사 또는 회원이 서비스 이용계약을 취소하는 것을 말합니다.
          </Typography>
          <Typography component="h1" variant="h6">
            제3조 약관의 명시와 설명 및 개정
          </Typography>
          <Typography component="h1" variant="h6">
            1. 회사는 이 약관의 내용과 상호, 영업소 소재지, 대표자의 성명, 전화번호, 사업자등록번호, 통신판매업신고번호 등을 이용자가 쉽게 알 수 있도록 서비스 초기 화면에 게시합니다. 다만, 약관의 구체적 내용은 이용자가 연결화면을 통하여 볼 수 있도록 할 수 있습니다.
          </Typography>
          <Typography component="h1" variant="h6">
            2. 회사는 약관의 규제 등에 관한 법률, 전자거래기본법, 전자서명법, 정보통신망 이용촉진 및 정보보호 등에 관한 법률, 방문판매 등에 관한 법률, 소비자보호법 등 관련법을 위배하지 않는 범위에서 이 약관을 개정할 수 있습니다.
          </Typography>
          <Typography component="h1" variant="h6">
            3. 회사가 약관을 개정할 경우에는 적용일자 및 개정사유를 명시하여 현행약관과 함께 그 적용일자 7일 이전부터 적용일자 전일까지 공지합니다. 다만, 회원에게 불리하게 약관내용을 변경하는 경우에는 최소한 30일 이상의 사전 유예기간을 두고 공지합니다. 이 경우 회사는 개정 전 내용과 개정 후 내용을 명확하게 비교하여 이용자가 알기 쉽도록 표시합니다.
          </Typography>
          <Typography component="h1" variant="h6">
            4. 회사가 전항에 따라 개정약관을 공지 또는 통지하면서 회원에게 개정약관 적용일자 7일 이전까지 거부의사를 표명하지 아니하면 회원이 개정약관에 동의한 것으로 봅니다. 회원이 개정약관의 적용에 동의하지 않는 경우 회사는 개정약관 적용일 이후에도 이용계약을 해지할 수 있습니다.
          </Typography>
          <Typography component="h1" variant="h6">
            5. 이 약관에서 정하지 아니한 사항과 이 약관의 해석에 관하여는 전자거래기본법, 전자서명법, 정보통신망 이용촉진 및 정보보호 등에 관한 법률, 방문판매 등에 관한 법률, 소비자보호법 등 관련법 및 상관례에 따릅니다.
          </Typography>
          <Typography component="h1" variant="h6">
            6. 회사는 이용자가 안전하게 이용할 수 있도록 개인정보취급방침을 수립하여 운영합니다.
          </Typography>
        </Box>
      </Box>
      <Typography component="h1" variant="h6" color="error" sx={{ mt: 3 }}>
        * 수익률 확정지급이나, 원금 보장하지 않습니다.
      </Typography>
      <Button
        sx={{ mt: 3, width: "100%", alignItem: 'center'}}
        onClick={handleClick}
        variant="contained"
      >
        모든 약관에 동의 합니다
      </Button>
    </Container>
  );
}

export default RequireTerms;