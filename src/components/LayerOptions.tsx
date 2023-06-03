import { ButtonGroup, Button } from '@chakra-ui/react'
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'

type Props = {
	options: {
		label: string
		name: string
	}[]
	setOption: Dispatch<SetStateAction<string>>
	activeOption: string
	themeColor: string
}

export function LayerOptions(props: Props) {
	const { options, setOption, activeOption, themeColor } = props
	let color = themeColor || 'green.400'

	return (
		<ButtonGroup
			isAttached
			position='absolute'
			bottom={'3vh'}
			left={'125vh'}
			zIndex={1000}
			size='sm'
			rounded={'sm'}
			borderStyle={'solid'}
			borderWidth={'1px'}
			borderColor={'gray.800'}
			boxShadow='dark-lg'
			overflow={'hidden'}
		>
			{options.map((option, ind) => (
				<Button
					onClick={() => setOption(option.name)}
					rounded={'none'}
					key={option.name}
					border={'none'}
					borderRightWidth={ind < options.length - 1 ? '1px' : '0px'}
					borderRightColor={'gray.300'}
					borderRightStyle={'solid'}
					backgroundColor={activeOption == option.name ? color : 'white'}
					color={activeOption == option.name ? 'white' : 'gray.600'}
					_hover={{
						bg: activeOption == option.name ? color : 'gray.200'
					}}
					fontWeight='medium'
				>
					{option.label}
				</Button>
			))}
		</ButtonGroup>
	)
}

export default LayerOptions
