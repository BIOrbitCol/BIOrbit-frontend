import logo from '@/assets/images/brand.svg'
import Image from 'next/image'
import {
	Box,
	Button,
	Center,
	Flex,
	Text,
	Tabs,
	TabList,
	TabPanels,
	Tab,
	TabPanel,
	Spinner
} from '@chakra-ui/react'
import { useAccount } from 'wagmi'
import { useEffect, useState } from 'react'
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
	setShowDrawControl: React.Dispatch<React.SetStateAction<boolean>>
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
		setShowDrawControl,
		total
	} = props
	const { address } = useAccount()

	const onMonitorTab = () => {
		setShowDrawControl(true)
	}

	const onProtectedAreasTab = () => {
		setShowDrawControl(false)
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
					<TabList>
						<Tab onClick={onProtectedAreasTab}>Protected areas</Tab>
						<Tab onClick={onMonitorTab}>{address && 'Monitor'}</Tab>
					</TabList>
					<TabPanels overflowY='auto' maxH='77.9vh'>
						<TabPanel padding={0}>
							<>
								<Results projects={projects} />
								{projects && projects.length && (
									<ResultsPagination
										page={page}
										pageSize={pageSize}
										total={total}
										projects={projects}
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
