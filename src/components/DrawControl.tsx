import * as L from 'leaflet'
import { useEffect } from 'react'
import { FeatureGroup } from 'react-leaflet'
import { EditControl } from 'react-leaflet-draw'

type DrawEvent = {
	layer: L.Layer
	layerType: string
	// Add other properties here if needed
}

type Props = {
	polygonRef: React.MutableRefObject<L.FeatureGroup | null>
	setCoordinates: React.Dispatch<React.SetStateAction<[number, number][][]>>
	showDrawControl: boolean
}

export function DrawControl(props: Props): JSX.Element {
	const { polygonRef, setCoordinates, showDrawControl } = props

	const onCreated = (event: L.LeafletEvent): void => {
		let coordinates: [number, number][][] = []
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
				setCoordinates(coordinates)
			}
		}
	}

	const onEdited = (event: L.LeafletEvent): void => {
		let coordinates: [number, number][][] = []
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
				if (coordinates.length === 0) {
					coordinates = extractCoordinates(JSON.stringify(layer.toGeoJSON()))
					setCoordinates(coordinates)
				}
			}
		})
	}

	const onDeleted = (event: L.LeafletEvent): void => {
		if (polygonRef.current) {
			polygonRef.current?.clearLayers()
			setCoordinates([])
		}
	}

	useEffect(() => {
		if (!showDrawControl && polygonRef.current) {
			// polygonRef.current.clearLayers()
		}
	}, [showDrawControl])

	return (
		<FeatureGroup ref={polygonRef}>
			{showDrawControl && (
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
					onDeleted={onDeleted}
				/>
			)}
		</FeatureGroup>
	)
}

function extractCoordinates(jsonString: string): [number, number][][] {
	const data: { geometry: { coordinates: number[][][] } } =
		JSON.parse(jsonString)
	const coordinates: number[][][] = data.geometry.coordinates

	const modifiedCoordinates: [number, number][][] = coordinates.map(polygon =>
		polygon.map(([longitude, latitude]) => [latitude, longitude])
	)

	return modifiedCoordinates
}
