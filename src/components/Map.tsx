import style from '../styles/Map.module.css'
import { Box, Button, useDisclosure } from '@chakra-ui/react'
import { Geometry } from 'geojson'
import { useEffect, useRef, useState } from 'react'
import { MapContainer, TileLayer, GeoJSON, Popup } from 'react-leaflet'
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
import {
	Footprint,
	ImageTimeSeries,
	MonitoringArea,
	RentInfo
} from '@/models/monitoring-area.model'
import { DrawControl } from './DrawControl'
import LayerOptions from './LayerOptions'
import { StatsModal } from './StatsModal'
import { Form, Formik, FormikHelpers } from 'formik'
import { ethers } from 'ethers'

interface LayerTime {
	name: string
	label: string
}

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
	showDrawControl: boolean
	selectedId: number | null
	setCoordinates: React.Dispatch<React.SetStateAction<number[][]>>
	setIsHidden: React.Dispatch<React.SetStateAction<boolean>>
	setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
	setSelectedId: React.Dispatch<React.SetStateAction<number | null>>
	setSincronized: React.Dispatch<React.SetStateAction<boolean>>
}

export default function Map(props: Props) {
	const {
		biorbitContract,
		isHidden,
		polygonRef,
		projects,
		showDrawControl,
		selectedId,
		setCoordinates,
		setIsHidden,
		setIsLoading,
		setSelectedId,
		setSincronized
	} = props

	const mapRef = useRef<L.Map | null>(null)

	const [geoJsonSelected, setGeoJsonSelected] = useState<GeoJsonData | null>(
		null
	)
	const [geoJsonData, setGeoJsonData] = useState<GeoJsonData[]>([])
	const [ndviSelected, setNdviSelected] = useState<boolean>(false)
	const [isRenting, setIsRenting] = useState<boolean>(false)
	const [layerName, setLayerName] = useState<string>('Transparent')
	const [layerTime, setLayerTime] = useState('')
	const [layerTimes, setLayerTimes] = useState<LayerTime[]>([])

	const { isOpen, onOpen, onClose } = useDisclosure()
	const { address } = useAccount()

	let layerNames = [
		{ label: 'Transparent', name: 'Transparent' },
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
						if (geoJsonObject.properties.state === 0) {
							setIsHidden(false)
							setGeoJsonSelected(geoJsonObject)
							geoJsonLayer.bindPopup(`
                <div class="${style['bind-container']}">
                <button class="${style['chakra-button']} ${style['chakra-button-xs']} ${style['chakra-button-blue']}" onclick="window.dispatchEvent(new CustomEvent('popupButtonView'))">View</button>
                </div>
              `)
						} else {
							setIsHidden(true)
							setGeoJsonSelected(null)
							geoJsonLayer.bindPopup(`
                <div class="${style['bind-container']}">
                  <p class="${style['bind-container__name']}">Monitoring 🛰</p>
                </div>
              `)
						}
					} else {
						if (
							geoJsonObject.properties?.rentInfo?.some(
								(rent: RentInfo) =>
									rent.renter === address && new Date(rent.expiry) > new Date()
							)
						) {
							setIsHidden(false)
							setGeoJsonSelected(geoJsonObject)
							geoJsonLayer.bindPopup(`
                <div class="${style['bind-container']}">
                <button class="${style['chakra-button']} ${style['chakra-button-xs']} ${style['chakra-button-blue']}" onclick="window.dispatchEvent(new CustomEvent('popupButtonView'))">View</button>
                </div>
              `)
						} else if (
							geoJsonObject.properties.state === 0 &&
							!geoJsonObject.properties.isRent
						) {
							setIsHidden(true)
							setGeoJsonSelected(null)
							geoJsonLayer.bindPopup(`
                <div class="${style['bind-container']}">
                  <p class="${style['bind-container__name']}">Not for rent 🔒️</p>
                </div>
              `)
						} else {
							setIsHidden(true)
							setGeoJsonSelected(null)
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
					if (geoJson.properties.state === 1) {
						setIsHidden(true)
					} else if (
						(geoJson.properties.state === 0 &&
							geoJson.properties?.rentInfo?.some(
								(rent: RentInfo) =>
									rent.renter === address && new Date(rent.expiry) > new Date()
							)) ||
						geoJson.properties.owner === address
					) {
						setIsHidden(false)
						setGeoJsonSelected(geoJson)
						if (geoJson.properties.imageTimeSeries) {
							setLayerTimes(
								generateLayerTimeData(geoJson.properties.imageTimeSeries)
							)
						}
					}
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
						color:
							geoJson.properties.owner == address ||
							geoJson.properties?.rentInfo?.some(
								(rent: RentInfo) =>
									rent.renter === address && new Date(rent.expiry) > new Date()
							)
								? ' yellow'
								: 'red'
					}}
				>
					{geoJson.properties.state === 0 &&
						geoJson.properties.isRent &&
						isRenting &&
						!geoJson.properties?.rentInfo?.some(
							(rent: RentInfo) => rent.renter === address
						) && (
							<Popup>
								<Box
									margin={1}
									padding={0}
									display={'flex'}
									flexDirection={'column'}
									alignItems={'center'}
									justifyContent={'center'}
									gap={'1rem'}
								>
									<p className={style['bind-container__name']}>Locked 🔒️</p>
									<Formik
										initialValues={{
											name: ''
										}}
										onSubmit={(
											values: {
												name: string
											},
											actions: FormikHelpers<{
												name: string
											}>
										) => {
											setTimeout(async () => {
												setIsRenting(false)
												setIsLoading(true)

												try {
													if (biorbitContract) {
														if (selectedId) {
															console.log(
																ethers.utils.parseUnits(
																	geoJson.properties.rentCost,
																	'ether'
																)
															)

															const rentProjectTx =
																await biorbitContract.rentProject(
																	geoJson.properties.id,
																	{
																		gasLimit: 2500000,
																		value: ethers.utils.parseUnits(
																			geoJson.properties.rentCost,
																			'ether'
																		)
																	}
																)

															await rentProjectTx.wait(1)
															setSincronized(false)
															actions.setSubmitting(false)
														}
													}
												} catch (error) {
													console.error(error)
													setIsRenting(true)
													setIsLoading(false)
												}
											}, 1000)
										}}
									>
										{props => (
											<Form>
												<Button
													size={'xs'}
													fontSize={'xs'}
													colorScheme='blue'
													isLoading={props.isSubmitting}
													type='submit'
												>
													Rent
												</Button>
											</Form>
										)}
									</Formik>
									{geoJson.properties.rentCost + ' MATIC'}
								</Box>
							</Popup>
						)}
				</GeoJSON>
			))}
			{!isHidden && (
				<Box
					position='absolute'
					zIndex={1000}
					bottom={'3vh'}
					left={'102vh'}
					display={'flex'}
					alignItems={'center'}
					justifyItems={'center'}
					flexDir={'column'}
					gap={3}
				>
					{ndviSelected && (
						<LayerOptions
							activeOption={layerTime}
							geoJsonProject={geoJsonSelected}
							mapRef={mapRef}
							ndviSelected={ndviSelected}
							options={layerTimes}
							setOption={setLayerTime}
							themeColor={'blue.500'}
						/>
					)}
					<Box
						width={'457.69px'}
						display={'flex'}
						alignItems={'center'}
						justifyContent={'center'}
					>
						<LayerOptions
							activeOption={layerName}
							geoJsonProject={geoJsonSelected}
							mapRef={mapRef}
							options={layerNames}
							setNdviSelected={setNdviSelected}
							setOption={setLayerName}
							themeColor={'blue.500'}
						/>
					</Box>
				</Box>
			)}
			{geoJsonSelected?.properties.id && (
				<StatsModal
					biorbitContract={biorbitContract}
					isOpen={isOpen}
					geoJson={geoJsonSelected}
					onOpen={onOpen}
					onClose={onClose}
				/>
			)}
		</MapContainer>
	)
}

function generateLayerTimeData(imageTimeSeries: ImageTimeSeries): LayerTime[] {
	return imageTimeSeries.detectionDate.map(dateStr => {
		const date = dateStr.split('-').slice(0, 3).join('-')
		return {
			label: date,
			name: date
		}
	})
}
