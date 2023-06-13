import {
	Box,
	Button,
	Heading,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Spacer,
	Table,
	TableContainer,
	Tbody,
	Td,
	Tr,
	Text,
	useDisclosure
} from '@chakra-ui/react'
import Blockies from 'react-blockies'
import { useState } from 'react'
import { BIOrbit } from '../../@types/typechain-types'
import {
	Footprint,
	MonitoringArea,
	RentInfo
} from '@/models/monitoring-area.model'
import { Plot } from './Plot'
import { Project } from './Project'

interface Coordinates {
	latitude: string
	longitude: string
}

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

	let coordinates: Coordinates | null = null

	if (geoJson?.properties.footprint) {
		coordinates = getLastCoordinates(geoJson.properties.footprint)
	}

	return (
		<>
			<Modal onClose={onClose} size={'6xl'} isOpen={isOpen}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>{geoJson?.properties?.name}</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<Text marginBottom={'32px'} fontSize={'xs'}>
							{geoJson?.properties?.description}
						</Text>
						<Spacer />
						<Box
							marginBottom={'48px'}
							display={'flex'}
							alignItems={'center'}
							justifyContent={'space-around'}
						>
							<Text fontSize='xs'>
								<strong>extension</strong> {geoJson?.properties?.extension}{' '}
								hectareas
							</Text>
							<Text fontSize='xs'>
								<strong>Coordinates</strong>{' '}
								{coordinates &&
									`${coordinates.latitude} ${coordinates.longitude}`}
							</Text>
							<Text fontSize='xs'>
								<strong>Country</strong> {geoJson?.properties?.country}{' '}
							</Text>
							<Text fontSize='xs'>
								<strong>Owner</strong> {geoJson?.properties?.owner}{' '}
							</Text>
						</Box>

						<Box
							padding={1}
							minW={'max-content'}
							display={'flex'}
							justifyContent={'center'}
							gap={1}
						>
							<Box>
								<TableContainer
									mt={2}
									overflow='hidden'
									height={270} // Adjust this value according to the height of a single row multiplied by 6
									overflowY='auto'
								>
									<Heading fontSize='lg' color='gray.700'>
										Renters
									</Heading>
									<Spacer />
									<Table size='sm'>
										<Tbody>
											{geoJson?.properties.rentInfo?.map(
												(rent: RentInfo, index: number) => {
													return (
														<>
															<Tr key={index}>
																<Td fontSize={'xs'}>
																	<Blockies seed={rent.renter} size={8} />
																</Td>
																<Td fontSize={'xs'} textAlign={'right'}>
																	{rent.renter}
																</Td>
															</Tr>
														</>
													)
												}
											)}
											{geoJson?.properties?.rentInfo &&
												geoJson?.properties?.rentInfo?.length < 5 &&
												getRow(geoJson?.properties?.rentInfo?.length)}
										</Tbody>
									</Table>
								</TableContainer>
							</Box>
							<Box mt={2}>
								<Heading fontSize='lg' color='gray.700'>
									Cover Forest
								</Heading>
								<Plot />
							</Box>
						</Box>
					</ModalBody>
					<ModalFooter>
						<Button onClick={onClose}>Close</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	)
}

function getRow(index: number): JSX.Element[] {
	const returns: number = 5 - index
	const elements: JSX.Element[] = []

	if (returns === 5) {
		for (let i = 0; i < returns; i++) {
			elements.push(
				<>
					<Tr>
						<Td height={'48.5px'} fontSize={'xs'}></Td>
						<Td width={'389.141px'} fontSize={'xs'}>
							{''}
						</Td>
					</Tr>
				</>
			)
		}
	} else {
		for (let i = 0; i < returns; i++) {
			elements.push(
				<>
					<Tr>
						<Td height={'48.5px'} fontSize={'xs'}></Td>
						<Td fontSize={'xs'}>{''}</Td>
					</Tr>
				</>
			)
		}
	}

	return elements
}

function getLastCoordinates(footprint: Footprint[]): Coordinates {
	if (footprint.length === 0) {
		return { latitude: '0', longitude: '0' }
	}

	const lastFootprint = footprint[footprint.length - 1]
	return {
		latitude: lastFootprint.latitude,
		longitude: lastFootprint.longitude
	}
}
