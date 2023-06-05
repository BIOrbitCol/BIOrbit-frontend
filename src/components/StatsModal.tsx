import {
	Button,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	useDisclosure
} from '@chakra-ui/react'
import { useState } from 'react'
import { BIOrbit } from '../../@types/typechain-types'

type Props = {
	biorbitContract: BIOrbit | null
	isOpen: boolean
	onOpen: () => void
	onClose: () => void
}

export function StatsModal(props: Props) {
	const { biorbitContract, isOpen, onOpen, onClose } = props

	const [size, setSize] = useState('md')
	const sizes = ['xs', 'sm', 'md', 'lg', 'xl', 'full']

	const handleSizeClick = (newSize: string) => {
		setSize(newSize)
		onOpen()
	}
	return (
		<Modal onClose={onClose} size={size} isOpen={isOpen}>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>Modal Title</ModalHeader>
				<ModalCloseButton />
				<ModalBody></ModalBody>
				<ModalFooter>
					{sizes.map(size => (
						<Button
							onClick={() => handleSizeClick(size)}
							key={size}
							m={4}
						>{`Open ${size} Modal`}</Button>
					))}
					<Button onClick={onClose}>Close</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	)
}
