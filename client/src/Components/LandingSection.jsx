import React from "react";
import { Grid, Text, Button } from "@chakra-ui/react";
import heroSectionImg from "../assets/heroSectionImg.png";
import { shades } from "../helper/shades";

function LandingSection() {
  function scrollToElement(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }
  return (
    <Grid
      sx={{
        padding: "24px",
        backgroundImage: `url(${heroSectionImg})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        minHeight: "80vh",
        backgroundPosition: "center",
        placeContent: "center",
        textAlign: "center",
      }}
    >
      <Text
        sx={{ fontSize: "24px", fontWeight: "600", color: shades.text_dark }}
      >
        Sale UPTO 30% off
      </Text>
      <Text
        sx={{
          fontWeight: "500",
          fontSize: ["28px", "48px"],
          color: shades.text_dark,
        }}
      >
        Gift Green this Holiday
      </Text>
      <Button
        variant={"solid"}
        sx={{
          width: "fit-content",
          background: shades.primary,
          color: "white",
          "&:hover": { background: shades.primary, color: "white" },
          borderRadius: "0",
          padding: "8px 24px",
          margin: "24px auto",
        }}
        onClick={() => scrollToElement("freshAndGreen")}
      >
        Shop Now
      </Button>
    </Grid>
  );
}

export default LandingSection;
