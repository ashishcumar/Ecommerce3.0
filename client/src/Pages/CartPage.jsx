import { Grid } from "@chakra-ui/react";
import React, { useEffect } from "react";
import Navbar from "../Components/Navbar";
import Cart from "../Components/Cart";
import Footer from "../Components/Footer";

function CartPage() {

  useEffect(() => {
    if (window?.ethereum) {
      window?.ethereum?.on("chainChanged", (chainId) => {
        window.location.reload();
      });
      window?.ethereum?.on("accountsChanged", (accounts) => {
        window.location.reload();
      });
    }
  }, [window?.ethereum]);

  return (
    <Grid>
      <Navbar />
      <Cart />
      <Footer />
    </Grid>
  );
}

export default CartPage;
