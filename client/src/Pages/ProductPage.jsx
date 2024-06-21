import { Grid } from "@chakra-ui/react";
import React, { useEffect } from "react";
import Navbar from "../Components/Navbar";
import Product from "../Components/Product";
import Footer from "../Components/Footer";
import { useParams } from "react-router";
import { useSelector } from "react-redux";

function ProductPage() {
  const { id } = useParams();
  const products = useSelector((state) => state.contractSlice?.products);
  const product = products?.find((item) => item.id == id);

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
      <Product productData={product} />
      <Footer />
    </Grid>
  );
}

export default ProductPage;
