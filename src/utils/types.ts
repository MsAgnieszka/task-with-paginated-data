export type DataType = {
  id: number;
  name: string;
  year: number;
  color: string;
  pantone_value?: string;
};

export type DataTypes = DataType | DataType[];

export type ListWithDataProps = {
  data: DataTypes;
};
