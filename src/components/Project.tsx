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

interface coordinates {
	latitude: string
	longitude: string
}

type Props = {
	project: MonitoringArea
}

export function Project(props: Props): JSX.Element {
	const { project } = props

	const elRef = useRef(null)
	const selectedId = 0

	const coordinates: coordinates = getLastCoordinates(project.footprint)

	//Effect called when selectedId updates
	useEffect(() => {}, [selectedId])

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
			/*onClick={() => handleSelect(project.Id)}*/
			_hover={{ borderColor: 'blue.500' }}
			cursor='pointer'
		>
			<Flex alignItems='start' mb={3}>
				<Heading fontSize='lg' color='gray.700'>
					{project.name}
				</Heading>
				<Spacer />
				{getTagComponent(project.state)}
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
			<Text fontSize={'xs'} mt={2} float='right'>
				<Link size='sm' href={project.uri} isExternal>
					View on IPFS <ExternalLinkIcon />
				</Link>
			</Text>
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

function getLastCoordinates(footprint: Footprint[][]): coordinates {
	if (footprint.length === 0) {
		return { latitude: '0', longitude: '0' }
	}

	const lastLevel1 = footprint[footprint.length - 1]
	if (lastLevel1.length === 0) {
		return { latitude: '0', longitude: '0' }
	}

	const lastLevel2 = lastLevel1[lastLevel1.length - 1]
	if (lastLevel2.length === 0) {
		return { latitude: '0', longitude: '0' }
	}

	return {
		latitude: lastLevel2.latitude,
		longitude: lastLevel2.longitude
	}
}
