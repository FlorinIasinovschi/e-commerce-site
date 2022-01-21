import styled from 'styled-components/';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import Products from '../components/Products';
import NewsLetter from '../components/NewsLetter';
import { mobile } from '../data/responsive'

import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import { Fade } from 'react-reveal';


const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  `

const FiltersContainer = styled.div`
  display: flex;
  align-items: center;
  height: 80px;
  width: 100%;
  justify-content: space-between;
  //background-color: red;
  box-sizing: border-box;
  ${mobile({ flexDirection: "column", alignItems: "center", height: "auto", justifyContent: "center" })};

`

const PageTitle = styled.h1`
  color: #3a3a3a;
  font-size: 3em;
  font-weight: 300;
  margin: 40px 0 10px 0;
`;

const FilterTypeContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 0 3%;
  //background-color: aliceblue;
  ${mobile({ margin: "5px 0", fontSize: "0.8em", width: "90%", justifyContent: "space-between" })};


`
const Text = styled.span`
  font-size: 1.5em;
`
const Selection = styled.select`
width: auto;
font-size: 1em;
height: auto;
margin-left: 1em;
padding: 10px;
`
const Option = styled.option`
  font-size: 1em;
`


function ProductsList() {
  const location = useLocation().pathname.split('/')[2];

  const [filters, setFilter] = useState({})
  const [sorting, setSorting] = useState("Newest")

  const handleSelect = (e) => {
    if (e.target.value === "all") {
      setFilter({});
    }
    else {
      setFilter({
        ...filters,
        [e.target.name]: e.target.value
      }
      )
    }

  }

  const handleSorting = (e) => {
    setSorting(e.target.value);
  }

  return (
    <PageContainer>
      <Navbar />
      <Fade>

        <PageTitle>Products</PageTitle>

      </Fade>
      <Fade bottom delay={200}>
        <div style={{ width: "100%" }} >
          <FiltersContainer>
            <FilterTypeContainer>
              <Text>Filter Products</Text>
              <Selection name='category' defaultValue={"Select Type"} onChange={handleSelect}>
                <Option value={"Select Type"} disabled >Select Type</Option>
                <Option value={"coat"} >Coats</Option>
                <Option value={"jacket"}>Jackets</Option>
                <Option value={"sweater"}>Sweaters</Option>
                <Option value={"all"}>All</Option>
              </Selection>
              <Selection name='size' defaultValue={"Size"} onChange={handleSelect}>
                <Option value={"Size"} disabled  >Size</Option>
                <Option >S</Option>
                <Option >M</Option>
                <Option >L</Option>
              </Selection>
            </FilterTypeContainer>
            <FilterTypeContainer>
              <Text>Sort Products</Text>
              <Selection name='sorting' defaultValue={"Newest"} onChange={handleSorting} >
                <Option value={"Newest"} disabled  >Newest</Option>
                <Option value="asc" >Price (asc)</Option>
                <Option value="desc">Price (desc)</Option>
                <Option value="newest">Newest</Option>
              </Selection>
            </FilterTypeContainer>

          </FiltersContainer>
        </div>
      </Fade>
      <Fade bottom delay={100}>
        <div style={{ width: "100%" }} >
          <Products category={filters} sort={sorting} location={location} />

        </div>

      </Fade>
      <NewsLetter />
      <Footer />

    </PageContainer>
  );
}

export default ProductsList;
