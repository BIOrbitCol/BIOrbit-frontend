import { ImageTimeSeries, MonitoringArea } from '@/models/monitoring-area.model'
import * as ss from 'simple-statistics'
import React from 'react'
import {
	Area,
	Bar,
	ComposedChart,
	CartesianGrid,
	Legend,
	Line,
	Tooltip,
	XAxis,
	YAxis
} from 'recharts'

interface PlotData {
	date: string
	cover: number
	forest: number
	extension: number
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
	geoJson: GeoJsonData | null
}

export function Plot(props: Props) {
	const { geoJson } = props
	let data

	if (geoJson?.properties.imageTimeSeries) {
		data = reformatData(
			geoJson.properties.imageTimeSeries,
			geoJson.properties.extension
		)
	}

	return (
		<>
			<ComposedChart width={620} height={250} data={data}>
				<CartesianGrid stroke='#f5f5f5' />
				<XAxis
					dataKey='date'
					angle={-20}
					fontSize={8}
					tickMargin={14}
					label={{ value: 'Date', position: 'insideBottomRight', offset: 0 }}
					scale='band'
				/>
				<YAxis
					fontSize={8}
					label={{
						value: 'Extension ha',
						angle: -90,
						position: 'insideLeft',
						offset: 0
					}}
				/>
				<Tooltip />
				<Legend verticalAlign='top' height={36} />
				{/* <Area type='monotone' dataKey='amt' fill='#8884d8' stroke='#8884d8' /> */}
				<Bar dataKey='cover' barSize={20} fill='#413ea0' />
				<Line type='monotone' dataKey='forest' stroke='#FFBB28' />
				<Line type='monotone' dataKey='extension' stroke='#82ca9d' />
			</ComposedChart>
		</>
	)
}

function reformatData(
	imageTimeSeries: ImageTimeSeries,
	extension: string
): PlotData[] {
	const { detectionDate, forestCoverExtension } = imageTimeSeries

	return detectionDate.map((date: string, index: number) => ({
		date: date.replace(/-LC0\d/g, ''),
		cover: parseFloat(forestCoverExtension[index]),
		forest: parseFloat(forestCoverExtension[index]),
		extension: parseFloat(extension)
	}))
}
