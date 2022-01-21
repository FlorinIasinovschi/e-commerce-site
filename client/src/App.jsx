import Home from './pages/Home'
import ProductsList from './pages/ProductsList';
import ProductPage from './pages/ProductPage';
import SignIn from './pages/SignIn';
import Register from './pages/Register';
import Cart from './pages/Cart';
import styled from 'styled-components';
import Product from './components/Product';
import {
  BrowserRouter as Router,
  Switch,
  Routes,
  Route,
  Redirect,
  Link,
  Navigate
} from "react-router-dom";
import Success from './pages/Success';
import { useSelector } from 'react-redux';
import ScrollToTop from './pages/ScrollToTop';
import { useEffect, useState } from 'react';

const AppContainer = styled.div`
  margin: 0;
  padding: 0;
`
const WhiteBackground = styled.div`
  background-color: white;
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 999;
`


function App() {
  const [pageisReloading, setPageIsReloading] = useState(false);
  const user = useSelector((state) => state.user.currentUser);

  useEffect(() => {
    window.onbeforeunload = () => {
      setPageIsReloading(true);
      window.scrollTo(0, 0);
    }

  }, [])

  return (
    <Router>
      <AppContainer className="App">
        {pageisReloading && <WhiteBackground />}
        <ScrollToTop>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/products/all" element={<ProductsList />} />
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/register" element={<Register />} />
            <Route path="/register/success" element={<Home />} />
            <Route path="/success" element={<Success />} />
          </Routes>
        </ScrollToTop>
      </AppContainer>
    </Router>
  );
}

export default App;
