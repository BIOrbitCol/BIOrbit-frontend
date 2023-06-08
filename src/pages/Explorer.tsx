import Menu from '@/components/Menu'
import Wallet from '@/components/Wallet'
import {
	Footprint,
	ImageTimeSeries,
	Monitoring,
	MonitoringArea,
	RentInfo
} from '@/assets/models/monitoring-area.model'
import dynamic from 'next/dynamic'
import React, { useEffect, useRef, useState } from 'react'
import * as L from 'leaflet'
import { Contract, ethers } from 'ethers'
import BIOrbitContractJson from '@/assets/contracts/BIOrbit.json'
import { useAccount, useContractRead, useWalletClient } from 'wagmi'
import { BIOrbit } from '../../@types/typechain-types'

const MapWithNoSSR = dynamic(() => import('../components/Map'), {
	ssr: false
})

export default function Explorer(): JSX.Element {
	const polygonRef = useRef<L.FeatureGroup | null>(null)

	const [biorbitContract, setBiorbitContract] = useState<BIOrbit | null>(null)
	const [coordinates, setCoordinates] = useState<number[][]>([])
	const [filtedProjects, setFiltedProjects] = useState<MonitoringArea[]>([])
	const [isLoading, setIsLoading] = useState<boolean>(true)
	const [page, setPage] = useState<number>(0)
	const [projects, setProjects] = useState<MonitoringArea[]>([])
	const [projectsNotOwned, setProjectsNotOwned] = useState<MonitoringArea[]>([])
	const [selectedId, setSelectedId] = useState<number | null>(null)
	const [showDrawControl, setShowDrawControl] = useState<boolean>(false)
	const [sincronized, setSincronized] = useState<boolean>(true)
	const [provider, setProvider] =
		useState<ethers.providers.Web3Provider | null>(null)
	const [signer, setSigner] = useState<ethers.providers.JsonRpcSigner | null>(
		null
	)
	const [total, setTotal] = useState<number>(0)

	const pageSize: number = 50

	const { address } = useAccount()

	const fetchData = async () => {
		try {
			let contract: BIOrbit | null = null

			if (!provider) {
				const ethereum = (window as any).ethereum

				const web3Provider = new ethers.providers.Web3Provider(ethereum)
				await web3Provider.send('eth_requestAccounts', [])
				const web3Signer = web3Provider.getSigner()

				contract = new Contract(
					BIOrbitContractJson.address,
					BIOrbitContractJson.abi,
					web3Signer
				) as BIOrbit

				setProvider(web3Provider)
				setSigner(web3Signer)
				setBiorbitContract(contract)
			} else {
				contract = biorbitContract
			}

			if (contract) {
				const myProjects = convertToMonitoringArea(
					await contract.getProjectsByOwner()
				)

				const myRentProject = convertToMonitoringArea(
					await contract.getActiveRentingProjects()
				)

				const myNotProjects = convertToMonitoringArea(
					await contract.getProjectsNotOwnedWithoutRent()
				)

				if (Array.isArray(myProjects && myNotProjects)) {
					setProjectsNotOwned(myNotProjects)
					setProjects([...myProjects, ...myNotProjects])
					setFiltedProjects([...myProjects, ...myNotProjects])
					setTotal(myProjects.length ? myProjects.length : 0) //setTotal(searchResults.length ? searchResults[0].total : 0)
				}
			}
			setSelectedId(null)
			setIsLoading(false)
			setSincronized(true)
		} catch (error) {
			fetchData()
		}
	}

	useEffect(() => {
		if (address) {
			fetchData()
			return
		} else {
			setProvider(null)
			setSigner(null)
			setBiorbitContract(null)
			setProjects([])
			setFiltedProjects([])
		}
		setIsLoading(false)
	}, [address, page, sincronized])

	return (
		<>
			<Wallet />
			<Menu
				biorbitContract={biorbitContract}
				coordinates={coordinates}
				filtedProjects={filtedProjects}
				isLoading={isLoading}
				handlePage={setPage}
				handleSelect={setSelectedId}
				page={page}
				pageSize={pageSize}
				polygonRef={polygonRef}
				projects={projects}
				projectsNotOwned={projectsNotOwned}
				selectedId={selectedId}
				setCoordinates={setCoordinates}
				setFiltedProjects={setFiltedProjects}
				setIsLoading={setIsLoading}
				setProjects={setProjects}
				setShowDrawControl={setShowDrawControl}
				setSincronized={setSincronized}
				setTotal={setTotal}
				total={total}
			/>
			<MapWithNoSSR
				biorbitContract={biorbitContract}
				filtedProjects={filtedProjects}
				handleSelect={setSelectedId}
				projects={projects}
				projectsNotOwned={projectsNotOwned}
				polygonRef={polygonRef}
				selectedId={selectedId}
				setSelectedId={setSelectedId}
				setCoordinates={setCoordinates}
				showDrawControl={showDrawControl}
			/>
		</>
	)
}

function convertToMonitoringArea(data: any[]): MonitoringArea[] {
	try {
		return data.map(item => {
			const [
				idData,
				uri,
				state,
				name,
				description,
				extensionData,
				footprintData,
				country,
				owner,
				imageTimeSeriesData,
				monitoringData,
				isRent,
				rentCostData,
				rentInfoData
			] = item

			const id: number = parseInt(idData)
			let extension: number | string = parseFloat(
				ethers.utils.parseBytes32String(extensionData)
			)
			extension = extension.toFixed(2)

			const footprint: Footprint[] = footprintData.map((coordinate: any) => {
				const [latitude, longitude] = coordinate
				return { latitude, longitude } as Footprint
			})
			const imageTimeSeries: ImageTimeSeries = {
				detectionDate: imageTimeSeriesData[0],
				forestCoverExtension: imageTimeSeriesData[1]
			}

			const monitoring: Monitoring[] = monitoringData.map((monitor: any) => ({
				detectionDate: monitor[0],
				forestCoverExtension: monitor[1]
			}))

			const rentCost: string = ethers.utils.formatEther(rentCostData)

			const rentInfo: RentInfo[] = rentInfoData.map((rentInfo: any) => {
				let milliseconds: number = rentInfo[0] * 1000
				let dateObject: Date = new Date(milliseconds)
				let humanDateFormat: string = dateObject.toLocaleString([], {
					hour12: false
				})
				return {
					renter: rentInfo[0],
					expiry: humanDateFormat
				}
			})

			return {
				id,
				uri,
				state,
				name: ethers.utils.parseBytes32String(name),
				description: ethers.utils.parseBytes32String(description),
				extension,
				country: ethers.utils.parseBytes32String(country),
				footprint,
				owner,
				imageTimeSeries,
				monitoring,
				isRent,
				rentCost,
				rentInfo
			} as MonitoringArea
		})
	} catch (error) {
		return data.map(item => {
			const [
				idData,
				state,
				name,
				description,
				extensionData,
				footprintData,
				country,
				owner,
				isRent,
				rentCostData
			] = item

			const id: number = parseInt(idData)
			let extension: number | string = parseFloat(
				ethers.utils.parseBytes32String(extensionData)
			)
			extension = extension.toFixed(2)

			const footprint: Footprint[] = footprintData.map((coordinate: any) => {
				const [latitude, longitude] = coordinate
				return { latitude, longitude } as Footprint
			})

			const rentCost: string = ethers.utils.formatEther(rentCostData)

			return {
				id,
				name: ethers.utils.parseBytes32String(name),
				description: ethers.utils.parseBytes32String(description),
				state,
				extension,
				country: ethers.utils.parseBytes32String(country),
				footprint,
				owner,
				isRent,
				rentCost
			} as MonitoringArea
		})
	}
}
