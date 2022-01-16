import styled from 'styled-components/';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import Products from '../components/Products';
import NewsLetter from '../components/NewsLetter';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';


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
  background-color: aliceblue;
  
`

const PageTitle = styled.h1`
  color: #3a3a3a;
  font-size: 3em;
  font-weight: 300;
  margin: 1% 0 2% 2%;
`;

const FilterTypeContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 0 3%;

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
    setFilter({
      ...filters,
      [e.target.name]: e.target.value
    }
    )
  }

  const handleSorting = (e) => {
    setSorting(e.target.value);
  }

  return (
    <PageContainer>
      <Navbar />
      <PageTitle>Products</PageTitle>
      <FiltersContainer>
        <FilterTypeContainer>
          <Text>Filter Products</Text>
          <Selection name='category' onChange={handleSelect}>
            <Option disabled selected >Type</Option>
            <Option value={"coat"} >Coats</Option>
            <Option value={"jacket"}>Jackets</Option>
            <Option value={"sweater"}>Sweaters</Option>
          </Selection>
          <Selection name='size' onChange={handleSelect}>
            <Option disabled selected >Size</Option>
            <Option >S</Option>
            <Option >M</Option>
            <Option >L</Option>
          </Selection>
        </FilterTypeContainer>

        <FilterTypeContainer>
          <Text>Sort Products</Text>
          <Selection name='sorting' onChange={handleSorting} >
            <Option disabled selected >Newest</Option>
            <Option value="asc" >Price (asc)</Option>
            <Option value="desc">Price (desc)</Option>
            <Option value="newest">Newest</Option>
          </Selection>
        </FilterTypeContainer>

      </FiltersContainer>
      <Products category={filters} sort={sorting} location={location} />
      <NewsLetter />
      <Footer />

    </PageContainer>
  );
}

export default ProductsList;
