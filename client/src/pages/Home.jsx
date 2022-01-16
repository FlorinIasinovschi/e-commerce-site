import Categories from '../components/Categories';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import Products from '../components/Products';
import Slider from '../components/Slider';
import NewsLetter from '../components/NewsLetter';
import styled from 'styled-components';
import { mobile } from '../data/responsive';
import { Fade } from 'react-reveal';

const Wrapper = styled.div`
  display: flex;
  align-items:center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  height: auto;
`;

const HomeContainer = styled.div`
  display: flex;
  align-items:center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  height: auto;
`;

const PageTitle = styled.h1`
  color: #3a3a3a;
  font-size: 3em;
  font-weight: 300;
  margin: 150px 0 100px 0;
  ${mobile({ fontSize: "2em" })};

`;

const AnimContainer = styled.div`
  width: 100%;
  height: auto;
`


function Home() {
  return (
    <HomeContainer>
      <Navbar />
      <Fade delay={500} >
        <div style={{ width: "100%" }}>
          <Slider />
        </div>
      </Fade>
      <Wrapper >
        <Fade delay={200} >
          <AnimContainer>
            <PageTitle>
              Discover Our Products
            </PageTitle>
          </AnimContainer>
        </Fade>
        <Fade delay={300}>
          <AnimContainer>
            <Categories />
          </AnimContainer>
        </Fade >
        <Fade delay={200}>
          <PageTitle>
            New Collection
          </PageTitle>
        </Fade>
        <Fade>
          <Products />

        </Fade>
      </Wrapper>
      <NewsLetter />
      <Footer />

    </HomeContainer>
  );
}

export default Home;
