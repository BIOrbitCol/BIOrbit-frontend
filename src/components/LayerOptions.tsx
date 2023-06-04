import { ButtonGroup, Button } from '@chakra-ui/react'
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'
import { Feature, GeoJsonProperties, Geometry } from 'geojson'
import * as L from 'leaflet'

interface Option {
	label: string
	name: string
}

type Props = {
	geoJsonProject: Feature<Geometry, GeoJsonProperties> | null
	options: Option[]
	mapRef: React.MutableRefObject<L.Map | null>
	setOption: Dispatch<SetStateAction<string>>
	activeOption: string
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
	let color = themeColor || 'blue.400'

	const imageHandle = (option: string) => {
		if (mapRef.current) {
			// Remove existing image overlays
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
		setOption(option)
	}

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
			{options.map((option: Option, index: number) => (
				<Button
					onClick={() => imageHandle(option.name)}
					rounded={'none'}
					key={option.name}
					border={'none'}
					borderRightWidth={index < options.length - 1 ? '1px' : '0px'}
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
