import { Menu } from '@/components/Menu'
import { Wallet } from '@/components/Wallet'
import dynamic from 'next/dynamic'
import React from 'react'

const MapWithNoSSR = dynamic(() => import('../components/Map'), { ssr: false })

export function Explorer(): JSX.Element {
	return (
		<>
			<Wallet />
			<Menu />
			<MapWithNoSSR />
		</>
	)
}
