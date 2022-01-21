import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CheckCircleOutlineOutlined } from '@mui/icons-material/';
import { mobile } from '../data/responsive'
import styled from 'styled-components'
import { login } from '../redux/apiCalls'
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';


const Container = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  justify-content: flex-start;
  align-items: center;
  background-color: aliceblue;
  flex-direction: column;

`

const Wrapper = styled.div`
  display: flex;
  width: 600px;
  height: 400px;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
  top : 0;
  bottom : 0;
  margin : auto;
  ${mobile({ width: "100%" })};

`

const SucessDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 800px;
  height: 500px;
  align-items: center;
  background-color: #ffffff;
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto;
  font-size: 1.2em;
`
const SuccessTitle = styled.h1`
  font-size: 2.2em;
  font-weight: 400;
  margin: 5% 0 10% 0;
  color: #202020;
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



export default function Success() {


  const navigate = useNavigate();


  useEffect(() => {

    setTimeout(() => {
      navigate("/")
    }, 5000)

  }, [])

  return (
    < Container >
      <Navbar />
      <Wrapper>
        <SucessDiv>
          <CheckCircleOutlineOutlined style={{ fontSize: "100px", marginTop: "30px", color: "green" }} />
          <SuccessTitle>ORDER COMPLETED</SuccessTitle>
          You will now be redirected to the <b>Home Page</b>
        </SucessDiv>
      </Wrapper>

    </ Container >
  )
}
