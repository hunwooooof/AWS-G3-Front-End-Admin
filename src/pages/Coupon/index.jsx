import { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import discountImage from './discount.webp';
import freeFreightImage from './free-freight-fee.webp';
import { AuthContext } from '../../context/authContext';
import ec2Api from '../../utils/ec2Api';

const Wrapper = styled.div`
  height: 100%;
  padding: 80px 100px 0px 500px;
`;

const Navigation = styled.div`
  display: flex;
  gap: 60px;
  font-size: 30px;
  border-bottom: 1px solid #bbb;
  padding-bottom: 20px;
`;

const NavItem = styled.div`
  padding: 10px;
  border-radius: 8px;
  background-color: ${(props) => (props.$isActive ? '#dbdbdb' : 'white')};
  &:hover {
    cursor: pointer;
    background-color: #ededed;
  }
`;

const Description = styled.div`
  background-color: aliceblue;
  font-size: 20px;
  padding: 30px;
  border-radius: 10px;
  margin: 30px 0;
  letter-spacing: 1.2px;
`;

// =============
//   優惠券名稱
// =============

const Fields = styled.div`
  padding: 40px 0 40px 40px;
`;

const Field = styled.div`
  display: flex;
  margin: 30px;
  height: 30px;
  font-size: 20px;
  align-items: center;
`;

const Label = styled.label`
  width: 170px;
  letter-spacing: 1.5px;
  color: #575757;
`;

const Input = styled.input`
  width: 330px;
  height: 40px;
  padding: 0 5px;
  font-size: 20px;
  border-radius: 8px;
  border: 1px solid #6f6f6f;
`;

const Radio = styled.input`
  width: 20px;
  height: 20px;
  margin: 10px;
`;

const Preview = styled.div`
  letter-spacing: 1.5px;
  color: #242424;
  font-size: 24px;
  margin: 20px 0;
  padding: 20px;
  border-bottom: 1px solid #bbb;
`;

const Item = styled.div`
  margin: 0 auto;
  width: 90%;
  display: flex;
  gap: 10px;
  background-color: white;
  box-shadow: 2px 2px 3px #cbcbcb;
`;

const Img = styled.img`
  width: 30%;
`;

const ItemDetail = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px;
`;

const ItemInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ItemInfoName = styled.div`
  letter-spacing: 1.2px;
  font-weight: bold;
  font-size: 22px;
`;

const GetButton = styled.button`
  white-space: nowrap;
  background-color: #3f3a3a;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 20px;
`;

const ExpireDate = styled.div`
  font-size: 18px;
  color: #504d4d;
`;

// =============
//   剩餘數量
// =============

const Table = styled.table`
  border: 1px solid #6f6f6f;
  width: 650px;
  margin: 0 auto;
  margin-top: 50px;
  font-size: 20px;
  text-align: center;
`;

const Td = styled.td`
  padding: 10px;
  border: 1px solid black;
`;

const Th = styled.th`
  padding: 20px;
  font-size: 24px;
  background-color: #dbeeff;
  border-bottom: 1px solid black;
`;

const fields = [
  { name: '活動名稱', type: 'text', id: 'title', placeholder: '雙11狂歡' },
  { name: '發放數量', type: 'number', id: 'amount' },
  { name: '折扣數', type: 'number', id: 'discount' },
  { name: '開始日期', type: 'date', id: 'start_date' },
  { name: '截止日期', type: 'date', id: 'expiry_date' },
];

function Coupon() {
  const { isLogin, nativeLogin, logout, loading, jwtToken } = useContext(AuthContext);
  const [management, setManagement] = useState('addNew');
  const [newCoupon, setNewCoupon] = useState({
    type: '折扣',
    title: '',
    discount: 0,
    start_date: '',
    expiry_date: '',
    amount: 0,
  });
  const [couponsDetail, setCouponsDetail] = useState('');

  const handleChangeManagement = (e) => {
    setManagement(e.target.id);
  };

  const handleChangeInput = (e) => {
    const id = e.target.id;
    newCoupon[id] = e.target.value;
    setNewCoupon({ ...newCoupon });
  };

  useEffect(() => {
    async function getAllCoupons() {
      const { data } = await ec2Api.getAllCoupons(jwtToken);
      if (data) {
        setCouponsDetail(data);
      }
    }
    if (isLogin) getAllCoupons();
  }, []);

  const renderContent = () => {
    if (management === 'addNew') {
      if (isLogin) {
        return (
          <>
            <Description>目前設定優惠券折扣 {newCoupon.discount}% off</Description>
            <Fields>
              {fields.map((field) => (
                <Field key={field.id}>
                  <Label>{field.name}</Label>
                  <Input
                    type={field.type}
                    id={field.id}
                    value={newCoupon[field.id]}
                    placeholder={field?.placeholder}
                    onChange={handleChangeInput}
                  />
                </Field>
              ))}
              <Field>
                <Label>折扣類型</Label>
                <Radio id='type' type='radio' name='type' value='折扣' onChange={handleChangeInput} />
                折扣
                <Radio id='type' type='radio' name='type' value='免運' onChange={handleChangeInput} />
                免運
              </Field>
            </Fields>
            <Preview>預覽畫面</Preview>
            <Item>
              <Img src={newCoupon.type === '折扣' ? discountImage : freeFreightImage} />
              <ItemDetail>
                <ItemInfo>
                  <ItemInfoName>{newCoupon.title}</ItemInfoName>
                  <GetButton>領取</GetButton>
                </ItemInfo>
                <ExpireDate>有效期限：{newCoupon.expiry_date}</ExpireDate>
              </ItemDetail>
            </Item>
          </>
        );
      } else {
        return <Description>請先登入admin</Description>;
      }
    }
    if (management === 'checkAll') {
      if (isLogin) {
        return (
          <>
            <Description>查看目前活動中的優惠券剩餘數量</Description>
            <Table>
              <thead>
                <tr>
                  <Th>優惠券名稱</Th>
                  <Th>剩餘數量</Th>
                </tr>
              </thead>
              <tbody>
                {couponsDetail.map((coupon) => (
                  <tr key={coupon.id}>
                    <Td>{coupon.title}</Td>
                    <Td>{coupon.amount}</Td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </>
        );
      } else {
        return <Description>請先登入admin</Description>;
      }
    }
  };

  return (
    <Wrapper>
      <Navigation>
        <NavItem id='addNew' onClick={handleChangeManagement} $isActive={management === 'addNew'}>
          新增優惠券
        </NavItem>
        <NavItem id='checkAll' onClick={handleChangeManagement} $isActive={management === 'checkAll'}>
          優惠券剩餘數量
        </NavItem>
      </Navigation>
      {renderContent()}
    </Wrapper>
  );
}

export default Coupon;
