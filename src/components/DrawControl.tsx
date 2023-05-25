import 'leaflet-draw'
import 'leaflet-draw/dist/leaflet.draw.css'
import * as L from 'leaflet'
import { useMap } from 'react-leaflet'
import { useEffect } from 'react'

type DrawEvent = {
	layer: L.Layer
	layerType: string
	// Add other properties here if needed
}

export default function DrawControl() {
	const map: L.Map = useMap()

	useEffect(() => {
		const drawFeature: L.FeatureGroup = new L.FeatureGroup()
		map.addLayer(drawFeature)

		const drawControl: L.Control.Draw = new L.Control.Draw({
			edit: {
				featureGroup: drawFeature,
				remove: false
			},
			draw: {
				polygon: {},
				polyline: {},
				rectangle: {},
				circle: {},
				marker: {}
			}
		})
		map.addControl(drawControl)

		map.on('draw:created', (event: L.LeafletEvent) => {
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
				console.log('GeoJSON: ', layer.toGeoJSON())
				layer.bindPopup(`<p>${JSON.stringify(layer.toGeoJSON())}<p>`)
			}

			drawFeature.addLayer(layer)
		})

		map.on('draw:edited', (event: L.LeafletEvent) => {
			const drawEvent: DrawEvent = event as unknown as DrawEvent
			const target = event.target as L.FeatureGroup
			const layers: L.Layer[] = []

			target.eachLayer((layer: L.Layer) => {
				layers.push(layer)
			})

			const type: string = drawEvent.layerType

			layers.forEach((layer: L.Layer) => {
				console.log('layer: ', layer)
			})
		})
	}, [map])

	return null
}
