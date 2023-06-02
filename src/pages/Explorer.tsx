import Menu from '@/components/Menu'
import Wallet from '@/components/Wallet'
import {
	Footprint,
	ImageTimeSeries,
	Monitoring,
	MonitoringArea
} from '@/models/monitoring-area.model'
import dynamic from 'next/dynamic'
import React, { useEffect, useRef, useState } from 'react'
import * as L from 'leaflet'
import { Contract, ethers } from 'ethers'
import BIOrbitContractJson from '@/assets/contracts/BIOrbit.json'
import { useAccount, useContractRead, useWalletClient } from 'wagmi'

const MapWithNoSSR = dynamic(() => import('../components/Map'), { ssr: false })

export default function Explorer(): JSX.Element {
	const [coordinates, setCoordinates] = useState<
		Array<Array<[number, number]>>
	>([])
	const [filtedProjects, setFiltedProjects] = useState<MonitoringArea[]>([])
	const [isLoading, setIsLoading] = useState<boolean>(true)
	const [page, setPage] = useState<number>(0)
	const [projects, setProjects] = useState<MonitoringArea[]>([])
	const [selectedId, setSelectedId] = useState(null) // lack typo
	const [showDrawControl, setShowDrawControl] = useState<boolean>(false)
	const [total, setTotal] = useState<number>(0)

	const polygonRef = useRef<L.FeatureGroup | null>(null)

	const pageSize: number = 50 // date hardcored

	const { address } = useAccount()
	const { data: walletClient } = useWalletClient()

	const fetchData = async () => {
		setIsLoading(true)

		const provider = new ethers.providers.Web3Provider(window.ethereum)
		await provider.send('eth_requestAccounts', [])
		const signer = provider.getSigner()

		const biorbitContract = new Contract(
			BIOrbitContractJson.address,
			BIOrbitContractJson.abi,
			signer
		)

		const biorbitProjects = convertToMonitoringArea(
			await biorbitContract.getProjectsByOwner()
		)

		console.log(biorbitProjects)

		if (Array.isArray(biorbitProjects)) {
			setProjects(biorbitProjects)
			setFiltedProjects(biorbitProjects)
			setTotal(biorbitProjects.length ? biorbitProjects.length : 0) //setTotal(searchResults.length ? searchResults[0].total : 0)
		}
		setSelectedId(null)
		setIsLoading(false)
	}

	useEffect(() => {
		if (address) {
			fetchData()
			return
		}
		setIsLoading(false)
	}, [page, address])

	return (
		<>
			<Wallet />
			<Menu
				coordinates={coordinates}
				filtedProjects={filtedProjects}
				isLoading={isLoading}
				handlePage={setPage}
				handleSelect={setSelectedId}
				page={page}
				pageSize={pageSize}
				polygonRef={polygonRef}
				projects={projects}
				selectedId={selectedId}
				setCoordinates={setCoordinates}
				setFiltedProjects={setFiltedProjects}
				setProjects={setProjects}
				setShowDrawControl={setShowDrawControl}
				setTotal={setTotal}
				total={total}
			/>
			<MapWithNoSSR
				polygonRef={polygonRef}
				setCoordinates={setCoordinates}
				showDrawControl={showDrawControl}
			/>
		</>
	)
}

function convertToMonitoringArea(data: any[]): MonitoringArea[] {
	return data.map(item => {
		const [
			idData,
			uri,
			state,
			name,
			description,
			extension,
			footprintData,
			country,
			owner,
			imageTimeSeriesData,
			monitoringData
		] = item

		const id: number = parseInt(idData)
		const footprint: Footprint[][] = footprintData.map((coordinate: string[]) =>
			coordinate.map(coord => {
				const [latitude, longitude] = coord.split(',')
				return { latitude, longitude } as Footprint
			})
		)

		const imageTimeSeries: ImageTimeSeries = {
			detectionDate: imageTimeSeriesData[0],
			forestCoverExtension: imageTimeSeriesData[1]
		}

		const monitoring: Monitoring[] = monitoringData.map((monitor: any) => ({
			detectionDate: monitor[0],
			forestCoverExtension: monitor[1]
		}))

		return {
			id,
			uri,
			name,
			description,
			state,
			extension,
			country,
			footprint,
			owner,
			imageTimeSeries,
			monitoring
		} as MonitoringArea
	})
}
