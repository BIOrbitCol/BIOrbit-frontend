/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  DataConsumerV3,
  DataConsumerV3Interface,
} from "../DataConsumerV3";

const _abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
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

const _bytecode =
  "0x608060405234801561001057600080fd5b50600080546001600160a01b03191673d0d5e3db44de05e9f294bb0a3beeaf030de24ada1790556101bb806100466000396000f3fe608060405234801561001057600080fd5b506004361061002b5760003560e01c8063ab757d6114610030575b600080fd5b61003861004e565b60405161004591906100c7565b60405180910390f35b6000805460408051633fabe5a360e21b8152905183926001600160a01b03169163feaf968c9160048083019260a09291908290030181865afa158015610098573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906100bc919061010d565b509195945050505050565b818152602081015b92915050565b69ffffffffffffffffffff81165b81146100ee57600080fd5b50565b80516100cf816100d5565b806100e3565b80516100cf816100fc565b600080600080600060a0868803121561012857610128600080fd5b600061013488886100f1565b955050602061014588828901610102565b945050604061015688828901610102565b935050606061016788828901610102565b9250506080610178888289016100f1565b915050929550929590935056fea26469706673582212205cb3a67f3865ab388edc9c9a232e4bddb39779b5f7f3e4f7ee0686748c6c968f64736f6c63430008110033";

type DataConsumerV3ConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: DataConsumerV3ConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class DataConsumerV3__factory extends ContractFactory {
  constructor(...args: DataConsumerV3ConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
    this.contractName = "DataConsumerV3";
  }

  deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<DataConsumerV3> {
    return super.deploy(overrides || {}) as Promise<DataConsumerV3>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): DataConsumerV3 {
    return super.attach(address) as DataConsumerV3;
  }
  connect(signer: Signer): DataConsumerV3__factory {
    return super.connect(signer) as DataConsumerV3__factory;
  }
  static readonly contractName: "DataConsumerV3";
  public readonly contractName: "DataConsumerV3";
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): DataConsumerV3Interface {
    return new utils.Interface(_abi) as DataConsumerV3Interface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): DataConsumerV3 {
    return new Contract(address, _abi, signerOrProvider) as DataConsumerV3;
  }
}