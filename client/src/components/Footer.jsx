import React from 'react'
import styled from 'styled-components'
import { Facebook, Instagram, Twitter, Pinterest, LocationOn, LocalPhone, MailOutline } from '@mui/icons-material/';
import { mobile } from '../data/responsive';

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 30vh;
  background-color: #ffffff;
  ${mobile({ flexDirection: "Column" })};
  
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 1%;
`;

const Center = styled.div`
  flex: 1;
  display: flex;
  padding: 1%;
  flex-direction: column;
  ${mobile({ display: "none" })};

`;
const Right = styled.div`
  flex: 1;
  display: flex;
  padding: 1%;
  flex-direction: column;
`;

const LogoName = styled.h2`
  font-size: 3em;
`;

const Text = styled.p`
  color: black;
  font-size: 1.1em;
  margin-top: 5%;
  width: 90%;
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 5%;
  width: 45%;
  justify-content: space-between;
  ${mobile({ width: "70%" })};

`;

const IconBG = styled.div`
  background-color: ${props => props.bgColor};
  color: white;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

`;

const SectionTitle = styled.h2`
  font-size: 1.5em;
  font-weight: 700;
`;

const ListContainer = styled.ul`
  margin: .7em 0 0 0;
  padding: 0;
  max-height: 70%;
  display: flex;
  width: 100%;
  flex-direction: column;
  list-style: none;
  flex-wrap: wrap;
`;

const ListItem = styled.li`
  font-size: 1.2em;
  font-weight: 400;
  margin: .7em 0 0 0;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1.2em;
  font-weight: 400;
  font-size: 1.2em;
`
const ContactSpan = styled.span`
  display: flex;
  align-items: center;
  margin-top: 1.1em;
`



const PaymentCards = styled.div`
  display: flex;
  margin-top: 1.2em;
`

const Card = styled.img`
  height: 36px;
  margin-right: .2em;
  
`

export default function Footer() {
  return (
    <Container>
      <Left>
        <LogoName> e-Commerce</LogoName>
        <Text>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Error, nulla quibusdam? Ullam aliquid, numquam quo ab fugit nulla, repellendus alias vitae iusto eligendi, sit esse et error obcaecati voluptatum nobis.</Text>
        <IconContainer>
          <IconBG bgColor="#4267B2" >
            <Facebook style={{ width: "70%", height: "70%" }} />
          </IconBG>
          <IconBG bgColor="#E1306C">
            <Instagram style={{ width: "70%", height: "70%" }} />
          </IconBG>
          <IconBG bgColor="#1DA1F2">
            <Twitter style={{ width: "70%", height: "70%" }} />
          </IconBG>
          <IconBG bgColor="#E60023">
            <Pinterest style={{ width: "70%", height: "70%" }} />
          </IconBG>
        </IconContainer>
      </Left>
      <Center>
        <SectionTitle>Useful Links</SectionTitle>
        <ListContainer>
          <ListItem>Home</ListItem>
          <ListItem>Man Fashion</ListItem>
          <ListItem>Accessories</ListItem>
          <ListItem>Order Tracking</ListItem>
          <ListItem>Wishlist</ListItem>
          <ListItem>Cart</ListItem>
          <ListItem>Woman Fashion</ListItem>
          <ListItem>My Account</ListItem>
          <ListItem>Favourites</ListItem>
          <ListItem>Terms</ListItem>
        </ListContainer>
      </Center>
      <Right>
        <SectionTitle>Contact</SectionTitle>
        <Info>
          <ContactSpan><LocationOn style={{ margin: "0 .5em 0 0" }} /> 674 Old Street, South Land 76555</ContactSpan>
          <ContactSpan><LocalPhone style={{ margin: "0 .5em 0 0" }} />+10 334 445 848</ContactSpan>
          <ContactSpan><MailOutline style={{ margin: "0 .5em 0 0" }} />florin.iasinovschi@gmail.com</ContactSpan>
        </Info>
        <PaymentCards>
          <Card src="/images/misc/payment_cards/visa.png" />
          <Card src="/images/misc/payment_cards/mastercard.png" />
          <Card src="/images/misc/payment_cards/maestro.png" />
          <Card src="/images/misc/payment_cards/americanexpress.png" />
          <Card src="/images/misc/payment_cards/paypal.png" />
        </PaymentCards>
      </Right>
    </Container>
  )
}
