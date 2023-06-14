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
	useDisclosure,
	Link
} from '@chakra-ui/react'
import { DeleteIcon, EditIcon, ExternalLinkIcon } from '@chakra-ui/icons'

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
import { color } from 'framer-motion'
import { useAccount } from 'wagmi'

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

	const { address } = useAccount()

	let coordinates: Coordinates | null = null

	if (geoJson?.properties.footprint) {
		coordinates = getLastCoordinates(geoJson.properties.footprint)
	}

	return (
		<>
			<Modal onClose={onClose} size={'6xl'} isOpen={isOpen}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>
						{geoJson?.properties?.name}{' '}
						{geoJson?.properties?.owner === address && (
							<EditIcon
								color={'blue.700'}
								cursor={'pointer'}
								_hover={{ color: 'blue.400' }}
							/>
						)}
					</ModalHeader>
					<Text
						position={'absolute'}
						right={0}
						marginTop={4}
						marginRight={'60px'}
						fontSize={'xs'}
					>
						<Link
							marginRight={1}
							size='sm'
							href={geoJson?.properties?.uri}
							isExternal
						>
							Official Website
						</Link>
						{geoJson?.properties?.owner === address && (
							<EditIcon
								color={'blue.700'}
								cursor={'pointer'}
								_hover={{ color: 'blue.400' }}
							/>
						)}
					</Text>
					<ModalCloseButton />
					<ModalBody>
						<Text marginBottom={'32px'} fontSize={'xs'}>
							{geoJson?.properties?.description}{' '}
							{geoJson?.properties?.owner === address && (
								<EditIcon
									color={'blue.700'}
									cursor={'pointer'}
									_hover={{ color: 'blue.400' }}
								/>
							)}
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
								{geoJson?.properties?.owner === address && (
									<EditIcon
										color={'blue.700'}
										cursor={'pointer'}
										_hover={{ color: 'blue.400' }}
									/>
								)}
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
						{geoJson?.properties?.owner === address && (
							<Box
								marginTop={'24px'}
								display={'flex'}
								flexDir={'column'}
								justifyItems={'left'}
								gap={3}
							>
								<Text position={'relative'} left={0} fontSize='xs'>
									<strong>Rent NFT:</strong> active{' '}
									<EditIcon
										color={'blue.700'}
										cursor={'pointer'}
										_hover={{ color: 'blue.400' }}
									/>
								</Text>
								<Text position={'relative'} left={0} fontSize='xs'>
									<strong>Burn NFT</strong>{' '}
									<DeleteIcon
										color={'red.700'}
										cursor={'pointer'}
										_hover={{ color: 'red.400' }}
									/>
								</Text>
							</Box>
						)}
					</ModalBody>
					<ModalFooter>
						<Button colorScheme='blue' onClick={onClose}>
							Close
						</Button>
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
