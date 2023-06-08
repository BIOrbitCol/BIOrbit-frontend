import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons'
import { Box, Text, Flex, Button } from '@chakra-ui/react'
import { MonitoringArea } from '@/assets/models/monitoring-area.model'

type Props = {
	isLoading: boolean
	handlePage: React.Dispatch<React.SetStateAction<number>>
	page: number
	pageSize: number
	projects: MonitoringArea[]
	selectedId: number | null
	total: number
}

export function ResultsPagination(props: Props) {
	const { selectedId, total, page, pageSize, handlePage } = props
	const maxPage: number = Math.floor(total / pageSize)

	return (
		<Flex
			borderTopColor={'gray.300'}
			borderTopWidth={'1px'}
			borderTopStyle={'solid'}
			p={2}
			justifyContent={'center'}
			alignItems={'center'}
		>
			<Box flex={1}>
				{page > 0 && (
					<ChevronLeftIcon
						onClick={() => handlePage(page - 1)}
						float={'right'}
						boxSize={5}
						cursor='pointer'
					/>
				)}
			</Box>
			<Text fontSize={'sm'}>
				{1 + pageSize * page} -{' '}
				{page == maxPage ? total : pageSize * (page + 1)} of {total.toString()}{' '}
				Projects
			</Text>
			<Box flex={1}>
				{page < maxPage && (
					<ChevronRightIcon
						boxSize={5}
						float={'left'}
						onClick={() => handlePage(page + 1)}
						cursor='pointer'
					/>
				)}
			</Box>
		</Flex>
	)
}
