import React from 'react'
import { Link } from 'react-router-dom';
import { mobile } from '../data/responsive';
import styled from 'styled-components'

const HoverBg = styled.div`
  width: 100%;
  height: 100%;
  background-color: grey;
  opacity: 0;
  position: absolute;
  z-index: 2;
  transition: all 0.5s ease;
  &:hover {
    opacity: 0.5;
  }
`;

const Container = styled.div`
  width : 100%;
  height : 70vh;
  flex : 1;
  margin: 2px;
  display: flex;
  justify-content : center;
  align-items : center;
  position : relative;
  ${mobile({ height: "100%", margin: "2px 0 0 0" })};
  

  &:hover ${HoverBg} {
    opacity: 0.5;
  }
`;

const TextWrapper = styled.div`
  display : flex;
  width : 80%;
  height : auto;
  justify-content : center;
  align-items : center;
  flex-direction: column;
  z-index: 2;


`;

const Title = styled.h1`
  font-size: 4em;
  font-weight: 500;
  z-index: 2;
  margin-bottom: 20%;
  color : white;
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  position : absolute;
  z-index: 0;
`;

const ShowButton = styled.button`
  background: white;
  cursor : pointer;
  color : black;
  border: 2px solid grey;
  padding: 1em;
  width: 200px;
  font-size: 1em;
  transition: all 0.4s ease;
  &:hover {
    background-color: #1b1b1b;
    color: white;
  border: 2px solid white;

  }
  ${mobile({ fontSize: ".9em", padding: ".8em" })};
  
`;

export default function CategoryItem({ item }) {

  return (
    <Container>
      <HoverBg />
      <Img src={item.imgLink} />
      <TextWrapper>
        <Title>{item.title}</Title>
        <Link to={`/products/all`}>
          <ShowButton>
            Explore Now
          </ShowButton>
        </Link>
      </TextWrapper>
    </Container>
  )
}
