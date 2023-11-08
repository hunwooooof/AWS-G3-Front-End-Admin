import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 270px;
  padding: 100px 20px;
  z-index: 99;
  background-color: #313538;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Menu = styled(Link)`
  display: flex;
  align-items: center;
  font-size: 28px;
  gap: 20px;
  color: white;
  text-decoration: none;
  padding: 8px 10px;
  border-radius: 8px;
  &:hover {
    background-color: #575757;
  }
`;

const Icon = styled.span`
  font-family: 'Material Icons';
  font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
`;

function Sidebar() {
  return (
    <Wrapper>
      <Menu to='/'>
        <Icon>home</Icon>
        <div>首頁</div>
      </Menu>
      <Menu to='coupon'>
        <Icon>confirmation_number</Icon>
        <div>優惠券管理</div>
      </Menu>
    </Wrapper>
  );
}

export default Sidebar;
