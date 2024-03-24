import { Box, Modal } from '@mui/material';
import { useState } from 'react';
import { DataType } from '../../screens/MainPage';

type Props = { data: DataType };

export const ListItem = ({ data }: Props) => {
	const { color, id, name, year, pantone_value } = data;
	const [openModal, setOpenModal] = useState<boolean>(false);

	const details = [
		{ label: 'Id', value: id },
		{ label: 'Name', value: name },
		{ label: 'Color', value: color },
		{ label: 'Year', value: year },
		{ label: 'Pantone Value', value: pantone_value },
	];

	const handleOpen = () => {
		setOpenModal(true);
	};
	const handleClose = () => {
		setOpenModal(false);
	};

	return (
		<>
			<tr
				style={{
					backgroundColor: color,
				}}
				onClick={handleOpen}>
				<td style={tdStyle}>{id}</td>
				<td style={tdStyle}>{name}</td>
				<td style={tdStyle}>{year}</td>
			</tr>
			<Modal open={openModal} onClose={handleClose}>
				<Box sx={{ ...boxStyle, width: 400 }}>
					<h2 id='modalTitle'>Item details</h2>
					{details.map(({ label, value }, i) => (
						<p
							key={`${label}-${i}`}
							id={`modalDetailColor${label.replace(' ', '')}`}>
							{label}: {value}
						</p>
					))}
				</Box>
			</Modal>
		</>
	);
};

const tdStyle = {
	paddingInline: 20,
};

const boxStyle = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	bgcolor: 'background.paper',
	border: '1px solid #000',
	boxShadow: 24,
	p: 4,
};
