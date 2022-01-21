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
  ${mobile({ width: "95%" })};
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
  ${mobile({ fontSize: "1.1em" })};
  

  
`

const Right = styled.div`
  flex:1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  color: ${fontColor};
  ${mobile({ flex: "1.5" })};

`;

const MenuContainer = styled.div`
  width : 60%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  //background-color: aqua;
  ${mobile({ width: "100%" })};

`

const MenuItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1em;
  cursor: pointer;
  /* background-color: aqua; */
  margin-right: 25px;
  ${mobile({ fontSize: "1em", marginRight: "20px" })};

  

`;

const NavLink = styled(Link)`
  cursor: pointer;
  text-decoration: none;
  color: ${fontColor};
  
`

export default function Navbar() {

  const quantity = useSelector(state => state.cart.quantity)
  const { currentUser } = useSelector((state) => state.user)


  const handlePurge = () => {
    persistor.purge()
    window.location.reload()
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
            <MenuContainer>

              {!currentUser &&
                <NavLink to="/register">
                  <MenuItem>Register</MenuItem>
                </NavLink>}
              {currentUser &&
                <NavLink to="/">
                  <MenuItem onClick={handlePurge} >Logout</MenuItem>
                </NavLink>
              }
              {currentUser ?
                <MenuItem style={{ color: "#096cce", cursor: "default" }}  >{currentUser.username}</MenuItem> :
                <NavLink to="/signin" >
                  <MenuItem>Sign In</MenuItem>
                </NavLink>
              }
              <Badge badgeContent={quantity} color="primary" >
                <NavLink to="/cart" >
                  <ShoppingCartOutlined style={{ fontSize: "2em" }} />
                </NavLink>
              </Badge>
            </MenuContainer>
          </Right>
        </Wrapper>
      </Container>
    </Fade>
  )
}
