import { Grid } from "@chakra-ui/react";
import React, { useEffect } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import Category from "../Components/Category";
import { useParams } from "react-router";

function CategoryPage() {

  const { type } = useParams();
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
      <Category type={type} />
      <Footer />
    </Grid>
  );
}

export default CategoryPage;
