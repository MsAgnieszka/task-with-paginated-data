import { columns } from "../../utils/constants";

export const ListHeader = () => (
  <thead style={{ color: "black" }}>
    <tr>
      {columns.map(({ field }, i) => (
        <th key={`${field}-${i}`}>{field}</th>
      ))}
    </tr>
  </thead>
);
