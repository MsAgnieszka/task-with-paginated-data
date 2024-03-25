import { useState } from "react";
import { DataType } from "../../utils/types";
import { ModalWithDetails } from "../ModalWithDetails";

type Props = { data: DataType };

export const ListItem = ({ data }: Props) => {
  const { color, id, name, year } = data;
  const [openModal, setOpenModal] = useState<boolean>(false);

  const handleOpen = () => {
    setOpenModal(true);
  };
  const handleClose = () => {
    setOpenModal(false);
  };

  return (
    <>
      <tr
        onClick={handleOpen}
        style={{
          backgroundColor: color,
        }}
      >
        <td style={tdStyle}>{id}</td>
        <td style={tdStyle}>{name}</td>
        <td style={tdStyle}>{year}</td>
      </tr>
      <ModalWithDetails
        data={data}
        openModal={openModal}
        handleClose={handleClose}
      />
    </>
  );
};

const tdStyle = {
  paddingInline: 20,
};
