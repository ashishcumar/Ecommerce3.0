import React from "react";
import { Grid, Box, Text, Flex } from "@chakra-ui/react";
import { shades } from "../helper/shades";
import { fourPointsData } from "../helper/plants";

function FourPoints() {
  return (
    <Flex
      sx={{
        padding: "48px",
        background: shades.secondary,
        flexWrap: "wrap",
        justifyContent: "space-between",
        alignItems: "center",
        gap:'12px'
      }}
    >
      {fourPointsData.map((data) => {
        return (
          <Grid sx={{ gridTemplateColumns: "4fr 6fr",padding:'12px',background:'white' }} key={data.text}>
            <Flex sx={{alignItems:'center'}}>
              <img
                src={data.image}
                alt={data.text}
                style={{ height: "60px", width: "60px",margin:'auto' }}
              />
            </Flex>
            <Box>
              <Text
                sx={{
                  fontSize: "20px",
                  fontWeight: "700",

                  color: shades.text_dark,
                }}
              >
                {data.textMain}
              </Text>
              <Text
                sx={{
                  fontSize: "18px",
                  fontWeight: "500",
 
                  color: shades.text_dark,
                }}
              >
                {data.text}
              </Text>
            </Box>
          </Grid>
        );
      })}
    </Flex>
  );
}

export default FourPoints;
