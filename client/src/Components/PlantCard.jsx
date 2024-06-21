import React from "react";
import { Grid, Box, Text, Button } from "@chakra-ui/react";
import { shades } from "../helper/shades";
import ether from "../assets/ether.png";
import { useNavigate } from "react-router";

function PlantCard({ card }) {
  const navigate = useNavigate();
  return (
    <Grid
      sx={{
        height: "450px",
        minWidth: "320px",
        margin: "auto",
        background: "white",
        position: "relative",
      }}
    >
      <img
        src={card.image}
        alt={card.id}
        style={{
          height: "300px",
          objectFit: "contain",
          margin: "0 auto",
        }}
      />
      <Text
        sx={{
          fontSize: "14px",
          color: "white",
          background: shades.primary,
          padding: "4px 12px",
          width: "fit-content",
          height: "fit-content",
          position: "absolute",
          top: 0,
          left: 0,
        }}
      >
        {card.id < 4 ? "New" : "Fresh"}
      </Text>
      <Box sx={{ textAlign: "center" }}>
        <Text sx={{ fontSize: "18px", fontWeight: "700", margin: "0 0 8px 0" }}>
          {" "}
          {card.name}{" "}
        </Text>
        <Text
          sx={{
            fontSize: "16px",
            fontWeight: "600",
            margin: "0 0 8px 0",
            display: "flex",
            justifyContent: "center",
            gap: "0px",
            alignItems: "center",
          }}
        >
          {`${card.cost} Eth`}
          <img
            src={ether}
            alt="ether"
            style={{ width: "16px", height: "16px" }}
          />
        </Text>
        <Button
          sx={{
            color: "white",
            background: shades.primary,
            borderRadius: 0,
            padding: "8px 24px",
            "&:hover": { color: shades.primary, background: "white" },
            border: `2px solid ${shades.primary}`,
            margin: "8px 0",
          }}
          onClick={() => navigate(`/product/${card.id}`)}
        >
          Shop Now
        </Button>
      </Box>
    </Grid>
  );
}

export default PlantCard;
