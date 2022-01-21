import React from 'react'
import styled from 'styled-components';
import { mobile } from '../data/responsive';

const Container = styled.div`
  height: 50vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ebe4db;
  margin-top: 5%;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 50%;
  ${mobile({ width: "90%", height: "100%" })};

`;

const Title = styled.h1`
  color: #535353;
  font-size: 5em;
  font-weight: 500;
  ${mobile({ fontSize: "3em", marginBottom: "30px" })};

`;

const Text = styled.span`
  margin-top: 5%;
  color: #535353;
  font-size: 1.2em;
  font-weight: 500;
  ${mobile({ marginBottom: "10px" })};

`;

const InputContainer = styled.div`
  margin-top: 5%;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80%;
  //background-color: red;
  ${mobile({ flexDirection: "column" })};

`;

const Input = styled.input`
  width: 80%;
  height: 40px;
  padding: 4px 20px;
  font-size: .9em;
  box-sizing: border-box;
  ${mobile({ width: "100%", padding: "4px 10px", height: "40px" })};


`;

const SendButton = styled.button`
  height: 100%;
  background: white;
  cursor : pointer;
  color : #2e2e2e;
  border: 2px solid grey;
  padding: .8em;
  width: 20%;
  font-size: .8em;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.4s ease;
  &:hover {
    background-color: #1b1b1b;
    color: white;
  border: 2px solid white;

  }
  ${mobile({ width: "100px", fontSize: "1em", padding: ".5em", marginTop: "10px", height: "40px" })};


`;

export default function NewsLetter() {
  return (
    <Container>
      <Wrapper>
        <Title>
          NewsLetter
        </Title>
        <Text>
          Keep up with the latest discounts.
        </Text>
        <InputContainer>
          <Input placeholder='Your Email' />
          <SendButton>
            Send
          </SendButton>
        </InputContainer>
      </Wrapper>

    </Container>
  )
}
