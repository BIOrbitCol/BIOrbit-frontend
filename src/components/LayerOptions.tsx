import { Button, ButtonGroup, IconButton } from '@chakra-ui/react'
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons'
import { Dispatch, SetStateAction, useState } from 'react'
import { Feature, GeoJsonProperties, Geometry } from 'geojson'
import * as L from 'leaflet'

interface Option {
	label: string
	name: string
}

type Props = {
	activeOption?: string
	geoJsonProject: Feature<Geometry, GeoJsonProperties> | null
	mapRef: React.MutableRefObject<L.Map | null>
	options: Option[]
	setOption?: Dispatch<SetStateAction<string>>
	themeColor: string
}

export function LayerOptions(props: Props) {
	const {
		activeOption,
		geoJsonProject,
		mapRef,
		options,
		setOption,
		themeColor
	} = props
	const color: string = themeColor || 'blue.400'

	const [activeCarousel, setActiveCarousel] = useState<number>(0)
	const visibleOptions: number = 4

	const handleImageChange = (option: string) => {
		if (mapRef.current) {
			mapRef.current.eachLayer(layer => {
				if (layer instanceof L.ImageOverlay) {
					mapRef.current?.removeLayer(layer)
				}
			})
		}
		if (option === 'NDVI' && geoJsonProject && geoJsonProject.properties) {
			const geoLayer = L.geoJSON(geoJsonProject)
			const imageOverlay = L.imageOverlay(
				geoJsonProject.properties.ndvi,
				geoLayer.getBounds(),
				{
					opacity: 0.8,
					interactive: false
				}
			)
			if (mapRef.current) {
				imageOverlay.addTo(mapRef.current)
			}
		} else if (
			option === 'RGB' &&
			geoJsonProject &&
			geoJsonProject.properties
		) {
			const geoLayer = L.geoJSON(geoJsonProject)
			const imageOverlay = L.imageOverlay(
				geoJsonProject.properties.rgb,
				geoLayer.getBounds(),
				{
					opacity: 0.8,
					interactive: false
				}
			)
			if (mapRef.current) {
				imageOverlay.addTo(mapRef.current)
			}
		}
		if (setOption) {
			setOption(option)
		}
	}

	const handlePreviousOptions = () => {
		setActiveCarousel(prevIndex => Math.max(prevIndex - 1, 0))
	}

	const handleNextOptions = () => {
		setActiveCarousel(prevIndex =>
			Math.min(prevIndex + 1, options.length - visibleOptions)
		)
	}

	return (
		<ButtonGroup
			isAttached
			size='sm'
			maxWidth={'max-content'}
			rounded={'sm'}
			borderStyle={'solid'}
			borderWidth={'1px'}
			borderColor={'gray.800'}
			boxShadow='dark-lg'
			overflow={'hidden'}
		>
			{options.length > visibleOptions && (
				<IconButton
					aria-label='Previous'
					icon={<ChevronLeftIcon />}
					rounded={'none'}
					onClick={handlePreviousOptions}
					color={color}
					borderRightColor={'gray.300'}
					borderRightStyle={'solid'}
					borderRightWidth={'1px'}
					isDisabled={activeCarousel === 0}
				/>
			)}

			{options
				.slice(activeCarousel, activeCarousel + visibleOptions)
				.map((option: Option, index: number) => (
					<Button
						key={option.name}
						rounded={'none'}
						backgroundColor={activeOption === option.name ? color : 'white'}
						border={'none'}
						borderRightColor={'gray.300'}
						borderRightStyle={'solid'}
						borderRightWidth={index < visibleOptions - 1 ? '1px' : '0px'}
						color={activeOption === option.name ? 'white' : 'gray.600'}
						fontWeight='medium'
						_hover={{
							bg: activeOption === option.name ? color : 'gray.200'
						}}
						onClick={() => handleImageChange(option.name)}
					>
						{option.label}
					</Button>
				))}

			{options.length > visibleOptions && (
				<IconButton
					aria-label='Next'
					icon={<ChevronRightIcon />}
					rounded={'none'}
					onClick={handleNextOptions}
					color={color}
					isDisabled={activeCarousel >= options.length - visibleOptions} // Disable next button when at the end
				/>
			)}
		</ButtonGroup>
	)
}

export default LayerOptions
