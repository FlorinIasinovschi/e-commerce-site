import React, { useEffect } from 'react'
import styled from 'styled-components'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import { useState } from 'react'
import NewsLetter from '../components/NewsLetter'
import { useDispatch, useSelector } from 'react-redux'
import { decreaseProductQuantity, deleteProduct, increaseProductQuantity } from '../redux/cartRedux'
// import StripeCheckout from 'react-stripe-checkout'
import axios from 'axios'
import { publicRequest } from '../data/requestMethods'
import { userRequest } from '../data/requestMethods'
import { Link, useNavigate } from 'react-router-dom'
import { Fade } from 'react-reveal'


const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
const Title = styled.h1`
  font-size: 2em;
  margin-top: 30px;
  font-weight: 400;
`
const BtnsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 2%;
`
const BodyContainer = styled.div`
  display: flex;
  width: 95%;
  height: auto;
`
const ItemsContainer = styled.div`
  flex: 3;
  display: flex;
  flex-direction: column;
  //background-color: #d8e2e2;
  height: auto;
`

const OrderContainer = styled.div`
  flex: 1;
  display: flex;
  min-height: 500px;
  height: auto;

  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`

const OrderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: auto;
  border: 1px solid grey;
  border-radius: 20px;
  padding: 20px;
  box-sizing: border-box;
`

const Item = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid grey;
  padding: 20px 0;
  position: relative;
`
const Image = styled.img`
  width: 250px;
  height: 250px;
  object-fit: contain;
`
const DescContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: auto;
  width: auto;
`
const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 80%;
  width: auto;
`

const ProductsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: auto;
  width: auto;
`

const PriceAndAmountContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 70%;
  width: 130px;
  position: absolute;
  right: 5%;
`
const AmountContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  width: 100%;
`
const DescSpan = styled.span`
  font-size: 1.2em;
`
const SpanContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
  font-size: ${props => props.fontsize};
  

`

const Amount = styled.p`
  font-size: 1.5em;
  margin: 0 3%;
`
const Price = styled.span`
  font-size: 1.5em;
  font-weight: 500;
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

const Btn = styled.button`
  background: white;
  cursor : pointer;
  color : black;
  border: 2px solid grey;
  padding: .8em;
  width: 200px;
  font-size: .8em;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  &:hover {
    background-color: #303030;
    color: white;
  border: 2px solid white;
  }

`;

const SummaryTitle = styled.h2`
  font-size: 2.5em;
  font-weight: 400;
  color: #252525;
  margin-bottom: 10%;
`

const CheckoutBtn = styled.button`
  background: #000000;
  cursor : pointer;
  color : #dddddd;
  border: 2px solid grey;
  font-weight: 500;
  margin-top: 10%;
  padding: .8em;
  width: 200px;
  font-size: 1em;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  &:hover {
    background-color: #ffffff;
    color: #252525;
  border: 2px solid grey;
  }

`;

const DeleteBtn = styled.button`
  background: #000000;
  cursor : pointer;
  color : #dddddd;
  border: 2px solid grey;
  font-weight: 500;
  margin-top: 50px;
  padding: .5em;
  width: 120px;
  font-size: .8em;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  &:hover {
    background-color: #ffffff;
    color: #252525;
  border: 2px solid grey;
  }
`


const KEY = process.env.REACT_APP_KEY;


export default function Cart() {


  const [limit, setLimit] = useState(false);
  const cart = useSelector(state => state.cart)
  const navigate = useNavigate();
  const dispatch = useDispatch();


  // INCREASE/DECREASE PRODUCT QUANTITY IN CART
  const handleClick = (type, productInfo, productQnt, cartIdx) => {
    if (type === "decrease" && productQnt > 1) {
      dispatch(
        decreaseProductQuantity({ ...productInfo, productQnt, cartIdx })
      )
      setLimit(false);

    }
    if (type === "increase" && productQnt === 5) {
      setLimit(true);
    }
    else if (type === "increase") {

      dispatch(
        increaseProductQuantity({ ...productInfo, productQnt, cartIdx })
      )
    }
  }

  // DELETE PRODUCT FROM CART
  const removeCartItem = (info, amount, cartIdx) => {
    dispatch(
      deleteProduct({ ...info, amount, cartIdx })
    );
  }

  const [stripeToken, setStripeToken] = useState(null)

  const onToken = (token) => {
    setStripeToken(token);
    console.log(token)
  }

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await userRequest.post("/checkout/payment", {
          tokenId: stripeToken.id,
          amount: cart.total
        })
        navigate("/success", { data: res.data })

      } catch (err) {
        console.log(err);
      }
    }
    stripeToken && makeRequest()
  }, [stripeToken, cart.total, navigate])

  const handleCheckout = () => {
    console.log("clicked")
    console.log(cart.products)
    const sendCart = async () => {
      try {
        const res = await axios.post(`${process.env.REACT_APP_SERVER_URL}/checkout/create-checkout-session`, {

          items: cart.products.map((el) => ({
            price_data: {
              currency: 'usd',
              product_data: {
                name: el.title,
              },
              unit_amount: el.price * 100,
            },
            quantity: el.amount,
          }))

        })
        const body = await res.data
        window.location.href = body.url


      } catch (err) {
        console.log(err);
      }
    }

    sendCart();
  }


  return (
    <Container>
      <Navbar />
      <Fade>
        <Title>Cart Products</Title>
        <div style={{ width: "95%" }} >

          <BtnsWrapper>
            <Link to='/products/all' style={{ textDecoration: "none" }} >
              <Btn>Continue Shopping</Btn>
            </Link>
            <Btn>Go To Checkout</Btn>
          </BtnsWrapper>
        </div>

      </Fade>


      <BodyContainer>

        <Fade delay={300} >
          <div style={{ flex: 3 }} >

            <ItemsContainer>
              {cart.products?.map((el) =>

              (<Item key={el.cartIdx} >
                <Image src={el.img} />
                <InfoContainer>
                  <DescSpan>
                    <b>PRODUCT:</b> {el.title}
                  </DescSpan>
                  <DescSpan>
                    <b>ID:</b> {el._id}
                  </DescSpan>
                  <DescSpan>
                    <b>COLOR:</b> {el.color}
                  </DescSpan>
                  <DescSpan>
                    <b>SIZE:</b> {el.size}
                  </DescSpan>
                </InfoContainer>
                <PriceAndAmountContainer>
                  <AmountContainer>
                    <SymbolBtn onClick={() => handleClick("decrease", el, el.amount, el.cartIdx)} >-</SymbolBtn>
                    <Amount>{el.amount}</Amount>
                    <SymbolBtn onClick={() => handleClick("increase", el, el.amount, el.cartIdx)} >+</SymbolBtn>
                  </AmountContainer>
                  <Price>$ {el.price}</Price>
                  <DeleteBtn onClick={() => removeCartItem(el, el.amount, el.cartIdx)} >Remove Item</DeleteBtn>
                </PriceAndAmountContainer>
              </Item>)
              )}
            </ItemsContainer>
          </div>
        </Fade>

        <Fade right >
          <OrderContainer>
            <OrderWrapper>
              <SummaryTitle>ORDER SUMMARY</SummaryTitle>
              <ProductsContainer>
                {cart.products?.map((el) =>
                  <SpanContainer key={el.cartIdx}>
                    <DescSpan>{el.title} </DescSpan>
                    <DescSpan>x{cart.products[cart.products.findIndex(x => x.cartIdx === el.cartIdx)].amount}  $ {el.price}</DescSpan>
                  </SpanContainer>
                )}
              </ProductsContainer>

              <DescContainer>
                <SpanContainer style={{ marginTop: "30px" }} >
                  <DescSpan>Subtotal</DescSpan>
                  <DescSpan>${cart.total}</DescSpan>
                </SpanContainer>
                <SpanContainer type="shipping" >
                  <DescSpan>Estimated Shipping</DescSpan>
                  <DescSpan>$5</DescSpan>
                </SpanContainer>
                <SpanContainer>
                  <DescSpan>Shipping Discount</DescSpan>
                  <DescSpan>$-5</DescSpan>
                </SpanContainer>
                <SpanContainer fontsize="2em" style={{ marginTop: "30px" }}>
                  <DescSpan>Total</DescSpan>
                  <DescSpan>$ {cart.total}</DescSpan>
                </SpanContainer>
              </DescContainer>
              <CheckoutBtn onClick={handleCheckout} >Check Out</CheckoutBtn>
            </OrderWrapper>
          </OrderContainer>
        </Fade>

      </BodyContainer>
      <NewsLetter />
      <Footer />
    </Container>
  )
}
