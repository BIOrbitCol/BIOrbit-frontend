/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import { Provider } from "@ethersproject/providers";
import type {
  DataFeedsInterface,
  DataFeedsInterfaceInterface,
} from "../DataFeedsInterface";

const _abi = [
  {
    inputs: [],
    name: "getLatestData",
    outputs: [
      {
        internalType: "int256",
        name: "",
        type: "int256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

export class DataFeedsInterface__factory {
  static readonly abi = _abi;
  static createInterface(): DataFeedsInterfaceInterface {
    return new utils.Interface(_abi) as DataFeedsInterfaceInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): DataFeedsInterface {
    return new Contract(address, _abi, signerOrProvider) as DataFeedsInterface;
  }
}