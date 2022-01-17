import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { mobile } from '../data/responsive';
import { useDispatch } from 'react-redux';
import { addProduct } from '../redux/cartRedux';

const Img = styled.img`
  width: 70%;
  max-height: 80%;
  object-fit: contain;
  transition: all 0.4s ease;
  //background-color: white;
  //position : absolute;
  //z-index: 0;

`;

const Container = styled.div`
  flex: 1;
  min-width: 20%;
  height: 50%;
  display : flex;
  justify-content: center;
  align-items: center;
  margin : 2px;
  padding: 10px;
  background-color: #f0f2f3;
  position: relative;
  transition: all 0.5s ease;
  &:hover {
    background-color: #ffffff;
  }

  &:hover ${Img} {

    transform: scale(0.8);
  ${mobile({ transform: "scale(0.7)", marginBottom: "10%" })};

  }

  ${mobile({ minWidth: "20%", minHeight: '400px', })};



`;



const IconWrapper = styled.div`
  width : 100%;
  height: 100%;
  background-color: none;
  position: absolute;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
  opacity: 0;
  transition: all 0.4s ease;
  
  &:hover {
    opacity: 1;
  }

`;

const AddToCartButton = styled.button`
  background: white;
  cursor : pointer;
  color : black;
  border: 2px solid grey;
  padding: .8em;
  width: 100px;
  font-size: .8em;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 2%;
  transition: all 0.4s ease;
  &:hover {
    background-color: #303030;
    color: white;
  border: 2px solid white;

  }

`;

const PriceWrapper = styled.div`
  width: 100%;
  height: auto;
  position: absolute;
  bottom: 5%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PriceTag = styled.span`
  color: #535353;
  margin-right: 1em;
  font-size: 1em;
`;

const ProductName = styled.span`
  color: #2e2e2e;
  margin-right: 1em;
  font-size: 1.2em;
  font-weight: 600;
`;



export default function Product({ item }) {



  return (
    <Container>
      <Img src={item.img} />
      <IconWrapper>
        <PriceWrapper>
          <ProductName>
            {item.title}
          </ProductName>
          <PriceTag>
            {`$${item.price}`}
          </PriceTag>
          <Link to={`/product/${item._id}`} style={{ textDecoration: "none" }} >
            <AddToCartButton >
              Product Page
            </AddToCartButton>
          </Link>
        </PriceWrapper>
      </IconWrapper>
    </Container>
  )
}
