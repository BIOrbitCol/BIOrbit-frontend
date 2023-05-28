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
import { MonitoringArea } from '@/models/monitoring-area.model'
import { useEffect, useRef } from 'react'
import ReactReadMoreReadLess from 'react-read-more-read-less'

type Props = {
	project: MonitoringArea
}

export function Project(props: Props): JSX.Element {
	const { project } = props

	const elRef = useRef(null)
	const selectedId = 0

	//Effect called when selectedId updates
	useEffect(() => {}, [selectedId])

	return (
		<Box
			ref={elRef}
			backgroundColor={'white'}
			borderWidth={'1px'}
			borderStyle={'solid'}
			borderColor={selectedId == project.id ? 'gray.500' : 'gray.300'}
			boxShadow={selectedId == project.id ? 'md' : ''}
			w={'100%'}
			p={3}
			rounded='sm'
			/*onClick={() => handleSelect(project.Id)}*/
			cursor='pointer'
		>
			<Flex alignItems='start' mb={3}>
				<Heading
					fontSize='lg'
					fontFamily={`'Archivo', 'Raleway', serif`}
					color='gray.700'
				>
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
				<Link size='sm' href={project.url} isExternal>
					View on {project.registry} <ExternalLinkIcon />
				</Link>
			</Text>
		</Box>
	)
}

function getTagComponent(state: string): JSX.Element {
	let backgroundColor: string

	switch (state) {
		case 'active':
			backgroundColor = 'green.500'
			break
		case 'monitor':
			backgroundColor = 'yellow.500'
			break
		case 'paused':
			backgroundColor = 'gray.500'
			break
		case 'inactive':
			backgroundColor = 'red.500'
			break
		default:
			backgroundColor = 'gray.500'
			break
	}

	return (
		<Tag
			size={'sm'}
			variant='solid'
			backgroundColor={backgroundColor}
			textAlign={'center'}
			minW='fit-content'
			ml={1}
		>
			{state}
		</Tag>
	)
}
