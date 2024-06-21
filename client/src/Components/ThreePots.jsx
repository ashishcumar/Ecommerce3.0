import React from "react";
import { Grid, Box, Text } from "@chakra-ui/react";
import { threePotsData } from "../helper/plants";
function ThreePots() {
  return (
    <Grid
      sx={{
        padding: "48px",
        placeContent: "center",
        gridTemplateColumns: ['1fr',"repeat(3,1fr)"],
        gap: "24px",
      }}
    >
      {threePotsData.map((data) => {
        return (
          <Box
            key={data.name}
            sx={{
              height: "500px",
              width: "400px",
              margin: "auto",
              background: data.bg,
              position: "relative",
            }}
          >
            <img
              src={data.image}
              alt={data.name}
              style={{
                height: "100%",
                objectFit: "contain",
              }}
            />
            <Text
              sx={{
                width: "80%",
                margin: "auto",
                position: "absolute",
                left:0,
                right:0,
                bottom:10,
                background:'white',
                fontWeight: "600",
                fontSize: "24px",
                textAlign:'center',
                padding:'8px 0'
              }}
            >
             {data.name}
            </Text>
          </Box>
        );
      })}
    </Grid>
  );
}

export default ThreePots;
