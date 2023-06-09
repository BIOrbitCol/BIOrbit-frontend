/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PayableOverrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import { FunctionFragment, Result, EventFragment } from "@ethersproject/abi";
import { Listener, Provider } from "@ethersproject/providers";
import { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from "./common";

export declare namespace BIOrbit {
  export type ImageTimeSeriesStruct = {
    detectionDate: string[];
    forestCoverExtension: string[];
  };

  export type ImageTimeSeriesStructOutput = [string[], string[]] & {
    detectionDate: string[];
    forestCoverExtension: string[];
  };

  export type MonitoringStruct = {
    detectionDate: string;
    forestCoverExtension: string;
  };

  export type MonitoringStructOutput = [string, string] & {
    detectionDate: string;
    forestCoverExtension: string;
  };

  export type RentInfoStruct = { renter: string; expiry: BigNumberish };

  export type RentInfoStructOutput = [string, BigNumber] & {
    renter: string;
    expiry: BigNumber;
  };

  export type ProjectStruct = {
    id: BigNumberish;
    uri: string;
    state: BigNumberish;
    name: BytesLike;
    description: BytesLike;
    extension: BytesLike;
    footprint: string[][];
    country: BytesLike;
    owner: string;
    imageTimeSeries: BIOrbit.ImageTimeSeriesStruct;
    monitoring: BIOrbit.MonitoringStruct[];
    isRent: boolean;
    rentCost: BigNumberish;
    rentInfo: BIOrbit.RentInfoStruct[];
  };

  export type ProjectStructOutput = [
    BigNumber,
    string,
    number,
    string,
    string,
    string,
    string[][],
    string,
    string,
    BIOrbit.ImageTimeSeriesStructOutput,
    BIOrbit.MonitoringStructOutput[],
    boolean,
    BigNumber,
    BIOrbit.RentInfoStructOutput[]
  ] & {
    id: BigNumber;
    uri: string;
    state: number;
    name: string;
    description: string;
    extension: string;
    footprint: string[][];
    country: string;
    owner: string;
    imageTimeSeries: BIOrbit.ImageTimeSeriesStructOutput;
    monitoring: BIOrbit.MonitoringStructOutput[];
    isRent: boolean;
    rentCost: BigNumber;
    rentInfo: BIOrbit.RentInfoStructOutput[];
  };

  export type ProjectLiteStruct = {
    id: BigNumberish;
    state: BigNumberish;
    name: BytesLike;
    description: BytesLike;
    extension: BytesLike;
    footprint: string[][];
    country: BytesLike;
    owner: string;
    isRent: boolean;
    rentCost: BigNumberish;
  };

  export type ProjectLiteStructOutput = [
    BigNumber,
    number,
    string,
    string,
    string,
    string[][],
    string,
    string,
    boolean,
    BigNumber
  ] & {
    id: BigNumber;
    state: number;
    name: string;
    description: string;
    extension: string;
    footprint: string[][];
    country: string;
    owner: string;
    isRent: boolean;
    rentCost: BigNumber;
  };
}

export interface BIOrbitInterface extends utils.Interface {
  contractName: "BIOrbit";
  functions: {
    "Projects(uint256)": FunctionFragment;
    "approve(address,uint256)": FunctionFragment;
    "balanceOf(address)": FunctionFragment;
    "burnProject(uint256)": FunctionFragment;
    "getActiveRentingProjects()": FunctionFragment;
    "getApproved(uint256)": FunctionFragment;
    "getLatestData()": FunctionFragment;
    "getProjectsByOwner()": FunctionFragment;
    "getProjectsNotOwnedWithoutRent()": FunctionFragment;
    "isApprovedForAll(address,address)": FunctionFragment;
    "mintProject(bytes32,bytes32,bytes32,string[][],bytes32,bool)": FunctionFragment;
    "name()": FunctionFragment;
    "ownerOf(uint256)": FunctionFragment;
    "projectIdCounter()": FunctionFragment;
    "rentProject(uint256)": FunctionFragment;
    "rentTime()": FunctionFragment;
    "safeTransferFrom(address,address,uint256)": FunctionFragment;
    "setApprovalForAll(address,bool)": FunctionFragment;
    "setDescription(uint256,bytes32)": FunctionFragment;
    "setIsRent(uint256)": FunctionFragment;
    "setName(uint256,bytes32)": FunctionFragment;
    "setRentCost(uint256)": FunctionFragment;
    "setTokenURI(string[],string[],uint256,string)": FunctionFragment;
    "supportsInterface(bytes4)": FunctionFragment;
    "symbol()": FunctionFragment;
    "tokenURI(uint256)": FunctionFragment;
    "transferFrom(address,address,uint256)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "Projects",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "approve",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "balanceOf", values: [string]): string;
  encodeFunctionData(
    functionFragment: "burnProject",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getActiveRentingProjects",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getApproved",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getLatestData",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getProjectsByOwner",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getProjectsNotOwnedWithoutRent",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "isApprovedForAll",
    values: [string, string]
  ): string;
  encodeFunctionData(
    functionFragment: "mintProject",
    values: [BytesLike, BytesLike, BytesLike, string[][], BytesLike, boolean]
  ): string;
  encodeFunctionData(functionFragment: "name", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "ownerOf",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "projectIdCounter",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "rentProject",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "rentTime", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "safeTransferFrom",
    values: [string, string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "setApprovalForAll",
    values: [string, boolean]
  ): string;
  encodeFunctionData(
    functionFragment: "setDescription",
    values: [BigNumberish, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "setIsRent",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "setName",
    values: [BigNumberish, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "setRentCost",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "setTokenURI",
    values: [string[], string[], BigNumberish, string]
  ): string;
  encodeFunctionData(
    functionFragment: "supportsInterface",
    values: [BytesLike]
  ): string;
  encodeFunctionData(functionFragment: "symbol", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "tokenURI",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "transferFrom",
    values: [string, string, BigNumberish]
  ): string;

  decodeFunctionResult(functionFragment: "Projects", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "approve", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "balanceOf", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "burnProject",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getActiveRentingProjects",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getApproved",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getLatestData",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getProjectsByOwner",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getProjectsNotOwnedWithoutRent",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "isApprovedForAll",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "mintProject",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "name", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "ownerOf", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "projectIdCounter",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "rentProject",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "rentTime", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "safeTransferFrom",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setApprovalForAll",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setDescription",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "setIsRent", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "setName", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "setRentCost",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setTokenURI",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "supportsInterface",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "symbol", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "tokenURI", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "transferFrom",
    data: BytesLike
  ): Result;

  events: {
    "Approval(address,address,uint256)": EventFragment;
    "ApprovalForAll(address,address,bool)": EventFragment;
    "BatchMetadataUpdate(uint256,uint256)": EventFragment;
    "MetadataUpdate(uint256)": EventFragment;
    "ProjectCreated(uint256,uint8,bytes32,bytes32,bytes32,string[][],bytes32,address,bool,uint256)": EventFragment;
    "Transfer(address,address,uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "Approval"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "ApprovalForAll"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "BatchMetadataUpdate"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "MetadataUpdate"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "ProjectCreated"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Transfer"): EventFragment;
}

export type ApprovalEvent = TypedEvent<
  [string, string, BigNumber],
  { owner: string; approved: string; tokenId: BigNumber }
>;

export type ApprovalEventFilter = TypedEventFilter<ApprovalEvent>;

export type ApprovalForAllEvent = TypedEvent<
  [string, string, boolean],
  { owner: string; operator: string; approved: boolean }
>;

export type ApprovalForAllEventFilter = TypedEventFilter<ApprovalForAllEvent>;

export type BatchMetadataUpdateEvent = TypedEvent<
  [BigNumber, BigNumber],
  { _fromTokenId: BigNumber; _toTokenId: BigNumber }
>;

export type BatchMetadataUpdateEventFilter =
  TypedEventFilter<BatchMetadataUpdateEvent>;

export type MetadataUpdateEvent = TypedEvent<
  [BigNumber],
  { _tokenId: BigNumber }
>;

export type MetadataUpdateEventFilter = TypedEventFilter<MetadataUpdateEvent>;

export type ProjectCreatedEvent = TypedEvent<
  [
    BigNumber,
    number,
    string,
    string,
    string,
    string[][],
    string,
    string,
    boolean,
    BigNumber
  ],
  {
    id: BigNumber;
    state: number;
    name: string;
    description: string;
    extension: string;
    footprint: string[][];
    country: string;
    owner: string;
    isRent: boolean;
    rent: BigNumber;
  }
>;

export type ProjectCreatedEventFilter = TypedEventFilter<ProjectCreatedEvent>;

export type TransferEvent = TypedEvent<
  [string, string, BigNumber],
  { from: string; to: string; tokenId: BigNumber }
>;

export type TransferEventFilter = TypedEventFilter<TransferEvent>;

export interface BIOrbit extends BaseContract {
  contractName: "BIOrbit";
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: BIOrbitInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    Projects(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [
        BigNumber,
        string,
        number,
        string,
        string,
        string,
        string,
        string,
        BIOrbit.ImageTimeSeriesStructOutput,
        boolean,
        BigNumber
      ] & {
        id: BigNumber;
        uri: string;
        state: number;
        name: string;
        description: string;
        extension: string;
        country: string;
        owner: string;
        imageTimeSeries: BIOrbit.ImageTimeSeriesStructOutput;
        isRent: boolean;
        rentCost: BigNumber;
      }
    >;

    approve(
      to: string,
      tokenId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    balanceOf(owner: string, overrides?: CallOverrides): Promise<[BigNumber]>;

    burnProject(
      _projectId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    getActiveRentingProjects(
      overrides?: CallOverrides
    ): Promise<[BIOrbit.ProjectStructOutput[]]>;

    getApproved(
      tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[string]>;

    getLatestData(overrides?: CallOverrides): Promise<[BigNumber]>;

    getProjectsByOwner(
      overrides?: CallOverrides
    ): Promise<[BIOrbit.ProjectStructOutput[]]>;

    getProjectsNotOwnedWithoutRent(
      overrides?: CallOverrides
    ): Promise<[BIOrbit.ProjectLiteStructOutput[]]>;

    isApprovedForAll(
      owner: string,
      operator: string,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    mintProject(
      _name: BytesLike,
      _description: BytesLike,
      _extension: BytesLike,
      _footprint: string[][],
      _country: BytesLike,
      _isRent: boolean,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    name(overrides?: CallOverrides): Promise<[string]>;

    ownerOf(
      tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[string]>;

    projectIdCounter(
      overrides?: CallOverrides
    ): Promise<[BigNumber] & { _value: BigNumber }>;

    rentProject(
      _projectId: BigNumberish,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    rentTime(overrides?: CallOverrides): Promise<[BigNumber]>;

    "safeTransferFrom(address,address,uint256)"(
      from: string,
      to: string,
      _projectId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    "safeTransferFrom(address,address,uint256,bytes)"(
      from: string,
      to: string,
      _projectId: BigNumberish,
      _data: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setApprovalForAll(
      operator: string,
      approved: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setDescription(
      _projectId: BigNumberish,
      _description: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setIsRent(
      _projectId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setName(
      _projectId: BigNumberish,
      _name: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setRentCost(
      _projectId: BigNumberish,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setTokenURI(
      _detectionDate: string[],
      _forestCoverExtension: string[],
      _projectId: BigNumberish,
      _projectURI: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    supportsInterface(
      interfaceId: BytesLike,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    symbol(overrides?: CallOverrides): Promise<[string]>;

    tokenURI(
      _projectId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[string]>;

    transferFrom(
      from: string,
      to: string,
      _projectId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  Projects(
    arg0: BigNumberish,
    overrides?: CallOverrides
  ): Promise<
    [
      BigNumber,
      string,
      number,
      string,
      string,
      string,
      string,
      string,
      BIOrbit.ImageTimeSeriesStructOutput,
      boolean,
      BigNumber
    ] & {
      id: BigNumber;
      uri: string;
      state: number;
      name: string;
      description: string;
      extension: string;
      country: string;
      owner: string;
      imageTimeSeries: BIOrbit.ImageTimeSeriesStructOutput;
      isRent: boolean;
      rentCost: BigNumber;
    }
  >;

  approve(
    to: string,
    tokenId: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  balanceOf(owner: string, overrides?: CallOverrides): Promise<BigNumber>;

  burnProject(
    _projectId: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  getActiveRentingProjects(
    overrides?: CallOverrides
  ): Promise<BIOrbit.ProjectStructOutput[]>;

  getApproved(
    tokenId: BigNumberish,
    overrides?: CallOverrides
  ): Promise<string>;

  getLatestData(overrides?: CallOverrides): Promise<BigNumber>;

  getProjectsByOwner(
    overrides?: CallOverrides
  ): Promise<BIOrbit.ProjectStructOutput[]>;

  getProjectsNotOwnedWithoutRent(
    overrides?: CallOverrides
  ): Promise<BIOrbit.ProjectLiteStructOutput[]>;

  isApprovedForAll(
    owner: string,
    operator: string,
    overrides?: CallOverrides
  ): Promise<boolean>;

  mintProject(
    _name: BytesLike,
    _description: BytesLike,
    _extension: BytesLike,
    _footprint: string[][],
    _country: BytesLike,
    _isRent: boolean,
    overrides?: PayableOverrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  name(overrides?: CallOverrides): Promise<string>;

  ownerOf(tokenId: BigNumberish, overrides?: CallOverrides): Promise<string>;

  projectIdCounter(overrides?: CallOverrides): Promise<BigNumber>;

  rentProject(
    _projectId: BigNumberish,
    overrides?: PayableOverrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  rentTime(overrides?: CallOverrides): Promise<BigNumber>;

  "safeTransferFrom(address,address,uint256)"(
    from: string,
    to: string,
    _projectId: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  "safeTransferFrom(address,address,uint256,bytes)"(
    from: string,
    to: string,
    _projectId: BigNumberish,
    _data: BytesLike,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setApprovalForAll(
    operator: string,
    approved: boolean,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setDescription(
    _projectId: BigNumberish,
    _description: BytesLike,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setIsRent(
    _projectId: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setName(
    _projectId: BigNumberish,
    _name: BytesLike,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setRentCost(
    _projectId: BigNumberish,
    overrides?: PayableOverrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setTokenURI(
    _detectionDate: string[],
    _forestCoverExtension: string[],
    _projectId: BigNumberish,
    _projectURI: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  supportsInterface(
    interfaceId: BytesLike,
    overrides?: CallOverrides
  ): Promise<boolean>;

  symbol(overrides?: CallOverrides): Promise<string>;

  tokenURI(
    _projectId: BigNumberish,
    overrides?: CallOverrides
  ): Promise<string>;

  transferFrom(
    from: string,
    to: string,
    _projectId: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    Projects(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [
        BigNumber,
        string,
        number,
        string,
        string,
        string,
        string,
        string,
        BIOrbit.ImageTimeSeriesStructOutput,
        boolean,
        BigNumber
      ] & {
        id: BigNumber;
        uri: string;
        state: number;
        name: string;
        description: string;
        extension: string;
        country: string;
        owner: string;
        imageTimeSeries: BIOrbit.ImageTimeSeriesStructOutput;
        isRent: boolean;
        rentCost: BigNumber;
      }
    >;

    approve(
      to: string,
      tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    balanceOf(owner: string, overrides?: CallOverrides): Promise<BigNumber>;

    burnProject(
      _projectId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    getActiveRentingProjects(
      overrides?: CallOverrides
    ): Promise<BIOrbit.ProjectStructOutput[]>;

    getApproved(
      tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<string>;

    getLatestData(overrides?: CallOverrides): Promise<BigNumber>;

    getProjectsByOwner(
      overrides?: CallOverrides
    ): Promise<BIOrbit.ProjectStructOutput[]>;

    getProjectsNotOwnedWithoutRent(
      overrides?: CallOverrides
    ): Promise<BIOrbit.ProjectLiteStructOutput[]>;

    isApprovedForAll(
      owner: string,
      operator: string,
      overrides?: CallOverrides
    ): Promise<boolean>;

    mintProject(
      _name: BytesLike,
      _description: BytesLike,
      _extension: BytesLike,
      _footprint: string[][],
      _country: BytesLike,
      _isRent: boolean,
      overrides?: CallOverrides
    ): Promise<void>;

    name(overrides?: CallOverrides): Promise<string>;

    ownerOf(tokenId: BigNumberish, overrides?: CallOverrides): Promise<string>;

    projectIdCounter(overrides?: CallOverrides): Promise<BigNumber>;

    rentProject(
      _projectId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    rentTime(overrides?: CallOverrides): Promise<BigNumber>;

    "safeTransferFrom(address,address,uint256)"(
      from: string,
      to: string,
      _projectId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    "safeTransferFrom(address,address,uint256,bytes)"(
      from: string,
      to: string,
      _projectId: BigNumberish,
      _data: BytesLike,
      overrides?: CallOverrides
    ): Promise<void>;

    setApprovalForAll(
      operator: string,
      approved: boolean,
      overrides?: CallOverrides
    ): Promise<void>;

    setDescription(
      _projectId: BigNumberish,
      _description: BytesLike,
      overrides?: CallOverrides
    ): Promise<void>;

    setIsRent(
      _projectId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    setName(
      _projectId: BigNumberish,
      _name: BytesLike,
      overrides?: CallOverrides
    ): Promise<void>;

    setRentCost(
      _projectId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    setTokenURI(
      _detectionDate: string[],
      _forestCoverExtension: string[],
      _projectId: BigNumberish,
      _projectURI: string,
      overrides?: CallOverrides
    ): Promise<void>;

    supportsInterface(
      interfaceId: BytesLike,
      overrides?: CallOverrides
    ): Promise<boolean>;

    symbol(overrides?: CallOverrides): Promise<string>;

    tokenURI(
      _projectId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<string>;

    transferFrom(
      from: string,
      to: string,
      _projectId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {
    "Approval(address,address,uint256)"(
      owner?: string | null,
      approved?: string | null,
      tokenId?: BigNumberish | null
    ): ApprovalEventFilter;
    Approval(
      owner?: string | null,
      approved?: string | null,
      tokenId?: BigNumberish | null
    ): ApprovalEventFilter;

    "ApprovalForAll(address,address,bool)"(
      owner?: string | null,
      operator?: string | null,
      approved?: null
    ): ApprovalForAllEventFilter;
    ApprovalForAll(
      owner?: string | null,
      operator?: string | null,
      approved?: null
    ): ApprovalForAllEventFilter;

    "BatchMetadataUpdate(uint256,uint256)"(
      _fromTokenId?: null,
      _toTokenId?: null
    ): BatchMetadataUpdateEventFilter;
    BatchMetadataUpdate(
      _fromTokenId?: null,
      _toTokenId?: null
    ): BatchMetadataUpdateEventFilter;

    "MetadataUpdate(uint256)"(_tokenId?: null): MetadataUpdateEventFilter;
    MetadataUpdate(_tokenId?: null): MetadataUpdateEventFilter;

    "ProjectCreated(uint256,uint8,bytes32,bytes32,bytes32,string[][],bytes32,address,bool,uint256)"(
      id?: null,
      state?: null,
      name?: null,
      description?: null,
      extension?: null,
      footprint?: null,
      country?: null,
      owner?: null,
      isRent?: null,
      rent?: null
    ): ProjectCreatedEventFilter;
    ProjectCreated(
      id?: null,
      state?: null,
      name?: null,
      description?: null,
      extension?: null,
      footprint?: null,
      country?: null,
      owner?: null,
      isRent?: null,
      rent?: null
    ): ProjectCreatedEventFilter;

    "Transfer(address,address,uint256)"(
      from?: string | null,
      to?: string | null,
      tokenId?: BigNumberish | null
    ): TransferEventFilter;
    Transfer(
      from?: string | null,
      to?: string | null,
      tokenId?: BigNumberish | null
    ): TransferEventFilter;
  };

  estimateGas: {
    Projects(arg0: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

    approve(
      to: string,
      tokenId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    balanceOf(owner: string, overrides?: CallOverrides): Promise<BigNumber>;

    burnProject(
      _projectId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    getActiveRentingProjects(overrides?: CallOverrides): Promise<BigNumber>;

    getApproved(
      tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getLatestData(overrides?: CallOverrides): Promise<BigNumber>;

    getProjectsByOwner(overrides?: CallOverrides): Promise<BigNumber>;

    getProjectsNotOwnedWithoutRent(
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    isApprovedForAll(
      owner: string,
      operator: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    mintProject(
      _name: BytesLike,
      _description: BytesLike,
      _extension: BytesLike,
      _footprint: string[][],
      _country: BytesLike,
      _isRent: boolean,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    name(overrides?: CallOverrides): Promise<BigNumber>;

    ownerOf(
      tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    projectIdCounter(overrides?: CallOverrides): Promise<BigNumber>;

    rentProject(
      _projectId: BigNumberish,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    rentTime(overrides?: CallOverrides): Promise<BigNumber>;

    "safeTransferFrom(address,address,uint256)"(
      from: string,
      to: string,
      _projectId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    "safeTransferFrom(address,address,uint256,bytes)"(
      from: string,
      to: string,
      _projectId: BigNumberish,
      _data: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setApprovalForAll(
      operator: string,
      approved: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setDescription(
      _projectId: BigNumberish,
      _description: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setIsRent(
      _projectId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setName(
      _projectId: BigNumberish,
      _name: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setRentCost(
      _projectId: BigNumberish,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setTokenURI(
      _detectionDate: string[],
      _forestCoverExtension: string[],
      _projectId: BigNumberish,
      _projectURI: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    supportsInterface(
      interfaceId: BytesLike,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    symbol(overrides?: CallOverrides): Promise<BigNumber>;

    tokenURI(
      _projectId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    transferFrom(
      from: string,
      to: string,
      _projectId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    Projects(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    approve(
      to: string,
      tokenId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    balanceOf(
      owner: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    burnProject(
      _projectId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    getActiveRentingProjects(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getApproved(
      tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getLatestData(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getProjectsByOwner(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getProjectsNotOwnedWithoutRent(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    isApprovedForAll(
      owner: string,
      operator: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    mintProject(
      _name: BytesLike,
      _description: BytesLike,
      _extension: BytesLike,
      _footprint: string[][],
      _country: BytesLike,
      _isRent: boolean,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    name(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    ownerOf(
      tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    projectIdCounter(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    rentProject(
      _projectId: BigNumberish,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    rentTime(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "safeTransferFrom(address,address,uint256)"(
      from: string,
      to: string,
      _projectId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    "safeTransferFrom(address,address,uint256,bytes)"(
      from: string,
      to: string,
      _projectId: BigNumberish,
      _data: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setApprovalForAll(
      operator: string,
      approved: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setDescription(
      _projectId: BigNumberish,
      _description: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setIsRent(
      _projectId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setName(
      _projectId: BigNumberish,
      _name: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setRentCost(
      _projectId: BigNumberish,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setTokenURI(
      _detectionDate: string[],
      _forestCoverExtension: string[],
      _projectId: BigNumberish,
      _projectURI: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    supportsInterface(
      interfaceId: BytesLike,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    symbol(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    tokenURI(
      _projectId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    transferFrom(
      from: string,
      to: string,
      _projectId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}
