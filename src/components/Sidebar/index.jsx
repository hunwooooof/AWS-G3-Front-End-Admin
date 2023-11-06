import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 350px;
  padding: 100px 40px;
  z-index: 99;
  background-color: #313538;
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

const Menu = styled(Link)`
  display: flex;
  align-items: center;
  font-size: 28px;
  gap: 20px;
  color: white;
  text-decoration: none;
`;

const Icon = styled.span`
  font-family: 'Material Icons';
  font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
`;

const Title = styled.div``;

function Sidebar() {
  return (
    <Wrapper>
      <Menu to='/'>
        <Icon>home</Icon>
        <Title>首頁</Title>
      </Menu>
      <Menu to='coupon'>
        <Icon>confirmation_number</Icon>
        <Title>優惠券管理</Title>
      </Menu>
    </Wrapper>
  );
}

export default Sidebar;
