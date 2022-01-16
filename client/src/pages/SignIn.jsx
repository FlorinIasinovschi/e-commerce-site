import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { login } from '../redux/apiCalls'


const Container = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-items: center;
  background-color: aliceblue;
`

const Wrapper = styled.div`
  display: flex;
  width: 600px;
  height: 400px;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
`
const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 80%;
  height: 80%;
  justify-content: space-between;
`

const Input = styled.input`
  font-size: 1em;
  padding: 10px;
`
const Title = styled.h1`
  font-size: 2em;
  font-weight: 400;
  margin-bottom: 5%;
  color: #202020;
`


const AText = styled.a`
  font-size: .9em;
  cursor: pointer;
  text-decoration: underline;
`



const LoginBtn = styled.button`
  background: #000000;
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
  &:disabled{
    cursor: not-allowed;
    background-color: grey;
  }

`;

const Error = styled.span`
  color: red;
`


export default function SignIn() {

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const dispatch = useDispatch();
  const { isFetching, error } = useSelector((state) => state.user);

  const handleLogin = (e) => {
    e.preventDefault();
    login(dispatch, { username, password })
  }

  return (
    < Container >
      <Wrapper>
        <Form>
          <Title>SIGN IN</Title>
          <Input placeholder='Username' onChange={(e) => setUsername(e.target.value)} ></Input>
          <Input placeholder='Password' type="password" onChange={(e) => setPassword(e.target.value)} ></Input>
          <LoginBtn onClick={handleLogin} disabled={isFetching} >LOGIN</LoginBtn>
          {error && <Error>Something Went Wrong...</Error>}
          <AText>FORGOT THE PASSWORD?</AText>
          <AText href='/register' >CREATE A NEW ACCOUNT.</AText>
        </Form>
      </Wrapper>

    </ Container >
  )
}
