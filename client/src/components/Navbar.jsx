import styled from 'styled-components'
import { LanguageOutlined, ShoppingCartOutlined } from '@mui/icons-material/';
import { Badge } from '@mui/material/';
import { mobile } from '../data/responsive'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux'
import { fontColor, logoColor } from '../data/stylesVariables';
import { persistor } from '../redux/store'
import { Fade } from 'react-reveal';

const Container = styled.div`
  width : 99vw;
  height : 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
  border-bottom: 1px solid #aaaaaa;
`;
const Wrapper = styled.div`
  display :flex;
  width: 90%;
  height: 80%;
  justify-content: space-between;
  align-items: center;
`;
const Left = styled.div`
  flex:1;
  display: flex;
  align-items: center;
  ${mobile({ display: "none" })};

`;
const Language = styled.div`
  font-size: 1.2em;
  font-weight: 500;
  margin-right: 1%;
  color: ${fontColor};

  ${mobile({ display: "none" })};


`;
const Searchbar = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid lightgray;
  height: 25px;
  width: 40%;
  padding: 1%;
`;
const Input = styled.input`
  width: 100%;
  height: 100%;
  border:none;
`;
const Center = styled.div`
  flex:1;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2em;
  font-weight: 400;
  color: ${logoColor};
  ${mobile({ fontSize: "1.5em" })};

`;

const Logo = styled.span`
  font-size: 1em;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${logoColor};

  
`

const Right = styled.div`
  flex:1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  color: ${fontColor};
  ${mobile({ flex: "1.3" })};

`;
const MenuItem = styled.div`
  font-size: 1.1em;
  cursor: pointer;
  margin-right: 5%;
`;

const NavLink = styled(Link)`
  width:15%;
  font-size: 1em;
  cursor: pointer;
  text-decoration: none;
  color: ${fontColor};
`

export default function Navbar() {

  const quantity = useSelector(state => state.cart.quantity)

  const handlePurge = () => {
    persistor.purge()
  }

  return (
    <Fade>
      <Container>
        <Wrapper>
          <Left>
            <Language>EN</Language>
            <LanguageOutlined style={{ color: { fontColor } }} />

          </Left>
          <Center>
            <Link to="/" style={{ textDecoration: "none" }}>
              <Logo>
                e-Commerce.
              </Logo>
            </Link>
          </Center>
          <Right>
            <MenuItem onClick={handlePurge} >Purge Redux</MenuItem>
            <NavLink to="/register">
              <MenuItem>Register</MenuItem>
            </NavLink>
            <NavLink to="/signin" >
              <MenuItem>Sign In</MenuItem>
            </NavLink>
            <Badge badgeContent={quantity} color="primary" >
              <NavLink to="/cart" >
                <ShoppingCartOutlined />
              </NavLink>
            </Badge>
          </Right>
        </Wrapper>
      </Container>
    </Fade>
  )
}
