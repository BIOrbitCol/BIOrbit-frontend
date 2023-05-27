import { Text } from '@chakra-ui/react'
import { Project } from './Project'

type Props = {
	projects: Object[]
}

export function Results(props: Props) {
	const { projects } = props
	return (
		<>
			<Project />
			{/* <Text size={'md'}>- No information -</Text> */}
		</>
	)
}
