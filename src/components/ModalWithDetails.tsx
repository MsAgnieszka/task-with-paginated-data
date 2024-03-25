import { Box, Button, Modal } from '@mui/material';
import { DataType } from '../screens/MainPage';

export const ModalWithDetails = ({
	data,
	openModal,
	handleClose,
}: {
	data: DataType;
	openModal: boolean;
	handleClose: () => void;
}) => {
	const { color, id, name, year, pantone_value } = data;

	const details = [
		{ label: 'Id', value: id },
		{ label: 'Name', value: name },
		{ label: 'Color', value: color },
		{ label: 'Year', value: year },
		{ label: 'Pantone Value', value: pantone_value },
	];

	return (
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
				<Button onClick={handleClose} variant='outlined'>
					Close
				</Button>
			</Box>
		</Modal>
	);
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
