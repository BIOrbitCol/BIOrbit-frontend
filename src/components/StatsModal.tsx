import {
	Button,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	useDisclosure
} from '@chakra-ui/react'
import { useState } from 'react'
import { BIOrbit } from '../../@types/typechain-types'
import { MonitoringArea } from '@/assets/models/monitoring-area.model'
import { Plot } from './Plot'

type GeoJsonData = GeoJSON.Feature<
	GeoJSON.Geometry,
	GeoJSON.GeoJsonProperties
> & {
	properties: {
		ndvi: string
		rgb: string
	} & MonitoringArea
}

type Props = {
	biorbitContract: BIOrbit | null
	isOpen: boolean
	geoJson: GeoJsonData | null
	onOpen: () => void
	onClose: () => void
}

export function StatsModal(props: Props) {
	const { biorbitContract, isOpen, geoJson, onOpen, onClose } = props

	console.log('geoJson: ', geoJson)

	const [size, setSize] = useState('md')
	const sizes = ['xs', 'sm', 'md', 'lg', 'xl', 'full']

	const handleSizeClick = (newSize: string) => {
		setSize(newSize)
		onOpen()
	}
	return (
		<>
			{sizes.map(size => (
				<Button
					onClick={() => handleSizeClick(size)}
					key={size}
					m={4}
				>{`Open ${size} Modal`}</Button>
			))}

			<Modal onClose={onClose} size={size} isOpen={isOpen}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>{geoJson?.properties?.name}</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<Plot />
					</ModalBody>
					<ModalFooter>
						<Button onClick={onClose}>Close</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	)
}
