import { AbiRegistry, Address, SmartContract } from "@multiversx/sdk-core/out";

import abiJson from "./rug-royalties.abi.json";

const abiRegistry = AbiRegistry.create(abiJson);
const rugContract = new SmartContract({
  address: new Address("erd1qqqqqqqqqqqqqpgqkraxy5tk5rtdpu4e4svxr2u3wspqs2knks0s6jcx33"),
  abi: abiRegistry,
});
export default rugContract;