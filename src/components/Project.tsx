import {
	Flex,
	Box,
	Heading,
	Text,
	Tag,
	Spacer,
	Table,
	Tbody,
	Tr,
	Td,
	TableContainer,
	Link
} from '@chakra-ui/react'
import { ExternalLinkIcon } from '@chakra-ui/icons'
import { Footprint, MonitoringArea } from '@/models/monitoring-area.model'
import { useEffect, useRef } from 'react'
import ReactReadMoreReadLess from 'react-read-more-read-less'
import scrollIntoView from 'scroll-into-view'
import { TrnasferModal } from './TransferModal'
import { BIOrbit } from '../../@types/typechain-types'
import { useAccount } from 'wagmi'

interface Coordinates {
	latitude: string
	longitude: string
}

type Props = {
	biorbitContract: BIOrbit | null
	isLoading: boolean
	handleSelect: React.Dispatch<React.SetStateAction<number | null>>
	project: MonitoringArea
	selectedId: number | null
	setIsHidden: React.Dispatch<React.SetStateAction<boolean>>
	setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
	setSincronized: React.Dispatch<React.SetStateAction<boolean>>
}

export function Project(props: Props): JSX.Element {
	const {
		biorbitContract,
		isLoading,
		handleSelect,
		project,
		selectedId,
		setIsHidden,
		setIsLoading,
		setSincronized
	} = props

	const elRef = useRef<HTMLDivElement | null>(null)

	const { address } = useAccount()

	const coordinates: Coordinates = getLastCoordinates(project.footprint)
	const enable: boolean = project.owner === address ? true : false

	const handleSet = () => {
		handleSelect(project.id)
		if (project.owner === address && project.state === 0) {
			setIsHidden(false)
		} else {
			setIsHidden(true)
		}
	}

	useEffect(() => {
		if (selectedId == project.id) {
			scrollIntoView(elRef.current, {
				time: 4000,
				align: { top: 0, topOffset: 7 }
			})
		}
	}, [selectedId])

	return (
		<Box
			ref={elRef}
			backgroundColor={'white'}
			borderWidth={'1px'}
			borderStyle={'solid'}
			borderColor={selectedId == project.id ? 'grey.500' : 'grey.300'}
			boxShadow={selectedId == project.id ? 'md' : ''}
			w={'100%'}
			p={3}
			rounded='sm'
			onClick={handleSet}
			_hover={{ borderColor: 'blue.500' }}
			cursor='pointer'
		>
			<Flex alignItems='start' mb={3}>
				<Heading fontSize='lg' color='gray.700'>
					{project.name}
				</Heading>
				<Spacer />
				<Box
					display={'flex'}
					alignItems={'center'}
					justifyContent={'space-between'}
				>
					<Text marginRight={3} fontSize={'xs'}>
						ID: {project.id}
					</Text>
					{getTagComponent(project.state)}
				</Box>
			</Flex>
			<Text fontSize='xs'>
				<ReactReadMoreReadLess
					charLimit={340}
					readMoreText={'Read more'}
					readLessText={'Read less'}
				>
					{project.description}
				</ReactReadMoreReadLess>
			</Text>
			<TableContainer mt={2} overflow='hidden'>
				<Table size='sm'>
					<Tbody>
						<Tr>
							<Td fontWeight={'bold'} fontSize={'xs'}>
								Extension
							</Td>
							<Td fontSize={'xs'}>{project.extension} hectareas</Td>
						</Tr>
						<Tr>
							<Td fontWeight={'bold'} fontSize={'xs'}>
								Coordinates
							</Td>
							<Td fontSize={'xs'}>
								{coordinates.latitude} {coordinates.longitude}
							</Td>
						</Tr>
						<Tr>
							<Td fontWeight={'bold'} fontSize={'xs'}>
								Country
							</Td>
							<Td fontSize={'xs'}>{project.country}</Td>
						</Tr>
						<Tr>
							<Td fontWeight={'bold'} fontSize={'xs'}>
								owner
							</Td>
							<Td fontSize={'xs'}>{project.owner}</Td>
						</Tr>
					</Tbody>
				</Table>
			</TableContainer>
			<Box
				mt={2}
				display={'flex'}
				float={!enable ? 'right' : undefined}
				alignItems={'center'}
				justifyContent={'space-between'}
			>
				{enable && (
					<TrnasferModal
						biorbitContract={biorbitContract}
						isLoading={isLoading}
						project={project}
						setIsLoading={setIsLoading}
						setSincronized={setSincronized}
					/>
				)}
				<Text fontSize={'xs'}>
					<Link size='sm' href={project.uri} isExternal>
						View on IPFS <ExternalLinkIcon />
					</Link>
				</Text>
			</Box>
		</Box>
	)
}

function getTagComponent(state: number): JSX.Element {
	switch (state) {
		case 0:
			return (
				<Tag
					size={'sm'}
					variant='solid'
					backgroundColor='green.500'
					textAlign={'center'}
					minW='fit-content'
					ml={1}
				>
					active
				</Tag>
			)
		case 1:
			return (
				<Tag
					size={'sm'}
					variant='solid'
					backgroundColor='yellow.500'
					textAlign={'center'}
					minW='fit-content'
					ml={1}
				>
					monitor
				</Tag>
			)
		case 2:
			return (
				<Tag
					size={'sm'}
					variant='solid'
					backgroundColor='gray.500'
					textAlign={'center'}
					minW='fit-content'
					ml={1}
				>
					paused
				</Tag>
			)
		case 3:
			return (
				<Tag
					size={'sm'}
					variant='solid'
					backgroundColor='red.500'
					textAlign={'center'}
					minW='fit-content'
					ml={1}
				>
					Inactive
				</Tag>
			)
		default:
			return (
				<Tag
					size={'sm'}
					variant='solid'
					backgroundColor='gray.500'
					textAlign={'center'}
					minW='fit-content'
					ml={1}
				>
					x
				</Tag>
			)
	}
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
