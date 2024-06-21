// SPDX-License-Identifier: MIT

pragma solidity >=0.7.0 <0.9.0;

contract Ecommerce {
    address public owner;

    struct Item {
        uint256 Id;
        string name;
        string category;
        string image;
        uint256 cost;
        uint256 rating;
        uint256 stock;
    }

    struct Order {
        uint256 time;
        Item item;
    }

    struct Cart {
        uint256 count;
        Item item;
    }
    uint256 public itemCount;
    mapping(uint256 => Item) public items;
    mapping(address => uint256) public orderCount;
    mapping(address => mapping(uint256 => Order)) public orders;
    mapping(address => Cart[]) public cartList;
    mapping(address => mapping(uint256 => bool)) previousData;

    event List(string name, uint256 cost, uint256 stock);
    event Buy(address buyer, uint256 orderId, uint256 itemId);
    event AddToCart(address buyer, Item item);
    event RemoveFromCart(address buyer, Item item);

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can perform this action");
        _;
    }

    function list(
        uint256 _id,
        string memory _name,
        string memory _category,
        string memory _image,
        uint256 _cost,
        uint256 _rating,
        uint256 _stock
    ) public onlyOwner {
        Item memory item = Item(
            _id,
            _name,
            _category,
            _image,
            _cost,
            _rating,
            _stock
        );

        items[_id] = item;
        itemCount++;
        emit List(_name, _cost, _stock);
    }

    function addToCart(uint256 _id, uint256 _count) public {
        Item memory item = items[_id];
        require(item.stock > 0, "Out of Stock");
        if (previousData[msg.sender][_id] == true) {
            for (uint256 i = 0; i < cartList[msg.sender].length; i++) {
                if (cartList[msg.sender][i].item.Id == _id) {
                    cartList[msg.sender][i].count += _count;
                    cartList[msg.sender][i].item = item;
                }
            }
        } else {
            Cart memory cart = Cart(_count, item);
            cartList[msg.sender].push(cart);
            previousData[msg.sender][_id] = true;
        }
        emit AddToCart(msg.sender, item);
    }

    function getCartLength() public view returns (uint256) {
        return cartList[msg.sender].length;
    }

    function removeFromCart(uint256 _id) public {
        require(cartList[msg.sender].length > 0, "Cart is empty");
        for (uint256 i = 0; i < cartList[msg.sender].length; i++) {
            if (cartList[msg.sender][i].item.Id == _id) {
                require(
                    cartList[msg.sender][i].count > 0,
                    "Cart doesn't have this item"
                );
                cartList[msg.sender][i].count--;
                emit RemoveFromCart(msg.sender, cartList[msg.sender][i].item);
            }
        }
    }

    function checkout() public payable {
        uint256 totalCost = 0;
        Cart[] memory userCart = cartList[msg.sender];
        for (uint256 i = 0; i < userCart.length; i++) {
            Item memory item = userCart[i].item;
            uint256 count = userCart[i].count;
            require(
                item.stock >= count,
                "Insufficient stock for an item in the cart"
            );
            totalCost += item.cost * count;
        }
        require(
            msg.value >= totalCost,
            "Insufficient funds to complete the purchase"
        );

        for (uint256 i = 0; i < userCart.length; i++) {
            Item memory item = userCart[i].item;
            uint256 count = userCart[i].count;
            items[item.Id].stock -= count;
            for (uint256 j = 0; j < count; j++) {
                orderCount[msg.sender]++;
                orders[msg.sender][orderCount[msg.sender]] = Order(
                    block.timestamp,
                    item
                );
                emit Buy(msg.sender, orderCount[msg.sender], item.Id);
            }
        }

        // Clear the user's cart
        delete cartList[msg.sender];
    }

    function withdraw() public onlyOwner {
        (bool success, ) = owner.call{value: address(this).balance}("");
        require(success);
    }
}
