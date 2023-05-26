import * as L from 'leaflet'
import { FeatureGroup } from 'react-leaflet'
import { EditControl } from 'react-leaflet-draw'

type DrawEvent = {
	layer: L.Layer
	layerType: string
	// Add other properties here if needed
}

export function DrawControl(): JSX.Element {
	const onCreated = (event: L.LeafletEvent): void => {
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
	return (
		<FeatureGroup>
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
