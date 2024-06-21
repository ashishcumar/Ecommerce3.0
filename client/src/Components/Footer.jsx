import React from "react";
import { Grid, Box, Text, Flex } from "@chakra-ui/react";
import { shades } from "../helper/shades";
import logo from "../assets/logo.webp";
import { HiBuildingOffice } from "react-icons/hi2";
import { MdEmail } from "react-icons/md";
import { IoCall } from "react-icons/io5";

function Footer() {
  return (
    <Grid
      sx={{
        background: "white",
        padding: "48px 48px 24px 48px",
      }}
    >
      <Grid
        sx={{
          gridTemplateColumns: ["repeat(1,1fr)", "repeat(4,1fr)"],
        }}
      >
        <Box sx={{ padding: "24px" }}>
          <img
            src={logo}
            alt="logo"
            style={{ height: "80px", objectFit: "contain", margin: "12px 0" }}
          />
          <Text
            sx={{
              fontSize: "28px",
              fontWeight: "600",
              color: shades.text_dark,
            }}
          >
            Fresh. Green. Home
          </Text>
        </Box>
        <Box sx={{ padding: "24px" }}>
          {["Succulents", "House Plants", "Indoor Decor", "Air Purifying"].map(
            (item) => {
              return (
                <Text
                  key={item}
                  sx={{
                    fontSize: "14px",
                    fontWeight: "600",
                    margin: "8px 0",
                    color: shades.text_dark,
                  }}
                >
                  {item}
                </Text>
              );
            }
          )}
        </Box>
        <Box sx={{ padding: "24px" }}>
          {["Privacy Policy", "Refund", "Shipping"].map((item) => {
            return (
              <Text
                key={item}
                sx={{
                  fontSize: "14px",
                  fontWeight: "600",
                  margin: "8px 0",
                  color: shades.text_dark,
                }}
              >
                {item}
              </Text>
            );
          })}
        </Box>
        <Box sx={{ padding: "24px" }}>
          {[
            {
              icon: <HiBuildingOffice />,
              text: "Rohini, New Delhi, India",
              action: () => {},
            },
            {
              icon: <IoCall />,
              text: "+91 9540303720",
              action: () => {
                window.open("tel:+91 9540303720");
              },
            },
            {
              icon: <MdEmail />,
              text: "kumarashish87998@gmail.com",
              action: () => {
                window.open("mailto:kumarashish87998@gmail.com");
              },
            },
          ].map((item) => {
            return (
              <Flex
                sx={{ gap: "8px", margin: "8px 0", alignItems: "center" }}
                key={item.text}
              >
                {item.icon}
                <Text
                  sx={{
                    fontSize: "14px",
                    fontWeight: "600",
                    color: shades.text_dark,
                    cursor: "pointer",
                  }}
                  onClick={item.action}
                >
                  {item.text}
                </Text>
              </Flex>
            );
          })}
        </Box>
      </Grid>
      <Flex
        sx={{
          background: shades.secondary,
          padding: "12px",
          placeContent: "space-between",
        }}
      >
        <Text
          sx={{ fontSize: "14px", fontWeight: "600", color: shades.text_dark }}
        >
          Copyright © Plant Store 2024. All rights reserved.
        </Text>
        <Text
          sx={{ fontSize: "14px", fontWeight: "600", color: shades.text_dark }}
        >
          Created By Ashish
        </Text>
      </Flex>
    </Grid>
  );
}

export default Footer;
