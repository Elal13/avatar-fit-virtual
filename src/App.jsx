
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Index from '@/pages/Index';
import Shop from '@/pages/Shop';
import Profile from '@/pages/Profile';
import Cart from '@/pages/Cart';
import NotFound from '@/pages/NotFound';
import Orders from '@/pages/Orders';
import History from '@/pages/History';
import Terms from '@/pages/Terms';
import Closet from '@/pages/Closet';
import "./App.css";

// This file is deprecated in favor of App.tsx
// It's kept for reference but is not actually used in the application
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/closet" element={<Closet />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/history" element={<History />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
