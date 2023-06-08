import { useState } from 'react'
import {
	Box,
	Button,
	FormControl,
	FormErrorMessage,
	FormLabel,
	Input,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Spinner,
	useDisclosure
} from '@chakra-ui/react'
import { Field, Form, Formik, FormikHelpers } from 'formik'
import { useAccount } from 'wagmi'
import { MonitoringArea } from '@/assets/models/monitoring-area.model'
import { ethers } from 'ethers'
import { BIOrbit } from '../../@types/typechain-types'

type Props = {
	biorbitContract: BIOrbit | null
	isLoading: boolean
	project: MonitoringArea
	setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
	setSincronized: React.Dispatch<React.SetStateAction<boolean>>
}

export function TrnasferModal(props: Props): JSX.Element {
	const { biorbitContract, project, setSincronized } = props

	const [isLoading, setIsLoading] = useState<boolean>(false)

	const { isOpen, onOpen, onClose } = useDisclosure()
	const { address } = useAccount()

	const closeHandler = (): void => {
		if (!isLoading) {
			onClose()
		}
	}

	function validateTo(value: string): string | undefined {
		let error: string | undefined

		if (address === undefined) {
			error = 'No sender address available'
		} else if (!value) {
			error = 'Receiver wallet is required'
		} else if (!/^0x[a-fA-F0-9]{40}$/i.test(value)) {
			error = 'Invalid Ethereum address'
		} else if (value.toLowerCase() === address.toLowerCase()) {
			error = 'Receiver wallet cannot be the same as sender wallet'
		}

		return error
	}

	return (
		<>
			<Button size={'xs'} fontSize={'xs'} colorScheme='blue' onClick={onOpen}>
				Transfer NFT
			</Button>
			<Modal isOpen={isOpen} onClose={closeHandler}>
				<ModalOverlay />
				<ModalContent>
					{isLoading ? (
						<Box
							width={'448px'}
							height={'346px'}
							display='flex'
							alignItems='center'
							justifyContent='center'
						>
							<Spinner
								thickness='4px'
								speed='0.8s'
								emptyColor='gray.200'
								color='blue.600'
								size='xl'
							/>
						</Box>
					) : (
						<>
							<ModalHeader fontSize={16}>Transfer NFT</ModalHeader>
							<ModalCloseButton />
							<Formik
								initialValues={{
									from: address || '',
									to: ''
								}}
								onSubmit={(
									values: {
										from: string
										to: string
									},
									actions: FormikHelpers<{
										from: string
										to: string
									}>
								) => {
									setTimeout(async () => {
										setIsLoading(true)

										try {
											if (biorbitContract) {
												const approved: string =
													await biorbitContract.getApproved(project.id)

												if (
													approved.toLowerCase() === values.to.toLowerCase()
												) {
													const transferFromTx: ethers.ContractTransaction =
														await biorbitContract.transferFrom(
															values.from,
															values.to,
															project.id
														)
													await transferFromTx.wait(1)
													setIsLoading(false)
													onClose()
													setSincronized(false)
												} else {
													const approveTx = await biorbitContract.approve(
														values.to,
														project.id
													)
													approveTx.wait(1)

													const transferFromTx: ethers.ContractTransaction =
														await biorbitContract.transferFrom(
															values.from,
															values.to,
															project.id,
															{ gasLimit: 2500000 }
														)
													await transferFromTx.wait(1)
													setIsLoading(false)
													onClose()
													setSincronized(false)
												}
											}
										} catch (error) {
											console.error(error)
											setIsLoading(false)
										}
									}, 1000)
								}}
							>
								{props => (
									<Form>
										<ModalBody pb={6}>
											<Field name='from'>
												{({ field, form }: any) => (
													<FormControl>
														<FormLabel fontSize={14}>From</FormLabel>
														<Input
															disabled
															{...field}
															fontSize={12}
															marginBottom={!form.errors.from && 4}
															placeholder='My wallet e.g: (0xE8e154...)'
															value={address}
														/>
													</FormControl>
												)}
											</Field>
											<Field name='to' validate={validateTo}>
												{({ field, form }: any) => (
													<FormControl
														mt={4}
														isInvalid={form.errors.to && form.touched.to}
													>
														<FormLabel fontSize={14}>To</FormLabel>
														<Input
															{...field}
															fontSize={12}
															marginBottom={!form.errors.to && 4}
															placeholder='Receiver wallet'
														/>
														<FormErrorMessage
															marginBottom={form.errors.to && 4}
														>
															{form.errors.to}
														</FormErrorMessage>
													</FormControl>
												)}
											</Field>
										</ModalBody>
										<ModalFooter>
											<Button
												colorScheme='blue'
												mr={3}
												isLoading={props.isSubmitting}
												type='submit'
											>
												Transfer
											</Button>
											<Button onClick={onClose}>Cancel</Button>
										</ModalFooter>
									</Form>
								)}
							</Formik>
						</>
					)}
				</ModalContent>
			</Modal>
		</>
	)
}
