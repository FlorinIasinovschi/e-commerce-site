import CategoryItem from './CategoryItem'
import styled from 'styled-components'
import { categoriesData } from '../data/categoriesData';
import { mobile } from '../data/responsive';
import {
  Link,
  Navigate
} from "react-router-dom";

const PageWrapper = styled.div`
  width : 99vw;
  height : auto;
  display : flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  background-color: aliceblue;
  ${mobile({ height: "100vh" })};

  `;

const Container = styled.div`
  width : 100%;
  height : auto;
  display : flex;
  ${mobile({ flexDirection: "column", height: "100%" })};
  //background-color: red;
`;

export default function Categories() {
  return (
    <PageWrapper>
      <Container>
        {categoriesData.map(el =>
          <CategoryItem item={el} key={el.id} />
        )}
      </Container>
    </PageWrapper>
  )
}
