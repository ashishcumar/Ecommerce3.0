const { expect } = require("chai");
const { ethers } = require("hardhat");

const tokens = (n) => {
  return ethers.parseUnits(n.toString(), "ether");
};

const ID = 1;
const NAME = "Shoes";
const CATEGORY = "Clothing";
const IMAGE = "https://picsum.photos/200/300";
const COST = tokens(1);
const RATING = 4;
const STOCK = 5;

describe("Ecommerce", function () {
  let ecommerce;
  let deployer;
  let buyer;

  beforeEach(async () => {
    [deployer, buyer] = await ethers.getSigners();
    console.log("deployer and Buyer", {deployer}, {buyer});
    const Ecommerce = await ethers.getContractFactory("Ecommerce");
    ecommerce = await Ecommerce.deploy();
  });

  describe("deployment", () => {
    it("set the owner", async () => {
      const owner = await ecommerce.owner();
      expect(owner).to.equal(deployer.address);
    });
  });

  describe("listing", () => {
    let transaction;
    beforeEach(async () => {
      transaction = await ecommerce
        .connect(deployer)
        .list(ID, NAME, CATEGORY, IMAGE, COST, RATING, STOCK);
      await transaction.wait();
    });

    it("checking item attribute", async () => {
      const [_ID, _NAME, _CATEGORY, _IMAGE, _COST, _RATING, _STOCK] =
        await ecommerce.items(ID);
      expect(_ID).to.equal(ID);
      expect(_NAME).to.equal(NAME);
      expect(_CATEGORY).to.equal(CATEGORY);
      expect(_IMAGE).to.equal(IMAGE);
      expect(_COST).to.equal(COST);
      expect(_RATING).to.equal(RATING);
      expect(_STOCK).to.equal(STOCK);
    });

    it("emits list event", async () => {
      expect(transaction).to.emit(ecommerce, "List");
    });
  });

  // describe("add to cart", () => {
  //   let transaction;
  //   beforeEach(async () => {
  //     transaction = await ecommerce
  //       .connect(deployer)
  //       .list(ID, NAME, CATEGORY, IMAGE, COST, RATING, STOCK);
  //     // await transaction.wait();
  //     transaction = await ecommerce.connect(buyer).addToCart(ID);
  //     // await transaction.wait();
  //   });

  //   it("checking cart count", async () => {
  //     const cartArray = await ecommerce.cartList(buyer.address);
  //     expect(cartArray.length).to.equal(1);
  //   });
  // });

  describe("Buying", () => {
    let transaction;
    beforeEach(async () => {
      transaction = await ecommerce
        .connect(deployer)
        .list(ID, NAME, CATEGORY, IMAGE, COST, RATING, STOCK);
      await transaction.wait();

      transaction = await ecommerce.connect(buyer).buy(ID, { value: COST });
      await transaction.wait();
    });

    it("Updates the contract balance", async () => {
      const balance = await ethers.provider.getBalance(ecommerce.target);
      expect(balance).to.equal(COST);
    });

    it("Adds the order", async () => {
      const order = await ecommerce.orders(buyer.address, 1);
      expect(order.time).to.be.greaterThan(0);
      expect(order.item.name).to.equal(NAME);
    });

    it("update buyer's order count", async () => {
      const count = await ecommerce.orderCount(buyer.address);
      expect(count).to.equal(1);
    });

    it("emits buy event", async () => {
      expect(transaction).to.emit(ecommerce, "Buy");
    });
  });

  describe("Withdraw", () => {
    let transaction;
    beforeEach(async () => {
      transaction = await ecommerce
        .connect(deployer)
        .list(ID, NAME, CATEGORY, IMAGE, COST, RATING, STOCK);
      await transaction.wait();
      transaction = await ecommerce.connect(buyer).buy(ID, { value: COST });
      await transaction.wait();
      transaction = await ecommerce.connect(deployer).withdraw();
      await transaction.wait();
    });

    it("withdraw contract balance", async () => {
      const balance = await ethers.provider.getBalance(ecommerce.target);
      expect(balance).to.equal(0);
    });
  });
});
