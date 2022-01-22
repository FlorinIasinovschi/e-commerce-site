import styled from 'styled-components';
import Product from './Product';
import { mobile } from '../data/responsive';
import { useEffect, useState } from 'react';
import axios from 'axios';


const PageWrapper = styled.div`
  width : 100%;
  height : 100vh;
  display : flex;
  align-items: center;
  justify-content: center;
  ${mobile({ height: "auto" })};

  
  `;

const Container = styled.div`
  width : 100%;
  height : 100%;
  display : flex;
  //padding : 20px;
  flex-wrap: wrap;
  justify-content: space-between;
  ${mobile({ flexDirection: "column", flexWrap: 'nowrap' })};
`;


export default function Products({ category, sort, location }) {
  // console.log(location);
  // console.log(category);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/products`)
        setProducts(res.data);
      } catch (err) {

      }
    }
    getProducts();
  }, [location])

  useEffect(() => {
    location &&
      setFilteredProducts(
        products.filter(el => Object.entries(category).every(([key, value]) => el[key].includes(value)))
      )

  }, [products, category, location])


  useEffect(() => {
    if (sort === "newest") {
      setFilteredProducts((previous) => [...previous].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt)))

    }
    else if (sort === "asc") {
      setFilteredProducts((previous) => [...previous].sort((a, b) => a.price - b.price))
    }
    else if (sort === "desc") {
      setFilteredProducts((previous) => [...previous].sort((a, b) => b.price - a.price))
    }

  }, [sort])

  return (
    <PageWrapper>
      <Container>
        {category ? filteredProducts.map(el => <Product item={el} key={el._id} />) :
          products.slice(0, 9).map(el => <Product item={el} key={el._id} />)}

      </Container>
    </PageWrapper>

  )
}

