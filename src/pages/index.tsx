import Head from 'next/head'
import React from 'react'
import Explorer from './Explorer'

const metadata = {
	title: 'BIOrbit',
	description: 'Monitoring and guarding'
}

export default function Home(): JSX.Element {
	return (
		<>
			<Head>
				<title>{metadata.title}</title>
				<meta name='description' content={metadata.description} />
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<Explorer />
		</>
	)
}
