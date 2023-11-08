import { useContext, useState } from 'react';
import ReactLoading from 'react-loading';
import styled from 'styled-components';
import { AuthContext } from '../../context/authContext';

const Wrapper = styled.div`
  padding: 80px 100px 0px 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.div`
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  padding-bottom: 20px;
  margin-bottom: 50px;
  border-bottom: 1px solid #979797;
`;

const Photo = styled.img`
  margin-top: 24px;
  width: 200px;
  height: 200px;
  object-fit: cover;
  border-radius: 50%;
`;

const Content = styled.div`
  margin-top: 30px;
  font-size: 20px;
  text-align: center;
`;

const LogoutButton = styled.button`
  padding: 5px 20px;
  font-size: 20px;
  margin-top: 50px;
  cursor: pointer;
`;

const LogIn = styled.div`
  display: flex;
  gap: 40px;
  justify-content: center;
  align-items: center;
`;

const Label = styled.label`
  width: 100px;
  margin: 20px 0;
  font-size: 20px;
  text-align: end;
  color: #3f3a3a;
  letter-spacing: 1.2px;
`;

const Input = styled.input`
  width: 300px;
  height: 35px;
  padding: 0 10px;
  border-radius: 4px;
  border: 1px solid #3f3a3a;
  font-size: 20px;
  color: #8b572a;
  letter-spacing: 1.2px;
`;

const Btn = styled.a`
  cursor: pointer;
  margin-bottom: 100px;
`;

const NativeBtn = styled(Btn)`
  margin-top: 50px;
  font-size: 20px;
  letter-spacing: 1.2px;
  color: #3f3a3a;
  &:hover {
    color: #8b572a;
  }
`;

const Loading = styled(ReactLoading)`
  margin-top: 50px;
`;

function Login() {
  const { user, isLogin, nativeLogin, logout, loading } = useContext(AuthContext);
  const [loginInfo, setLoginInfo] = useState({
    provider: 'native',
    email: '12345@123.com',
    password: '12345678hi',
  });

  const renderContent = () => {
    if (loading) return <Loading type='spinningBubbles' color='#313538' />;
    if (isLogin)
      return (
        <>
          <Title>Admin</Title>
          <Photo src={user.picture} />
          <Content>{user.name}</Content>
          <Content>{user.email}</Content>
          <LogoutButton onClick={logout}>登出</LogoutButton>
        </>
      );
    return (
      <>
        <Title>Admin 登入</Title>
        <LogIn>
          <Label>Email</Label>
          <Input
            value={loginInfo.email}
            type='email'
            name='email'
            onChange={(e) => {
              setLoginInfo({ ...loginInfo, email: e.target.value });
            }}
          />
        </LogIn>
        <LogIn>
          <Label>Password</Label>
          <Input
            value={loginInfo.password}
            type='text'
            name='password'
            onChange={(e) => {
              setLoginInfo({ ...loginInfo, password: e.target.value });
            }}
          />
        </LogIn>
        <LogIn>
          <NativeBtn
            type='submit'
            onClick={() => {
              nativeLogin(loginInfo);
            }}>
            登入
          </NativeBtn>
        </LogIn>
      </>
    );
  };
  return <Wrapper>{renderContent()}</Wrapper>;
}

export default Login;
