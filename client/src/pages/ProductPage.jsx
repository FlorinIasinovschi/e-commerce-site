import styled from 'styled-components/';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import NewsLetter from '../components/NewsLetter';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct } from '../redux/cartRedux';
import { Fade } from 'react-reveal';


const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  `
const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: calc(100vh - 70px );
`

const Left = styled.div`
  flex: 1;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f0f2f3;
  
`
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`
const RightContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  height: 100%;

`

const ProductImg = styled.img`
  object-fit: cover;
  width: 100%;
  max-height: 800px;
  min-height: 500px;
`


const BlockContainer = styled.div`
  display: flex;
  align-items: center;
  height: 80px;
  margin-top: 2%;
  width: 100%;
  justify-content: space-between;
  
`

const ProductTitle = styled.h1`
  color: #3a3a3a;
  font-size: 3em;
  font-weight: 300;
  margin: 8% 0 5% 0;
`;

const Paragraph = styled.p`
  width: 70%;
  font-size: 1.2em;
  margin: 0 0 5% 0;
`
const Price = styled.span`
  font-size: 2em;
  margin: 0 0 5% 0;

`

const SpanContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`
const Text = styled.span`
  font-size: 1.5em;
`
const Selection = styled.select`
width: auto;
font-size: 1em;
height: auto;
margin-left: 1em;
padding: 10px;
`
const Option = styled.option`
  font-size: 1em;
`
const Amount = styled.p`
  font-size: 1.5em;
  margin: 0 3%;

`
const SymbolBtn = styled.button`
  font-size: 1.5em;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.2s ease;
  &:hover {
    background-color: #303030;
    color: white;
  border: 2px solid white;
  }
`


const AddToCartBtn = styled.button`
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
  margin-left: 5%;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: #303030;
    color: white;
  border: 2px solid white;
  }

`;
const DisabledCartBtn = styled.button`
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
  margin-left: 5%;
  transition: all 0.3s ease;

`;

const CartPopUp = styled.div`
  position: fixed;
  width: 300px;
  height: 200px;
  background-color: white;
  bottom:200px;
  right: 100px;
  border-radius: 20px;
  box-shadow: 1px 1px 1px 1px lightgrey;
  
`

function ProductPage() {

  const [amount, setAmount] = useState(1);
  const [clickable, setClickable] = useState(false)
  const [warning, setWarning] = useState("");
  const [visible, setVisible] = useState(false);
  const [limit, setLimit] = useState(false);
  const [size, setSize] = useState("");
  const cart = useSelector((state) => state.cart);
  const [cartIdx, setCartIdx] = useState(cart.quantity);

  const id = useLocation().pathname.split('/')[2];
  const [productInfo, setProductInfo] = useState({})

  useEffect(() => {
    const getProductData = async () => {
      try {
        console.log(id);
        const res = await axios.get(`http://localhost:5000/api/products/${id}`)
        setProductInfo(res.data)
        console.log(res);

      } catch (err) {

      }
    }
    getProductData();
  }, [id])


  const handleAmount = (action) => {
    if (action === "decrease" && amount > 1) {
      setAmount(amount - 1);
      setLimit(false);
    }
    if (action === "increase" && amount === 5) {
      setLimit(true);
    }
    else if (action === "increase" && amount < 5) {
      setAmount(amount + 1);
    }
  }


  const dispatch = useDispatch();
  const addToCart = () => {
    dispatch(
      addProduct({ ...productInfo, amount, size, cartIdx })
    );
  }

  useEffect(() => {
    setCartIdx(cart.quantity);
    console.log(cartIdx);
  }, [cart.quantity])

  const handleSelection = (e) => {
    setSize(e.target.value);
    setClickable(true);
    setWarning("");
  }


  return (
    <PageContainer>
      <Navbar />
      {/* <Fade >
        <CartPopUp />
      </Fade> */}
      <Wrapper>
        <Left  >
          <Fade left delay={200}>
            <ProductImg src={productInfo.img} />
          </Fade>
        </Left>
        <Right>
          <RightContainer>
            <Fade>
              <ProductTitle>{productInfo.title}</ProductTitle>
              <Paragraph>{productInfo.description} </Paragraph>
              <Price>$ {productInfo.price} </Price>
              <BlockContainer>
                <SpanContainer>
                  <Text>Size</Text>
                  <Selection defaultValue={"Select"} onChange={handleSelection} >
                    <Option value="Select" disabled>Select</Option>
                    {productInfo.size?.map((s) => (<Option key={s}>{s}</Option>))}
                  </Selection>
                </SpanContainer>
              </BlockContainer>
              <BlockContainer>
                <SpanContainer>
                  <SymbolBtn onClick={() => handleAmount("decrease")} >-</SymbolBtn>
                  <Amount>{amount}</Amount>
                  <SymbolBtn onClick={() => handleAmount("increase")} >+</SymbolBtn>
                  {clickable ? <AddToCartBtn onClick={() => addToCart()} >Add to Cart</AddToCartBtn> :
                    <DisabledCartBtn onClick={() => setWarning("Select a size to continue...")} >Add To Cart</DisabledCartBtn>}
                  <span style={{ color: "red", marginLeft: "20px" }} >
                    {warning}
                  </span>

                </SpanContainer>
              </BlockContainer>
              <SpanContainer style={{ color: "red" }} >
                {limit && "Sorry can't order more than 5"}
              </SpanContainer>
            </Fade>
          </RightContainer>
        </Right>
      </Wrapper>
      <NewsLetter />
      <Footer />

    </PageContainer>
  );
}

export default ProductPage;
