import { GetServerSidePropsContext } from 'next';

export function requireAuthentication(gssp: any) { 
  return async (context: GetServerSidePropsContext) => {
      const { req, res } = context;
      const token = req.cookies.accessToken;

      if (!token) {
          return {
              redirect: {
                  destination: '/login',
                  statusCode: 302
              }
          };
      }

      return await gssp(context); 
  }
}

export default requireAuthentication;