import logo from '@/assets/images/brand.svg'
import { SearchIcon } from '@chakra-ui/icons'

import Image from 'next/image'
import {
	Box,
	Button,
	Center,
	Flex,
	InputGroup,
	InputRightElement,
	Text,
	Tabs,
	TabList,
	TabPanels,
	Tab,
	TabPanel,
	Spinner,
	Input
} from '@chakra-ui/react'
import { useAccount } from 'wagmi'
import { ChangeEvent, useEffect, useState } from 'react'
import { Results } from './Results'
import { MonitoringArea } from '@/models/monitoring-area.model'
import { ResultsPagination } from './ResultsPagination'

type Props = {
	isLoading: boolean
	handlePage: React.Dispatch<React.SetStateAction<number>>
	handleSelect: React.Dispatch<React.SetStateAction<null>>
	page: number
	pageSize: number
	projects: MonitoringArea[]
	selectedId: null
	setProjects: React.Dispatch<React.SetStateAction<MonitoringArea[]>>
	setShowDrawControl: React.Dispatch<React.SetStateAction<boolean>>
	setTotal: React.Dispatch<React.SetStateAction<number>>
	total: number
}

export default function Menu(props: Props): JSX.Element {
	const {
		isLoading,
		handlePage,
		handleSelect,
		page,
		pageSize,
		projects,
		selectedId,
		setProjects,
		setShowDrawControl,
		setTotal,
		total
	} = props

	const [filtedProjects, setFiltedProjects] = useState<MonitoringArea[]>([])
	const { address } = useAccount()

	const onMonitorTab = () => {
		setShowDrawControl(true)
	}

	const onProtectedAreasTab = () => {
		setShowDrawControl(false)
	}

	const searchProject = (event: ChangeEvent<HTMLInputElement>) => {
		const inputValue: string = event.target.value
		const filtered: MonitoringArea[] = projects.filter(
			(project: MonitoringArea) =>
				project.name.toLowerCase().includes(inputValue.toLowerCase())
		)
		setFiltedProjects(filtered)
		setTotal(filtered.length)
	}

	return (
		<Flex
			width={'500px'}
			height={'94vh'}
			position='absolute'
			top={'3vh'}
			left={'60px'}
			zIndex={1000}
			backgroundColor={'white'}
			boxShadow='dark-lg'
			rounded={'sm'}
			borderStyle={'solid'}
			borderWidth={'1px'}
			borderColor={'gray.800'}
			direction={'column'}
			overflow={'hidden'}
		>
			<Center
				borderBottomColor={'blue.600'}
				borderBottomWidth={'1px'}
				borderBottomStyle={'solid'}
				p={2}
			>
				<Image src={logo} alt='logo' width={250} />
			</Center>
			{isLoading ? (
				<Spinner
					margin={'auto'}
					thickness='4px'
					speed='0.8s'
					emptyColor='gray.200'
					color='blue.600'
					size='xl'
				/>
			) : (
				<Tabs>
					<Box
						display={'flex'}
						alignItems={'center'}
						justifyContent={'space-between'}
					>
						<TabList>
							<Tab onClick={onProtectedAreasTab}>Protected areas</Tab>
							<Tab onClick={onMonitorTab}>{address && 'Monitor'}</Tab>
						</TabList>

						<Box>
							<InputGroup>
								<Input
									width={180}
									height={7}
									marginY={'8px'}
									marginX={'16px'}
									placeholder='Search'
									onChange={searchProject}
								/>
								<InputRightElement paddingTop={1} paddingRight={5}>
									<SearchIcon
										w={4}
										h={4}
										color='black.600'
										cursor={'pointer'}
									/>
								</InputRightElement>
							</InputGroup>
						</Box>
					</Box>
					<TabPanels overflowY='auto' maxH='77.9vh'>
						<TabPanel padding={0}>
							<>
								{filtedProjects.length === 0 ? (
									<Results projects={projects} />
								) : (
									<Results projects={filtedProjects} />
								)}
								{projects && projects.length && (
									<ResultsPagination
										page={page}
										pageSize={pageSize}
										total={total}
										projects={filtedProjects}
										handlePage={handlePage}
										isLoading={false}
										selectedId={null}
									/>
								)}
							</>
						</TabPanel>
						<TabPanel>
							<Center padding={3}>
								{address && (
									<Button colorScheme='blue'>Monitor protected area</Button>
								)}
							</Center>
						</TabPanel>
					</TabPanels>
				</Tabs>
			)}
		</Flex>
	)
}
