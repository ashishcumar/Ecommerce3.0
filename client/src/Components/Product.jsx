import React, { useEffect, useState } from "react";
import { Grid, Box, Text, Flex, Button } from "@chakra-ui/react";
import { shades } from "../helper/shades";
import ether from "../assets/ether.png";
import { PiMinus } from "react-icons/pi";
import { FiPlus } from "react-icons/fi";
import privacyProtected from "../assets/privacyProtected.png";
import secureCheckout from "../assets/secureCheckout.png";
import guarantedSatisfaction from "../assets/guarantedSatisfaction.png";
import useContractRef from "../customHooks/useContractRef";
import useShowToast from "../customHooks/useShowToast";

function Product({ productData }) {
  const { showToast } = useShowToast();
  const { getContract } = useContractRef();
  const [contract, setContract] = useState();
  const [quantity, setQuantity] = useState(1);

  const updateContract = async () => {
    const cnt = await getContract();
    setContract(cnt);
    return cnt;
  };

  const getCartData = async (cnt) => {
    try {
      console.log(cnt);
      const data = await cnt.getCartLength();
      console.log(data);
    } catch (error) {
      console.log("getCartData --> error", error);
    }
  };

  const listenToEventAddToCart = async () => {
    try {
      //  dispatch(setContractLoading(true));
      // Subscribe to the event
      contract.on("AddToCart", () => {
        // dispatch(setContractLoading(false));
        showToast({
          title: "Success!",
          description: "Added to cart",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      });
    } catch (error) {
      console.error("Error subscribing to event:", error);
    }
  };

  useEffect(() => {
    updateContract().then((cnt) => getCartData(cnt));
  }, []);

  useEffect(() => {
    if (contract) {
      listenToEventAddToCart();
    }

    return () => {
      if (contract) {
        contract.removeAllListeners("AddToCart");
      }
    };
  }, [contract]);

  const handleAddToCart = async () => {
    try {
      console.log("handleAddToCart called", contract);
      const transaction = await contract.addToCart(productData.id, quantity);
      // dispatch(setContractLoading(true));
      console.log("handleAddToCart -->", transaction);
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemoveFromCart = async () => {
    try {
      const transaction = await contract.removeFromCart(productData.id);
      console.log("handleRemoveFromCart -->", transaction);
    } catch (error) {
      console.log(error);
    }
  };

  const handeQuantity = (type) => {
    if (type === "add") {
      if (quantity < productData?.stock) {
        setQuantity(quantity + 1);
      } else {
        showToast({
          title: "Error!",
          description: "Can't add more items",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } else if (type === "remove") {
      if (quantity > 1) {
        setQuantity(quantity - 1);
      } else {
        showToast({
          title: "Error!",
          description: "Can't remove more items",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    }
  };

  const stockStr = () => {
    if (productData?.stock > 5) {
      return `Product available: ${productData.stock} units. Hurry, order now while stocks last!`;
    } else if (productData.stock > 0) {
      return `Only ${productData?.stock} units left in stock. Order soon before it runs out!`;
    } else {
      return "Sorry, this product is currently out of stock.";
    }
  };

  return (
    <Grid sx={{ padding: ["24px", "48px"] }}>
      <Grid sx={{ gridTemplateColumns: ["1fr", "5fr 5fr"] }}>
        <Box
          sx={{
            background: "#fcfcfc",
            border: `1px solid ${shades.secondary}`,
          }}
        >
          <img
            src={productData.image}
            alt={productData.name}
            style={{ height: "500px", objectFit: "contain", margin: "auto" }}
          />
        </Box>
        <Box sx={{ padding:["12px", "24px"] }}>
          <Text
            sx={{
              fontSize:["24px","28px"],
              fontWeight: "600",
              color: shades.text_dark,
            }}
          >
            {productData.name}
          </Text>
          <Text
            sx={{
              fontSize:["14px", "16px"],
              fontWeight: "600",
              color: productData?.stock > 0 ? shades.tertiary : "red",
              marginBottom: "12px",
            }}
          >
            {stockStr()}
          </Text>
          <Flex sx={{ gap: "8px", alignItems: "center", marginBottom: "12px" }}>
            <img
              src={ether}
              alt="ether"
              style={{ height: "24px", objectFit: "contain" }}
            />
            <Text
              sx={{
                fontSize: "28px",
                fontWeight: "600",
                color: shades.text_dark,
              }}
            >
              {productData?.cost} Eth
            </Text>
          </Flex>
          <Flex
            sx={{
              alignItems: "center",
              justifyContent: "space-between",
              gap: "24px",
              border: "1px solid black",
              width: "fit-content",
              borderRadius: "24px",
              padding: "4px 24px",
              marginBottom: "24px",
            }}
          >
            <Box
              sx={{ cursor: "pointer" }}
              onClick={() => handeQuantity("remove")}
            >
              <PiMinus fontSize={"22px"} />
            </Box>
            <Text
              sx={{
                fontSize: "20px",
                fontWeight: "400",
              }}
            >
              {quantity}
            </Text>
            <Box
              sx={{ cursor: "pointer" }}
              onClick={() => handeQuantity("add")}
            >
              <FiPlus fontSize={"20px"} />
            </Box>
          </Flex>
          <Flex sx={{ gap: "24px", margin: "24px 0 8px 0" }}>
            <Button
              // isLoading={contractLoading}
              sx={{
                background: shades.primary,
                color: "white",
                "&:hover": { background: shades.primary, color: "white" },
                padding: "12px 24px",
                borderRadius: "0",
              }}
              onClick={handleAddToCart}
            >
              Add to Cart
            </Button>
            <Button
              sx={{
                color: shades.primary,
                border: `1px solid ${shades.primary}`,
                padding: "12px 24px",
                background: "white",
                "&:hover": { background: "white", color: shades.primary },
                borderRadius: "0",
              }}
              // onClick={async () =>

              // }
            >
              Buy Now
            </Button>
          </Flex>
          <Flex sx={{ gap: "24px", margin: "24px 0 24px 0" }}>
            {[secureCheckout, privacyProtected, guarantedSatisfaction].map(
              (image) => {
                return (
                  <img
                    src={image}
                    alt="image"
                    style={{ height: "36px", objectFit: "contain" }}
                  />
                );
              }
            )}
          </Flex>
          <Text
            sx={{
              fontSize:["24px","28px"],
              fontWeight: "600",
              color: shades.text_dark,
              margin: "24px 0 12px 0",
            }}
          >
            Product Summary
          </Text>
          <Text sx={{ fontSize:["14px", "16px"], fontWeight: "400" }}>
            Discover the essence of nature with our exquisite collection of
            plants. Each plant in our store is meticulously curated to bring
            life and beauty to your space. Whether you're looking to brighten a
            corner with vibrant greens or create a serene oasis with delicate
            foliage, our plants are perfect for every environment. Enhance your
            home or office with the timeless elegance of nature's finest
            offerings. Explore our diverse range and find the ideal companion to
            complement your style and elevate your surroundings.
          </Text>
        </Box>
      </Grid>
    </Grid>
  );
}

export default Product;
