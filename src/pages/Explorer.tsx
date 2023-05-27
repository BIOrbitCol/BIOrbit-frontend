import Menu from '@/components/Menu'
import Wallet from '@/components/Wallet'
import { timeStamp } from 'console'
import dynamic from 'next/dynamic'
import React, { useEffect, useState } from 'react'

const MapWithNoSSR = dynamic(() => import('../components/Map'), { ssr: false })

export default function Explorer(): JSX.Element {
	const [loading, setLoading] = useState<boolean>(true)
	const projects = [
		{
			Id: 0,
			Name: 'Parque Selva de Florencia',
			Acreage: 500,
			Description:
				'bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla',
			State: 'Colombia',
			RegistryName: 'Verra',
			Url: 'www'
		},
		{
			Id: 1,
			Name: 'Parque Selva de Lomas',
			Acreage: 350,
			Description:
				'bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla',
			State: 'Colombia',
			RegistryName: 'Verra',
			Url: 'www'
		}
	]

	useEffect(() => {
		setTimeout(() => {
			setLoading(false)
		}, 3000)
	}, [])

	return (
		<>
			<Wallet />
			<Menu loading={loading} projects={projects} />
			<MapWithNoSSR />
		</>
	)
}
