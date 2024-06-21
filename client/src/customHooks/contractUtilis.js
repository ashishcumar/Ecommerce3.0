import { weiToEth } from "./conversion";

export const parseToObject = (objectRef, contractRes) => {
  if (
    Object.keys(objectRef).length === 0 ||
    Object.keys(contractRes).length === 0
  )
    return;
  const response = {};
  const refKeys = Object.keys(objectRef);
  Object.keys(contractRes).forEach((key) => {
    response[refKeys[key]] =
      typeof contractRes[key] === "bigint"
        ? Number(contractRes[key])
        :  contractRes[key] 
  });
  if (response.cost) {
    response.cost = weiToEth(response.cost);
  }

  return response;
};
