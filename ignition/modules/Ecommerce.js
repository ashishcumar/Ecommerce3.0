const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");
const { plantJson } = require("./plantJson");
const { ethers } = require("hardhat");
const tokens = (n) => {
  return ethers.parseUnits(n.toString(), "ether");
};
module.exports = buildModule("Ecommerce", (m) => {
  console.log(m)
  const ecommerce = m.contract("Ecommerce", []);

  plantJson.forEach((item) => {
    m.call(
      ecommerce,
      "list",
      [
        item.id,
        item.name,
        item.category,
        item.image,
        tokens(item.cost),
        item.rating,
        item.stock,
      ],
      { id: `Ecommerce_list_${item.id}` }
    );
  });

  return { ecommerce };
});
