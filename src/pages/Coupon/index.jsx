import { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import discountImage from './discount.webp';
import freeFreightImage from './free-freight-fee.webp';
import { AuthContext } from '../../context/authContext';
import ec2Api from '../../utils/ec2Api';
import toast, { Toaster } from 'react-hot-toast';

const Wrapper = styled.div`
  height: 100%;
  padding: 10px 100px 0px 400px;
`;

const Navigation = styled.div`
  display: flex;
  gap: 26px;
  font-size: 26px;
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
  padding: 10px 0 40px 40px;
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
  &::placeholder {
    color: #c6c6c6;
  }
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

const Submit = styled.button`
  cursor: pointer;
  font-size: 20px;
  margin-top: 20px;
  margin-left: 200px;
  &:disabled {
    cursor: not-allowed;
  }
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
  padding: 30px;
`;

const Discount = styled.div`
  color: #bc6946;
  letter-spacing: 2px;
  font-size: 18px;
  margin-top: 10px;
  margin-bottom: auto;
  @media screen and (max-width: 479px) {
    font-size: 12px;
    margin-top: 5px;
  }
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
  font-size: 20px;
  color: #504d4d;
`;

// =============
//   剩餘數量
// =============

const Table = styled.table`
  border: 1px solid #6f6f6f;
  width: 800px;
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

const Tr = styled.tr`
  color: ${(props) => (props.$isZero ? '#c0c0c0' : 'black')};
`;

const Delete = styled.div`
  cursor: pointer;
  border: none;
  background-color: white;
  &:hover {
    text-shadow: 0 0 10px #808080;
  }
`;

const fields = [
  { name: '活動名稱', type: 'text', id: 'title', placeholder: '雙11狂歡' },
  { name: '發放數量', type: 'number', id: 'amount' },
  { name: '折扣數', type: 'number', id: 'discount' },
  { name: '開始日期', type: 'date', id: 'start_date' },
  { name: '截止日期', type: 'date', id: 'expiry_date' },
];

const initialNewCoupon = {
  type: '折扣',
  title: '',
  discount: 0,
  start_date: '',
  expiry_date: '',
  amount: 0,
};

function Coupon() {
  const { isLogin, jwtToken } = useContext(AuthContext);
  const [management, setManagement] = useState('addNew');
  const [newCoupon, setNewCoupon] = useState(initialNewCoupon);
  const [couponsDetail, setCouponsDetail] = useState('');

  const handleChangeManagement = (e) => {
    setManagement(e.target.id);
  };

  const handleChangeInput = (e) => {
    const id = e.target.id;
    newCoupon[id] = e.target.value;
    setNewCoupon({ ...newCoupon });
  };

  const handleClickSubmit = () => {
    const start_date = new Date(newCoupon.start_date);
    const expiry_date = new Date(newCoupon.expiry_date);

    if (start_date < expiry_date) {
      const userConfirmed = window.confirm('確定新增優惠券？');
      if (userConfirmed) {
        const discountNum = newCoupon.type === '折扣' ? Number(newCoupon.discount) : 0;
        const amountNum = Number(newCoupon.amount);
        const body = { ...newCoupon, discount: discountNum, amount: amountNum };
        console.log(body);
        async function addMarketingCoupon() {
          const response = await ec2Api.addMarketingCoupon(body, jwtToken);
          if (response.success) {
            toast.success(response.message);
            setNewCoupon(initialNewCoupon);
          }
        }
        addMarketingCoupon();
      }
    } else {
      toast.error('截止日期早於開始日期');
    }
  };

  const handleClickDelete = (e) => {
    const userConfirmed = window.confirm('刪除後優惠券將歸零，確定要繼續嗎？');
    if (userConfirmed) {
      async function deleteCollection() {
        const response = await ec2Api.deleteCollection(e.target.id, jwtToken);
        if (response) {
          console.log(response);
          toast.success(response.message);
          async function getAllCoupons() {
            const { data } = await ec2Api.getAllCoupons(jwtToken);
            if (data && data !== couponsDetail) {
              setCouponsDetail(data);
            }
          }
          getAllCoupons();
        }
      }
      deleteCollection();
    }
  };

  useEffect(() => {
    async function getAllCoupons() {
      const { data } = await ec2Api.getAllCoupons(jwtToken);
      if (data && data !== couponsDetail) {
        setCouponsDetail(data);
      }
    }
    if (isLogin) getAllCoupons();
  }, [management]);

  const renderContent = () => {
    if (management === 'addNew') {
      if (isLogin) {
        return (
          <>
            <Description>
              目前設定優惠券折扣為 —— {newCoupon.type === '折扣' ? `${newCoupon.discount}% off` : '免運'}
            </Description>
            <Fields>
              <Field>
                <Label>折扣類型</Label>
                <Radio id='type' type='radio' name='type' value='折扣' onChange={handleChangeInput} defaultChecked />
                折扣
                <Radio id='type' type='radio' name='type' value='免運' onChange={handleChangeInput} />
                免運
              </Field>
              {fields.map((field) => {
                if (field.id === 'discount' && newCoupon.type === '免運') return;
                return (
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
                );
              })}
              <Submit
                onClick={handleClickSubmit}
                disabled={(newCoupon.title, newCoupon.start_date, newCoupon.expiry_date) === ''}>
                設定優惠券
              </Submit>
            </Fields>
            <Preview>預覽畫面</Preview>
            <Item>
              <Img src={newCoupon.type === '折扣' ? discountImage : freeFreightImage} />
              <ItemDetail>
                <ItemInfo>
                  <ItemInfoName>{newCoupon.title}</ItemInfoName>
                  <GetButton>領取</GetButton>
                </ItemInfo>
                <Discount>{newCoupon.type === '折扣' ? newCoupon.discount + '% off' : '免運'}</Discount>
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
            <Description>查看目前活動中的優惠券剩餘數量與截止日期</Description>
            <Table>
              <thead>
                <tr>
                  <Th>優惠券名稱</Th>
                  <Th>剩餘數量</Th>
                  <Th>截止日期</Th>
                  <Th>刪除優惠券</Th>
                </tr>
              </thead>
              <tbody>
                {couponsDetail.map((coupon) => {
                  const today = new Date();
                  const expiry_date = new Date(coupon.expiry_date);
                  if (today < expiry_date) {
                    return (
                      <Tr key={coupon.id} $isZero={coupon.amount === 0}>
                        <Td>{coupon.title}</Td>
                        <Td>{coupon.amount}</Td>
                        <Td>{coupon.expiry_date.slice(0, 10)}</Td>
                        <Td>
                          {coupon.amount > 0 ? (
                            <Delete id={coupon.id} onClick={handleClickDelete}>
                              ❌
                            </Delete>
                          ) : (
                            '-'
                          )}
                        </Td>
                      </Tr>
                    );
                  }
                })}
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
      <Toaster
        position='top-right'
        toastOptions={{
          style: {
            fontSize: '26px',
            backgroundColor: '#dbdbdbc2',
          },
        }}
      />
    </Wrapper>
  );
}

export default Coupon;
