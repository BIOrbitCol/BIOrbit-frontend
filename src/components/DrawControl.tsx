import * as L from 'leaflet'
import { useEffect, useRef } from 'react'
import { FeatureGroup } from 'react-leaflet'
import { EditControl } from 'react-leaflet-draw'

type DrawEvent = {
	layer: L.Layer
	layerType: string
	// Add other properties here if needed
}

type Props = {
	setCoordinates: React.Dispatch<React.SetStateAction<number[][]>>
	showDrawControl: boolean
}

export function DrawControl(props: Props): JSX.Element {
	const { setCoordinates, showDrawControl } = props

	const featureGroupRef = useRef<L.FeatureGroup | null>(null)

	const onCreated = (event: L.LeafletEvent): void => {
		let coordinates: number[][] = []
		const drawEvent: DrawEvent = event as unknown as DrawEvent
		const layer: L.Layer = drawEvent.layer
		const type: string = drawEvent.layerType

		if (
			layer instanceof L.Polygon ||
			layer instanceof L.Polyline ||
			layer instanceof L.Rectangle ||
			layer instanceof L.Circle ||
			layer instanceof L.Marker
		) {
			layer.bindPopup(`<p>${JSON.stringify(layer.toGeoJSON())}<p>`)
			if (coordinates.length === 0) {
				coordinates = extractCoordinates(JSON.stringify(layer.toGeoJSON()))
				console.log(coordinates)
				setCoordinates(coordinates)
			}
		}
	}

	const onEdited = (event: L.LeafletEvent): void => {
		const drawEvent: DrawEvent = event as unknown as DrawEvent
		const target = event.target as L.FeatureGroup
		const layers: L.Layer[] = []

		target.eachLayer((layer: L.Layer) => {
			layers.push(layer)
		})

		const type: string = drawEvent.layerType

		layers.forEach((layer: L.Layer) => {
			if (
				layer instanceof L.Polygon ||
				layer instanceof L.Polyline ||
				layer instanceof L.Rectangle ||
				layer instanceof L.Circle ||
				layer instanceof L.Marker
			) {
				layer.bindPopup(
					`coordinates: <p>${JSON.stringify(layer.toGeoJSON())}<p>`
				)
			}
		})
	}

	useEffect(() => {
		if (!showDrawControl && featureGroupRef.current) {
			featureGroupRef.current.clearLayers()
		}
	}, [showDrawControl])

	return (
		<FeatureGroup ref={featureGroupRef}>
			<EditControl
				position='topleft'
				draw={{
					circle: false,
					circlemarker: false,
					marker: false,
					rectangle: false,
					polyline: false
				}}
				onCreated={onCreated}
				onEdited={onEdited}
			/>
		</FeatureGroup>
	)
}

function extractCoordinates(jsonString: string): number[][][] {
	const data: { geometry: { coordinates: number[][][] } } =
		JSON.parse(jsonString)
	const coordinates: number[][][] = data.geometry.coordinates

	const modifiedCoordinates: number[][][] = coordinates.map(polygon =>
		polygon.map(([longitude, latitude]) => [latitude, longitude])
	)

	return modifiedCoordinates
}
