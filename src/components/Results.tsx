import { Box, Center, Text, VStack } from '@chakra-ui/react'
import { Project } from './Project'
import { MonitoringArea } from '@/models/monitoring-area.model'

type Props = {
	handleSelect: React.Dispatch<React.SetStateAction<number | null>>
	projects: MonitoringArea[]
	selectedId: number | null
}

export function Results(props: Props) {
	const { handleSelect, projects, selectedId } = props
	return (
		<Box overflowY={'auto'} flex={1} p={2}>
			<VStack h={'100%'} spacing={2} paddingBottom={2}>
				{projects.length ? (
					projects.map((project: MonitoringArea, index: number) => (
						<Project
							handleSelect={handleSelect}
							key={project.id}
							project={project}
							selectedId={selectedId}
						/>
					))
				) : (
					<Text size={'md'}>- No information -</Text>
				)}
			</VStack>
		</Box>
	)
}
