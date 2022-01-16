import styled from 'styled-components'
import { ArrowForwardIos, ArrowBackIos } from '@mui/icons-material/';
import { sliderData } from '../data/sliderData';
import { useState } from 'react';
import { Fade } from 'react-reveal';



const Container = styled.div`
  width: 100%;
  height: calc(100vh - 70px);
  display: flex;
  overflow: hidden;
  position: relative;
`;
const Arrow = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto;
  height: 50px;
  width: 50px;
  display:flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: #e4e4e4;
  left: ${props => props.direction === "left" && "20px"};
  right: ${props => props.direction === "right" && "20px"};
  cursor:pointer;
  opacity: 0.5;
  z-index: 2;
`;
const Wrapper = styled.div`
  height: auto;
  display: flex;
  transition: all 1.5s ease;
  transform: translateX(${props => props.sliderIndex * -100}vw);
`;
const Slide = styled.div`
  width: 100vw;
  height: 100%;
  display: flex;
  align-items: center;

  -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
     -khtml-user-select: none; /* Konqueror HTML */
       -moz-user-select: none; /* Old versions of Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
            user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome, Edge, Opera and Firefox */
`;
const ImgContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;

  //background-color: #ffffff;
`;
const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
`;
const TextContainer = styled.div`
  margin-left: 3%;
  //background-color: #836d66;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const Title = styled.h1`
  font-weight: 500;
  font-size: 6em;
  color: #2c2c2c;
  margin-bottom: 10%;

`;
const Paragraph = styled.p`
  font-size: 1.8em;
  margin-bottom: 10%;
  margin-right: 10%;

`;
const ShowButton = styled.button`
  background: none;
  cursor : pointer;
  border: 2px solid grey;
  padding: 1%;
  width: 30%;
  font-size: 1.2em;
  transition: all 0.4s ease;
  &:hover {
    background-color: #1b1b1b;
    color: white;
  border: 2px solid white;

  }

`;

export default function Slider() {

  const [sliderIndex, setSliderIndex] = useState(0);

  const handleClick = (direction) => {
    if (direction === "left") {
      setSliderIndex(sliderIndex > 0 ? sliderIndex - 1 : 2);
    }
    else {
      setSliderIndex(sliderIndex > 1 ? 0 : sliderIndex + 1);
    }
  }


  return (
    <Container>
      <Arrow direction="left" onClick={() => handleClick("left")}>
        <ArrowBackIos style={{ marginLeft: "20%" }} />
      </Arrow>
      <Arrow direction="right" onClick={() => handleClick("right")}>
        <ArrowForwardIos />
      </Arrow>
      <Wrapper sliderIndex={sliderIndex}>
        {sliderData.map(el =>
          <Slide key={el.id}>
            <ImgContainer>
              <Img src={el.imgLink} />
            </ImgContainer>
            <Right>
              <TextContainer>
                <Title>{el.title}</Title>
                <Paragraph>
                  {el.paragraph}
                </Paragraph>
                <ShowButton>
                  SHOW MORE
                </ShowButton>
              </TextContainer>
            </Right>
          </Slide>
        )}

      </Wrapper>

    </Container>
  )
}
