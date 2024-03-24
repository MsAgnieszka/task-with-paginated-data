import { Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import { ListWithData } from '../components/ListWithData/ListWithData';
import { SearchBar } from '../components/SearchBar';
import { useDataFromApi } from '../hooks/useDataFromApi';

export type DataType = {
	id: number;
	name: string;
	year: number;
	color: string;
	pantone_value?: string;
};

export const MainPage = () => {
	const { getDataFromApi, items, currentPage } = useDataFromApi();

	useEffect(() => {
		getDataFromApi();
	}, [currentPage, getDataFromApi]);

	return (
		<div>
			<div className='App'>
				<Stack className='App-header' spacing={3}>
					<SearchBar onSearch={getDataFromApi} page={currentPage} />
					<ListWithData data={items} />
				</Stack>
			</div>
		</div>
	);
};
