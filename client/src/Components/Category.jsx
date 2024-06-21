import { Box, Flex, Grid, Select, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { shades } from "../helper/shades";
import PlantCard from "./PlantCard";

function Category({ type }) {
  const products = useSelector((state) => state.contractSlice.products);
  const [productList, setProductList] = useState();
  const [sortBy, setSortBy] = useState("");
  const typeMapping = {
    "house-plants": "House Plants",
    "office-plants": "Office Plants",
  };

  const updateArrBySortingAndFiltering = () => {
    let arr = [...products];
    if (sortBy === "Low to High") {
      arr.sort((a, b) => a.cost - b.cost);
    } else if (sortBy === "High to Low") {
      arr.sort((a, b) => b.cost - a.cost);
    } else if (sortBy === "Z to A") {
      arr.sort((a, b) => b.name.localeCompare(a.name));
    } else if (sortBy === "A to Z") {
      arr.sort((a, b) => a.name.localeCompare(b.name));
    }
    return setProductList(arr);
  };

  useEffect(() => {
    updateArrBySortingAndFiltering();
  }, [sortBy]);

  return (
    <Grid sx={{ padding: "48px", background: shades.secondary }}>
      <Text
        sx={{
          fontSize: "36px",
          fontWeight: "600",
          color: shades.text_dark,
          marginBottom: "24px",
          textAlign: "right",
        }}
      >
        {typeMapping[type]}
      </Text>
      <Grid sx={{ gap: "24px" }}>
        <Grid>
          <Flex
            sx={{
              padding: "16px",
              background: "white",
              justifyContent: "right",
              alignItems: "center",
              gap: "24px",
            }}
          >
            <Text sx={{ color: shades.text_dark }}> Sort By: </Text>
            <Box sx={{ width: "200px" }}>
              <Select
                placeholder="Select option"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="Low to High">Price:- Low to High</option>
                <option value="High to Low">Price:- High to Low </option>
                <option value="A to Z">Alphabetically:- A to Z</option>
                <option value="Z to A">Alphabetically:- Z to A</option>
              </Select>
            </Box>
          </Flex>
          <Grid
            sx={{
              marginTop: "24px",
              padding: "16px",
              gridTemplateColumns: "repeat(4,1fr)",
              gap: "24px",
            }}
          >
            {productList
              ?.filter((item) => item.category === typeMapping[type])
              .map((card) => {
                return <PlantCard card={card} />;
              })}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Category;
