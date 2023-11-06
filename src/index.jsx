import ReactDOM from 'react-dom/client';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import App from './App';
import Checkout from './pages/Checkout';
import Home from './pages/Home';
import Product from './pages/Product';
import Profile from './pages/Profile';
import ThankYou from './pages/ThankYou';
import Coupon from './pages/Coupon';
import Collection from './pages/Collection';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<App />}>
        <Route index element={<Home />} />
        <Route path='profile' element={<Profile />} />
        <Route path='*' element={<Navigate to='/' replace />} />
      </Route>
    </Routes>
  </BrowserRouter>,
);
