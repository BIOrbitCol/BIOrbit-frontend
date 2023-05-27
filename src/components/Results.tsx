import { Box, Center, Text, VStack } from '@chakra-ui/react'
import { Project } from './Project'
import { MonitoringArea } from '@/models/monitoring-area.model'

type Props = {
	projects: MonitoringArea[]
}

export function Results(props: Props) {
	const { projects } = props
	return (
		<Box overflowY={'auto'} flex={1} p={2}>
			<VStack h={'100%'} spacing={2} paddingBottom={2}>
				{projects.length ? (
					projects.map((project: MonitoringArea, index: number) => (
						<Project project={project} key={project.id} />
					))
				) : (
					<Text size={'md'}>- No information -</Text>
				)}
			</VStack>
		</Box>
	)
}
