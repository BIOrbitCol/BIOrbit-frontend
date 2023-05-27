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
import { Project } from './Project'
import { Results } from './Results'

type Props = {
	loading: boolean
	projects: Object[]
}

export default function Menu(props: Props): JSX.Element {
	const { loading, projects } = props
	const { address } = useAccount()

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
			{loading ? (
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
						<Tab>Protected areas</Tab>
						<Tab>{address && 'Monitor'}</Tab>
					</TabList>

					<TabPanels>
						<TabPanel>
							<Center padding={3}>
								<Results projects={projects} />
							</Center>
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
