import React, { useState } from 'react'
import styled from 'styled-components'
import Navbar from '../components/Navbar'
import { CheckCircleOutlineOutlined } from '@mui/icons-material/';
import { mobile } from '../data/responsive'

import { publicRequest } from '../data/requestMethods'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Navigate, useNavigate } from 'react-router-dom';



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

const OldForm = styled.form`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  width: 85%;
  height: 80%;
  justify-content: space-between;
`
const ValidError = styled.div`
  color: red;
`

const Input = styled.input`
  width: 85%;
  font-size: 1em;
  padding: 10px;
  
`
const Title = styled.h1`
  font-size: 2em;
  font-weight: 400;
  margin-bottom: 3%;
  color: #202020;
`
const SuccessTitle = styled.h1`
  font-size: 2.2em;
  font-weight: 400;
  margin: 5% 0 10% 0;
  color: #202020;
`


const AText = styled.a`
  font-size: .9em;
  cursor: pointer;
  text-decoration: underline;
`
const SpanContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`
const InpContainer = styled.div`
  width: 100%;
`
const PolicyText = styled.p`
  font-size: .75em;
`
const HiddenText = styled.p`
  font-size: 1em;
  visibility:hidden;
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

  const [userExistsError, setUserExistsError] = useState(false)
  const [emailExistsError, setEmailExistsError] = useState(false)
  const [success, setSuccess] = useState(false)
  let navigate = useNavigate();

  const postRegister = async (values) => {
    try {
      await publicRequest.post('auth/register', {
        username: values.userName,
        email: values.email,
        password: values.password
      })
      console.log("Success")
      setSuccess(true)
      setTimeout(() => {
        navigate("/signin");

      }, 3000);

    } catch (err) {
      console.log(err);
      if (err.response.data === "Username") {
        setUserExistsError(true);
        console.log(err.response.data);
      }
      if (err.response.data === "Email") {
        setEmailExistsError(true);
        console.log(err.response.data);
      }
      else {
        console.log(err);
      }
    }
  }



  // FORM VALIDATION

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      userName: '',
      email: '',
      password: '',
      confirmPassword: ''
    },
    validationSchema: Yup.object({
      firstName: Yup.string()
        .max(15, 'Must be 15 characters or less')
        .required('Required'),
      lastName: Yup.string()
        .max(15, 'Must be 20 characters or less')
        .required('Required'),
      userName: Yup.string()
        .max(15, 'Must be 20 characters or less')
        .required('Required'),
      email: Yup.string().email('Invalid email address').required('Required'),
      password: Yup.string()
        .max(15, 'Must be 20 characters or less')
        .required('Required')
        .min(5, 'Must be at least 5 charcters'),
      confirmPassword: Yup.string()
        .max(15, 'Must be 20 characters or less')
        .required('Required')
        .min(5, 'Must be at least 5 charcters')
        .oneOf([Yup.ref("password")], "Passwords do not match"),
    }),
    onSubmit: values => {
      // alert(JSON.stringify(values, null, 2));
      postRegister(values)
    },
  });


  return (
    < Container >
      <Navbar />
      <Wrapper>
        {success ? <SucessDiv>
          <CheckCircleOutlineOutlined style={{ fontSize: "100px", marginTop: "30px", color: "green" }} />
          <SuccessTitle>REGISTRATION SUCCESSFUL!</SuccessTitle>
          You will now be redirected to the <b>Login Page</b></SucessDiv> :
          <OldForm onSubmit={formik.handleSubmit}>
            <Title>CREATE AN ACCOUNT</Title>
            <SpanContainer>
              <InpContainer>
                <Input
                  placeholder='Name'
                  id="firstName"
                  name="firstName"
                  type="text"
                  {...formik.getFieldProps('firstName')}
                />
                <ValidError>{formik.touched.firstName && formik.errors.firstName ? formik.errors.firstName : <HiddenText>P</HiddenText>}</ValidError>
              </InpContainer>

              <InpContainer>
                <Input
                  placeholder='Last Name'
                  id="lastName"
                  name="lastName"
                  type="text"
                  {...formik.getFieldProps('lastName')}
                />
                {formik.touched.lastName && formik.errors.lastName ? <ValidError>{formik.errors.lastName}</ValidError> : <HiddenText>P</HiddenText>}
              </InpContainer>
            </SpanContainer>

            <SpanContainer>
              <InpContainer>
                <Input
                  placeholder='Username'
                  id="userName"
                  name="userName"
                  type="text"
                  onFocus={() => setUserExistsError(false)}
                  {...formik.getFieldProps('userName')}

                />
                {formik.touched.userName && formik.errors.userName ? <ValidError>{formik.errors.userName}</ValidError> :
                  userExistsError ? <ValidError>Username has been taken...</ValidError> : <HiddenText>P</HiddenText>}
              </InpContainer>
              <InpContainer>
                <Input
                  placeholder='Email'
                  id="email"
                  name="email"
                  type="email"
                  onFocus={() => setEmailExistsError(false)}
                  {...formik.getFieldProps('email')}

                />
                {formik.touched.email && formik.errors.email ? <ValidError>{formik.errors.email}</ValidError> :
                  emailExistsError ? <ValidError>Email is already registered...</ValidError> : <HiddenText>P</HiddenText>}
              </InpContainer>
            </SpanContainer>

            <SpanContainer>
              <InpContainer>
                <Input
                  placeholder='Password'
                  id="password"
                  name="password"
                  type="password"
                  {...formik.getFieldProps('password')}

                />
                {formik.touched.password && formik.errors.password ? <ValidError>{formik.errors.password}</ValidError> : <HiddenText>P</HiddenText>}
              </InpContainer>
              <InpContainer>
                <Input
                  placeholder='Confirm Password'
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  {...formik.getFieldProps('confirmPassword')}

                />
                {formik.touched.confirmPassword && formik.errors.confirmPassword ? <ValidError>{formik.errors.confirmPassword}</ValidError> : <HiddenText>P</HiddenText>}
              </InpContainer>
            </SpanContainer>
            <PolicyText>By creating an account I consent to the processing of my personal data in accordance to the <b>PRIVACY POLICY</b>.</PolicyText>

            <LoginBtn type="submit">Submit</LoginBtn>
          </OldForm>
        }
      </Wrapper>

    </ Container >
  )
}
