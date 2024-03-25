import { useState } from "react";
import { ModalWithDetails } from "../ModalWithDetails";
import { DataType } from "../../utils/types";

type Props = { item: DataType };

export const ListItem = ({ item }: Props) => {
  const { color, id, name, year } = item;
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
        data={item}
        openModal={openModal}
        handleClose={handleClose}
      />
    </>
  );
};

const tdStyle = {
  paddingInline: 20,
};
