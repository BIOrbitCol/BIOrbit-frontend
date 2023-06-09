import style from '../styles/Map.module.css'
import { useDisclosure } from '@chakra-ui/react'
import { Geometry } from 'geojson'
import { useEffect, useRef, useState } from 'react'
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet'
import { useAccount } from 'wagmi'
import * as L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import 'leaflet-defaulticon-compatibility'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css'
import 'leaflet-draw'
import 'leaflet-draw/dist/leaflet.draw.css'
import 'leaflet-measure'
import 'leaflet-measure/dist/leaflet-measure.js'
import 'leaflet-measure/dist/leaflet-measure.css'
import { BIOrbit } from '../../@types/typechain-types'
import countriesJson from '@/assets/json/countries.json'
import { Countries, Country } from '@/models/countries.model'
import { Footprint, MonitoringArea } from '@/models/monitoring-area.model'
import { DrawControl } from './DrawControl'
import LayerOptions from './LayerOptions'
import { StatsModal } from './StatsModal'

type GeoJsonData = GeoJSON.Feature<
	GeoJSON.Geometry,
	GeoJSON.GeoJsonProperties
> & {
	properties: {
		ndvi: string
		rgb: string
	} & MonitoringArea
}

type Props = {
	biorbitContract: BIOrbit | null
	isHidden: boolean
	polygonRef: React.MutableRefObject<L.FeatureGroup | null>
	projects: MonitoringArea[]
	selectedId: number | null
	setCoordinates: React.Dispatch<React.SetStateAction<number[][]>>
	setIsHidden: React.Dispatch<React.SetStateAction<boolean>>
	setSelectedId: React.Dispatch<React.SetStateAction<number | null>>
	showDrawControl: boolean
}

export default function Map(props: Props) {
	const {
		biorbitContract,
		isHidden,
		polygonRef,
		projects,
		selectedId,
		setCoordinates,
		setIsHidden,
		setSelectedId,
		showDrawControl
	} = props

	const mapRef = useRef<L.Map | null>(null)

	const [geoJsonClicked, setGeoJsonClicked] = useState<GeoJsonData | null>(null)
	const [geoJsonData, setGeoJsonData] = useState<GeoJsonData[]>([])
	const [layerName, setLayerName] = useState<string>('Transparent')

	const { isOpen, onOpen, onClose } = useDisclosure()
	const { address } = useAccount()

	let layerNames = [
		{ label: 'Transparent', name: 'Transparent' },
		{ label: 'RGB', name: 'RGB' },
		{ label: 'NDVI', name: 'NDVI' }
	]

	const centerMap = (geoLayer: L.GeoJSON<any, Geometry>) => {
		if (mapRef.current) {
			const bounds: L.LatLngBounds = geoLayer.getBounds()
			mapRef.current.fitBounds(bounds, {
				paddingTopLeft: [600, 0],
				maxZoom: mapRef.current.getBoundsZoom(bounds)
			})
		}
	}

	const onEachFeature = (feature: any, layer: L.Layer): void => {
		if (feature.geometry.type === 'Polygon') {
			layer.on('click', (): void => {
				const geoJsonLayer = layer as L.GeoJSON
				const geoJsonObject = geoJsonLayer.toGeoJSON()

				if (geoJsonObject.type === 'Feature') {
					setSelectedId(geoJsonObject.properties.id)
					if (geoJsonObject.properties.owner === address) {
						setIsHidden(false)
						if (geoJsonObject.properties.state === 0) {
							setGeoJsonClicked(geoJsonObject)
							geoJsonLayer.bindPopup(`
                <div class="${style['bind-container']}">
                <button class="${style['chakra-button']} ${style['chakra-button-xs']} ${style['chakra-button-blue']}" onclick="window.dispatchEvent(new CustomEvent('popupButtonView'))">View</button>
                </div>
              `)
						} else {
							geoJsonLayer.bindPopup(`
                <div class="${style['bind-container']}">
                  <p class="${style['bind-container__name']}">Monitoring 🛰</p>
                </div>
              `)
						}
					} else {
						setIsHidden(true)
						if (
							geoJsonObject.properties.state === 0 &&
							geoJsonObject.properties.isRent
						) {
							geoJsonLayer.bindPopup(`
                <div class="${style['bind-container']}">
                  <p class="${style['bind-container__name']}">Locked 🔒️</p>
                  <button class="${style['chakra-button']} ${
								style['chakra-button-xs']
							} ${
								style['chakra-button-blue']
							}" onclick="window.dispatchEvent(new CustomEvent('popupButtonView'))">Rent</button> ${
								geoJsonObject.properties.rentCost + ' MATIC'
							}
                </div>
              `)
						} else if (
							geoJsonObject.properties.state === 0 &&
							!geoJsonObject.properties.isRent
						) {
							geoJsonLayer.bindPopup(`
                <div class="${style['bind-container']}">
                  <p class="${style['bind-container__name']}">Not for rent 🔒️</p>
                </div>
              `)
						} else {
							geoJsonLayer.bindPopup(`
                <div class="${style['bind-container']}">
                  <p class="${style['bind-container__name']}">Locked 🔒️</p>
                  <p class="${style['bind-container__name']}">Monitoring 🛰</p>
                </div>
              `)
						}
					}
				}
			})
		}
	}

	useEffect(() => {
		let newGeoJsonData: GeoJsonData[] = []

		for (let project of projects) {
			const geoJSON: GeoJsonData = {
				type: 'Feature',
				geometry: {
					type: 'Polygon',
					coordinates: [
						project.footprint.map((footprint: Footprint) => [
							parseFloat(footprint.longitude),
							parseFloat(footprint.latitude)
						])
					]
				},
				properties: {
					...project,
					ndvi: 'https://i5.walmartimages.com/asr/39eada0c-3501-44f0-b177-7c2ebabdda6d.b74931aade8174b928e6c8aa4129317c.jpeg?odnWidth=1000&odnHeight=1000&odnBg=ffffff',
					rgb: 'https://cdn-icons-png.flaticon.com/512/110/110686.png'
				}
			}

			newGeoJsonData.push(geoJSON)
		}

		setGeoJsonData(newGeoJsonData)
	}, [address, projects])

	useEffect(() => {
		if (selectedId) {
			geoJsonData.forEach((geoJson: GeoJsonData): void => {
				if (geoJson.properties.id === selectedId) {
					const geoLayer = L.geoJSON(geoJson)
					centerMap(geoLayer)
					return
				}
			})
		}
	}, [selectedId])

	useEffect(() => {
		const handlePopupButtonView = () => onOpen()

		window.addEventListener('popupButtonView', handlePopupButtonView)

		return () => {
			window.removeEventListener('popupButtonView', handlePopupButtonView)
		}
	}, [onOpen])

	return (
		<MapContainer
			ref={mapRef}
			className={style.map}
			center={[4.72366, -74.06286]}
			zoom={6}
			scrollWheelZoom={true}
		>
			<TileLayer
				attribution='&copy; "<a href="http:/google.com/maps">Google</a>"'
				url='https://mt0.google.com/vt/lyrs=s&hl=en&x={x}&y={y}&z={z}&s=Ga'
			/>
			<DrawControl
				polygonRef={polygonRef}
				setCoordinates={setCoordinates}
				showDrawControl={showDrawControl}
			/>
			{geoJsonData.map((geoJson: GeoJsonData, index: number) => (
				<GeoJSON
					key={index}
					onEachFeature={onEachFeature}
					data={geoJson}
					style={{
						fillOpacity: 0.01,
						weight: 2,
						color: geoJson.properties.owner == address ? ' yellow' : 'red'
					}}
				/>
			))}
			{!isHidden && (
				<LayerOptions
					activeOption={layerName}
					geoJsonProject={geoJsonClicked}
					mapRef={mapRef}
					options={layerNames}
					setOption={setLayerName}
					themeColor={'blue.500'}
				/>
			)}
			{geoJsonClicked?.properties.id && (
				<StatsModal
					biorbitContract={biorbitContract}
					isOpen={isOpen}
					geoJson={geoJsonClicked}
					onOpen={onOpen}
					onClose={onClose}
				/>
			)}
		</MapContainer>
	)
}
