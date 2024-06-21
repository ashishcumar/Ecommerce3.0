import React from "react";
import { Grid, Box, Text, Flex } from "@chakra-ui/react";
import { shades } from "../helper/shades";
import PlantCard from "./PlantCard";
import { useSelector } from "react-redux";

function FreshAndGreen() {
  const products = useSelector((state) => state.contractSlice?.products);
  // console.log("contractReducer", state);
  return (
    <Grid
      id="freshAndGreen"
      sx={{
        padding: "24px 24px 48px 24px",
        background: shades.secondary,
      }}
    >
      <Box sx={{ margin: "12px 0", textAlign: "center", padding: "12px 0" }}>
        <Text
          sx={{ fontSize: "28px", fontWeight: "600", color: shades.text_dark }}
        >
          Fresh and green
        </Text>
        <Text
          sx={{ fontSize: "16px", fontWeight: "500", color: shades.text_dark }}
        >
          Green your space with nature's grace.
        </Text>
      </Box>
      {products?.length ? (
        <Grid
          sx={{
            gridTemplateColumns: ["1fr", "1fr 1fr 1fr 1fr"],
            gap: "24px",
            placeContent: "center",
          }}
        >
          {products?.slice(0, 8).map((item) => {
            return <PlantCard card={item} key={item} />;
          })}
        </Grid>
      ) : null}
    </Grid>
  );
}

export default FreshAndGreen;
