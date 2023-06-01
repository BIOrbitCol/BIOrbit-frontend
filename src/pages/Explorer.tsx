import Menu from '@/components/Menu'
import Wallet from '@/components/Wallet'
import { MonitoringArea } from '@/models/monitoring-area.model'
import dynamic from 'next/dynamic'
import React, { useEffect, useRef, useState } from 'react'
import * as L from 'leaflet'
import { Contract, ethers } from 'ethers'
import BIOrbitContractJson from '@/assets/contracts/BIOrbit.json'
import { useAccount, useContractRead } from 'wagmi'

const MapWithNoSSR = dynamic(() => import('../components/Map'), { ssr: false })

export default function Explorer(): JSX.Element {
	const [biorbitContract, setBiorbitContract] = useState<Contract | null>(null)
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

	const { data: biorbitProjects, isError } = useContractRead({
		address: `0x${BIOrbitContractJson.address.substring(2)}`,
		abi: BIOrbitContractJson.abi,
		functionName: 'getProjectsByOwner'
	})

	const fetchData = async () => {
		setIsLoading(true)

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
