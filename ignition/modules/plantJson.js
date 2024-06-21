const plantJson = [
  {
    id: 1,
    name: "Cloud Farm Bougainvillea",
    category: "House Plants",
    image:
      "https://gateway.pinata.cloud/ipfs/QmUyCr1qyhi1tGGyeR1HjZqtbMEqbZWEFNNpH5eTARZoXD",
    cost: "1",
    rating: 4,
    stock: 50,
  },
  {
    id: 2,
    name: "Urban Jungle Indoor",
    category: "House Plants",
    image:
      "https://gateway.pinata.cloud/ipfs/QmZj8fXkz6TKgYZGXJnsuYFJsX9wujgP93m1VMS7x2eTEK",
    cost: "1.2",
    rating: 4,
    stock: 50,
  },
  {
    id: 3,
    name: "Monstera deliciosa",
    category: "House Plants",
    image:
      "https://gateway.pinata.cloud/ipfs/QmSS82Mc67BrU2QWxQwKJBB5YFWBpsZWQpp7y9us9srQt5",
    cost: "0.98",
    rating: 2,
    stock: 50,
  },
  {
    id: 4,
    name: "Ceramic Planters",
    category: "House Plants",
    image:
      "https://gateway.pinata.cloud/ipfs/QmSMRRFPoTcNMNGC1WKNAiigq49BkBRSVSVC4bDJ9PTqCk",
    cost: "1",
    rating: 5,
    stock: 50,
  },
  {
    id: 5,
    name: "Ceramic Little Leggy Planter",
    category: "House Plants",
    image:
      "https://gateway.pinata.cloud/ipfs/QmRKpzUdRra9boaNaM21WRQYsMBTnMgRvj15TJU6u2vRYn",
    cost: "1.89",
    rating: 4,
    stock: 50,
  },
  {
    id: 6,
    name: "Fittonia Green Plant",
    category: "House Plants",
    image:
      "https://gateway.pinata.cloud/ipfs/QmaYLReq7RV7uRCnEfuH5gybAgdzVXe78tPXMvjY43HQMR",
    cost: "0.70",
    rating: 4,
    stock: 50,
  },
  {
    id: 7,
    name: "Cloud Farm Areca",
    category: "House Plants",
    image:
      "https://gateway.pinata.cloud/ipfs/QmcYfNWZ1Rbnmvvvp6iUnKYQDT3BQmZawPWUMJkQe3c6Ws",
    cost: "3",
    rating: 5,
    stock: 50,
  },
  {
    id: 8,
    name: "Italian Stone Pine",
    category: "House Plants",
    image:
      "https://gateway.pinata.cloud/ipfs/QmdsAMMATmLehUKNepLm3jzNyA4RUotBsZJBRqy1KT8BNY",
    cost: "3.4",
    rating: 4,
    stock: 50,
  },
  {
    id: 9,
    name: "Cloud Farm Peace Lily Plant",
    category: "House Plants",
    image:
      "https://gateway.pinata.cloud/ipfs/QmUDoj8juT4FVaraKaiYYJk7VFmpFSGsCUMvTQEv8Zq7E5",
    cost: "2.5",
    rating: 5,
    stock: 50,
  },
  {
    id: 10,
    name: "Cloud Farm Peace Lily Plant",
    category: "Office Plants",
    image:
      "https://gateway.pinata.cloud/ipfs/QmUDoj8juT4FVaraKaiYYJk7VFmpFSGsCUMvTQEv8Zq7E5",
    cost: "4.5",
    rating: 1,
    stock: 50,
  },
  {
    id: 11,
    name: "Italian Stone Pine",
    category: "Office Plants",
    image:
      "https://gateway.pinata.cloud/ipfs/QmdsAMMATmLehUKNepLm3jzNyA4RUotBsZJBRqy1KT8BNY",
    cost: "2.4",
    rating: 4,
    stock: 50,
  },
  {
    id: 12,
    name: "Cloud Farm Areca",
    category: "Office Plants",
    image:
      "https://gateway.pinata.cloud/ipfs/QmcYfNWZ1Rbnmvvvp6iUnKYQDT3BQmZawPWUMJkQe3c6Ws",
    cost: "3",
    rating: 1,
    stock: 50,
  },
  {
    id: 13,
    name: "Fittonia Green Plant",
    category: "Office Plants",
    image:
      "https://gateway.pinata.cloud/ipfs/QmaYLReq7RV7uRCnEfuH5gybAgdzVXe78tPXMvjY43HQMR",
    cost: "2.70",
    rating: 2,
    stock: 50,
  },
  {
    id: 14,
    name: "Ceramic Little Leggy Planter",
    category: "Office Plants",
    image:
      "https://gateway.pinata.cloud/ipfs/QmRKpzUdRra9boaNaM21WRQYsMBTnMgRvj15TJU6u2vRYn",
    cost: "1.89",
    rating: 4,
    stock: 50,
  },
  {
    id: 15,
    name: "Ceramic Planters",
    category: "Office Plants",
    image:
      "https://gateway.pinata.cloud/ipfs/QmSMRRFPoTcNMNGC1WKNAiigq49BkBRSVSVC4bDJ9PTqCk",
    cost: "1",
    rating: 0,
    stock: 50,
  },
  {
    id: 16,
    name: "Monstera deliciosa",
    category: "Office Plants",
    image:
      "https://gateway.pinata.cloud/ipfs/QmSS82Mc67BrU2QWxQwKJBB5YFWBpsZWQpp7y9us9srQt5",
    cost: "3.98",
    rating: 1,
    stock: 50,
  },
  {
    id: 17,
    name: "Urban Jungle Indoor",
    category: "Office Plants",
    image:
      "https://gateway.pinata.cloud/ipfs/QmZj8fXkz6TKgYZGXJnsuYFJsX9wujgP93m1VMS7x2eTEK",
    cost: "3.6",
    rating: 5,
    stock: 50,
  },
  {
    id: 18,
    name: "Cloud Farm Bougainvillea",
    category: "Office Plants",
    image:
      "https://gateway.pinata.cloud/ipfs/QmUyCr1qyhi1tGGyeR1HjZqtbMEqbZWEFNNpH5eTARZoXD",
    cost: "2.8",
    rating: 4,
    stock: 50,
  },
  {
    id: 19,
    name: "Crassula Jade plant",
    category: "Office Plants",
    image:
      "https://gateway.pinata.cloud/ipfs/QmZeUfViyVeZZZ1bSBxSGWHXWckKQBhU7979KjuNbBBhnb",
    cost: "3.8",
    rating: 3,
    stock: 50,
  },
  {
    id: 20,
    name: "Crassula ovata plant",
    category: "House Plants",
    image:
      "https://gateway.pinata.cloud/ipfs/QmZZuNNr1yxHUw3cgNRqaKpsXojFVAm86voV5vmhZUUDBo",
    cost: "2.5",
    rating: 4,
    stock: 50,
  },
];

module.exports = { plantJson };
