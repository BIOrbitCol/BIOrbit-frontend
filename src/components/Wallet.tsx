import { Flex } from '@chakra-ui/react'
import { ConnectButton } from '@rainbow-me/rainbowkit'

export default function Wallet(): JSX.Element {
	return (
		<Flex position='absolute' right={'0'} zIndex={1000} padding={'12px'}>
			<ConnectButton />
		</Flex>
	)
}
