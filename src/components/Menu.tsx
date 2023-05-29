import logo from '@/assets/images/brand.svg'
import { SearchIcon } from '@chakra-ui/icons'
import { Field, Form, Formik } from 'formik'
import countriesJson from '../assets/json/countries.json'

import Image from 'next/image'
import {
	Box,
	Button,
	Center,
	Flex,
	FormControl,
	FormLabel,
	FormErrorMessage,
	InputGroup,
	InputRightElement,
	HStack,
	Radio,
	RadioGroup,
	Tabs,
	TabList,
	TabPanels,
	Tab,
	TabPanel,
	Textarea,
	Select,
	Spinner,
	Input,
	Text
} from '@chakra-ui/react'
import { useAccount } from 'wagmi'
import { ChangeEvent, useEffect, useRef, useState } from 'react'
import { Results } from './Results'
import { MonitoringArea } from '@/models/monitoring-area.model'
import { ResultsPagination } from './ResultsPagination'

type Props = {
	filtedProjects: MonitoringArea[]
	isLoading: boolean
	handlePage: React.Dispatch<React.SetStateAction<number>>
	handleSelect: React.Dispatch<React.SetStateAction<null>>
	page: number
	pageSize: number
	projects: MonitoringArea[]
	selectedId: null
	setFiltedProjects: React.Dispatch<React.SetStateAction<MonitoringArea[]>>
	setProjects: React.Dispatch<React.SetStateAction<MonitoringArea[]>>
	setShowDrawControl: React.Dispatch<React.SetStateAction<boolean>>
	setTotal: React.Dispatch<React.SetStateAction<number>>
	total: number
}

export default function Menu(props: Props): JSX.Element {
	const {
		filtedProjects,
		isLoading,
		handlePage,
		handleSelect,
		page,
		pageSize,
		projects,
		selectedId,
		setFiltedProjects,
		setProjects,
		setShowDrawControl,
		setTotal,
		total
	} = props

	const { address } = useAccount()

	const [enableSearcher, setEnableSearcher] = useState<boolean>(true)
	const [extensionAreaOption, setExtensionAreaOption] =
		useState<string>('Polygon')
	const protectedAreasTabRef = useRef<HTMLButtonElement>(null)

	const onMonitorTab = (): void => {
		if (extensionAreaOption === 'Polygon') {
			setShowDrawControl(true)
		}
		setEnableSearcher(false)
	}

	const onProtectedAreasTab = (): void => {
		setShowDrawControl(false)
		setEnableSearcher(true)
	}

	const searchProject = (event: ChangeEvent<HTMLInputElement>) => {
		const inputValue: string = event.target.value
		const filtered: MonitoringArea[] = projects.filter(
			(project: MonitoringArea) =>
				project.name.toLowerCase().includes(inputValue.toLowerCase())
		)

		if (filtered.length === 0) {
			setFiltedProjects([])
			setTotal(filtered.length)
			return
		}
		setFiltedProjects(filtered)
		setTotal(filtered.length)
	}

	useEffect(() => {
		if (extensionAreaOption === 'Polygon') {
			setShowDrawControl(true)
		} else {
			setShowDrawControl(false)
		}
	}, [extensionAreaOption])

	useEffect(() => {
		if (!address && protectedAreasTabRef.current) {
			protectedAreasTabRef.current.click()
		}

		if (extensionAreaOption === 'Polygon') {
			setShowDrawControl(false)
		}
	}, [address])

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
				<Image src={logo} alt='logo' width={250} priority={true} />
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
							<Tab ref={protectedAreasTabRef} onClick={onProtectedAreasTab}>
								Protected areas
							</Tab>
							{address && (
								<Tab onClick={onMonitorTab}>{address && 'Monitor'}</Tab>
							)}
						</TabList>

						<Box>
							<InputGroup>
								<Input
									width={180}
									height={7}
									marginY={'8px'}
									marginX={'16px'}
									placeholder='Search'
									onChange={enableSearcher ? searchProject : () => {}}
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
								{filtedProjects && <Results projects={filtedProjects} />}
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
							{address && (
								<Formik
									initialValues={{
										name: '',
										description: '',
										coordinates: [],
										country: ''
									}}
									onSubmit={(values, actions) => {
										setTimeout(() => {
											alert(JSON.stringify(values, null, 2))
											actions.setSubmitting(false)
										}, 1000)
									}}
								>
									{props => (
										<Form>
											<Field name='name' validate={validateName}>
												{({ field, form }) => (
													<FormControl
														isInvalid={form.errors.name && form.touched.name}
													>
														<FormLabel fontSize={14}>Name</FormLabel>
														<Input
															{...field}
															fontSize={12}
															marginBottom={!form.errors.name && 4}
															placeholder='Yellowstone National Park'
														/>
														<FormErrorMessage
															marginBottom={form.errors.name && 4}
														>
															{form.errors.name}
														</FormErrorMessage>
													</FormControl>
												)}
											</Field>
											<Field name='description' validate={validateDescription}>
												{({ field, form }) => (
													<FormControl
														isInvalid={
															form.errors.description &&
															form.touched.description
														}
													>
														<FormLabel fontSize={14}>Description</FormLabel>
														<Textarea
															{...field}
															fontSize={12}
															marginBottom={!form.errors.description && 4}
															placeholder='Yellowstone National Park is a national park located...'
														/>
														<FormErrorMessage
															marginBottom={form.errors.description && 4}
														>
															{form.errors.description}
														</FormErrorMessage>
													</FormControl>
												)}
											</Field>
											<Field name='coordinates' validate={validateCoordinates}>
												{({ field, form }) => (
													<FormControl as='fieldset'>
														<FormLabel as='legend' fontSize={14}>
															Area extension
														</FormLabel>
														<RadioGroup
															onChange={setExtensionAreaOption}
															value={extensionAreaOption}
															marginBottom={!form.errors.coordinates && 4}
														>
															<HStack spacing='24px'>
																<Radio value='Polygon'>
																	<Text fontSize={14}>Polygon</Text>
																</Radio>
																<Radio value='Coordinates'>
																	<Text fontSize={14}>Coordinates</Text>
																</Radio>
															</HStack>
														</RadioGroup>
														<FormErrorMessage
															marginBottom={form.errors.coordinates && 4}
														>
															{form.errors.coordinates}
														</FormErrorMessage>
													</FormControl>
												)}
											</Field>
											<Field name='country' validate={validateCountry}>
												{({ field, form }) => (
													<FormControl
														isInvalid={
															form.errors.country && form.touched.country
														}
													>
														<FormLabel fontSize={14}>Country</FormLabel>
														<Select
															{...field}
															placeholder='Select country'
															fontSize={12}
															marginBottom={!form.errors.country && 4}
														>
															{countriesJson.countries.map(country => (
																<option key={country}>{country}</option>
															))}
														</Select>
														<FormErrorMessage
															marginBottom={form.errors.country && 4}
														>
															{form.errors.country}
														</FormErrorMessage>
													</FormControl>
												)}
											</Field>
											<Button
												colorScheme='blue'
												isLoading={props.isSubmitting}
												type='submit'
											>
												Submit
											</Button>
										</Form>
									)}
								</Formik>
							)}
						</TabPanel>
					</TabPanels>
				</Tabs>
			)}
		</Flex>
	)
}

function validateName(value: string): string | undefined {
	let error: string | undefined
	if (!value) {
		error = 'Protected name is required'
	}
	return error
}

function validateDescription(value: string): string | undefined {
	let error: string | undefined
	if (!value) {
		error = 'Description is required'
	}
	return error
}

function validateCountry(value: string): string | undefined {
	let error: string | undefined
	if (!value) {
		error = 'Country is required'
	}
	return error
}

function validateCoordinates(value: string): string | undefined {
	let error: string | undefined
	if (!value) {
		error = 'Coordinates are required'
	}
	return error
}
