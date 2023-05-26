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
	TabPanel
} from '@chakra-ui/react'
import { useAccount } from 'wagmi'
import { useEffect, useState } from 'react'
import { Project } from './Project'

export default function Menu(): JSX.Element {
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
			<Tabs>
				<TabList>
					<Tab>Protected areas</Tab>
					<Tab>{address && 'Monitor'}</Tab>
				</TabList>

				<TabPanels>
					<TabPanel>
						<Center padding={3}>
							<Project />
							{/* <Text size={'md'}>- No information -</Text> */}
						</Center>
					</TabPanel>
					<TabPanel>
						{address && (
							<Box padding={3}>
								<Button colorScheme='blue'>Monitor protected area</Button>
							</Box>
						)}
					</TabPanel>
				</TabPanels>
			</Tabs>
		</Flex>
	)
}
