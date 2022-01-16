import React from 'react'
import styled from 'styled-components'
import Navbar from '../components/Navbar'


const Container = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  flex-direction: column;
  align-items: center;
  background-color: aliceblue;
  position: relative;

`

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 800px;
  height: 500px;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto;

`
const Form = styled.form`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  width: 85%;
  height: 80%;
  justify-content: space-between;
`

const Input = styled.input`
  width: 45%;
  font-size: 1em;
  padding: 10px;
`
const Title = styled.h1`
  font-size: 2em;
  font-weight: 400;
  margin-bottom: 3%;
  color: #202020;
`


const AText = styled.a`
  font-size: .9em;
  cursor: pointer;
  text-decoration: underline;
`
const InpContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`
const PolicyText = styled.p`
  font-size: .75em;
`


const LoginBtn = styled.button`
  background: #000000;
  margin-top: 3%;
  cursor : pointer;
  color : #dddddd;
  border: 2px solid grey;
  padding: .8em;
  width: 100px;
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

`;

export default function Register() {
  return (
    < Container >
      <Navbar />
      <Wrapper>
        <Form>
          <Title>CREATE AN ACCOUNT</Title>
          <InpContainer>
            <Input placeholder='Name'></Input>
            <Input placeholder='Last Name'></Input>
          </InpContainer>
          <InpContainer>
            <Input placeholder='Username'></Input>
            <Input placeholder='Email'></Input>
          </InpContainer>
          <InpContainer>
            <Input placeholder='Password' type="password"></Input>
            <Input placeholder='Confirm Password' type="password"></Input>
          </InpContainer>
          <PolicyText>By creating an account I consent to the processing of my personal data in accordance to the <b>PRIVACY POLICY</b>.</PolicyText>
          <LoginBtn>REGISTER</LoginBtn>
        </Form>
      </Wrapper>

    </ Container >
  )
}
