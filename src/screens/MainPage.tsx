import { ChangeEvent, useEffect, useState } from 'react';
import { ListWithData } from '../components/ListWithData/ListWithData';
import { SearchBar } from '../components/SearchBar';
import { useDataFromApi } from '../hooks/useDataFromApi';
import { Pagination, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export type DataType = {
	id: number;
	name: string;
	year: number;
	color: string;
	pantone_value?: string;
};

export const MainPage = () => {
	const navigate = useNavigate();
	const { getDataFromApi, items, totalPages, currentPage, setCurrentPage } =
		useDataFromApi();
	const [localCurrentPage, setLocalCurrentPage] = useState<number>(1);

	useEffect(() => {
		setLocalCurrentPage(currentPage);
		getDataFromApi();
	}, [currentPage, getDataFromApi]);

	const handleChange = (event: ChangeEvent<unknown>, value: number) => {
		setLocalCurrentPage(value);
		setCurrentPage(value);
		navigate(`/?page=${value}`);
	};

	return (
		<div>
			<div className='App'>
				<Stack className='App-header' spacing={3}>
					<SearchBar onSearch={getDataFromApi} page={localCurrentPage} />
					<ListWithData data={items} />
					<Pagination
						count={totalPages}
						variant='outlined'
						color='primary'
						disabled={!Array.isArray(items)}
						onChange={handleChange}
						page={localCurrentPage}
					/>
				</Stack>
			</div>
		</div>
	);
};
