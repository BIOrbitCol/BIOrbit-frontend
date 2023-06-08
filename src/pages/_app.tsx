import '@/styles/globals.css'
import '@rainbow-me/rainbowkit/styles.css'
import {
	RainbowKitProvider,
	getDefaultWallets,
	connectorsForWallets,
	darkTheme,
	midnightTheme
} from '@rainbow-me/rainbowkit'
import type { AppProps } from 'next/app'
import { configureChains, createConfig, WagmiConfig } from 'wagmi'
import {
	celo,
	polygon,
	celoAlfajores,
	polygonMumbai,
	localhost
} from 'wagmi/chains'
import { publicProvider } from 'wagmi/providers/public'
import { ChakraProvider } from '@chakra-ui/react'

const { chains, publicClient, webSocketPublicClient } = configureChains(
	[
		...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === 'false' ? [polygon] : []),

		...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === 'true'
			? [localhost, polygonMumbai]
			: [])
	],
	[publicProvider()]
)

const projectId = '0'

const { wallets } = getDefaultWallets({
	appName: 'RainbowKit dApp',
	projectId,
	chains
})

const demoAppInfo = {
	appName: 'RainbowKit dApp'
}

const connectors = connectorsForWallets([...wallets])

const wagmiConfig = createConfig({
	autoConnect: true,
	connectors,
	publicClient,
	webSocketPublicClient
})

export default function App({ Component, pageProps }: AppProps): JSX.Element {
	return (
		<WagmiConfig config={wagmiConfig}>
			<RainbowKitProvider
				chains={chains}
				coolMode
				modalSize='compact'
				theme={darkTheme({
					accentColor: '#2b6cb0',
					accentColorForeground: 'white',
					borderRadius: 'small',
					fontStack: 'system',
					overlayBlur: 'small'
				})}
			>
				<ChakraProvider>
					<Component {...pageProps} />
				</ChakraProvider>
			</RainbowKitProvider>
		</WagmiConfig>
	)
}
