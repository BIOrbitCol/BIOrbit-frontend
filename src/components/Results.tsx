import { Box, Center, Text, VStack } from '@chakra-ui/react'
import { Project } from './Project'
import { MonitoringArea } from '@/models/monitoring-area.model'
import { BIOrbit } from '../../@types/typechain-types'

type Props = {
	biorbitContract: BIOrbit | null
	handleSelect: React.Dispatch<React.SetStateAction<number | null>>
	isLoading: boolean
	projects: MonitoringArea[]
	projectsNotOwned: MonitoringArea[]
	selectedId: number | null
	setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
	setSincronized: React.Dispatch<React.SetStateAction<boolean>>
}

export function Results(props: Props) {
	const {
		biorbitContract,
		handleSelect,
		isLoading,
		projects,
		projectsNotOwned,
		selectedId,
		setIsLoading,
		setSincronized
	} = props
	return (
		<Box overflowY={'auto'} flex={1} p={2}>
			<VStack h={'100%'} spacing={2} paddingBottom={2}>
				{projects.length || projectsNotOwned.length ? (
					<>
						{projects.map((project: MonitoringArea, index: number) => (
							<Project
								biorbitContract={biorbitContract}
								handleSelect={handleSelect}
								isLoading={isLoading}
								key={index}
								project={project}
								selectedId={selectedId}
								setIsLoading={setIsLoading}
								setSincronized={setSincronized}
							/>
						))}
						{projectsNotOwned.map(
							(projectNotOwned: MonitoringArea, index: number) => (
								<Project
									biorbitContract={biorbitContract}
									handleSelect={handleSelect}
									isLoading={isLoading}
									key={index}
									project={projectNotOwned}
									selectedId={selectedId}
									setIsLoading={setIsLoading}
									setSincronized={setSincronized}
								/>
							)
						)}
					</>
				) : (
					<Text size={'md'}>- No information -</Text>
				)}
			</VStack>
		</Box>
	)
}
