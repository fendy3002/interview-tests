export const TableList = (props: { tableNames: string[] }) => {
  return (
    <div className="flex flex-col">
      <div>
        <ul>
          {props.tableNames.map((tableName) => (
            <li>{tableName}</li>
          ))}
        </ul>
      </div>
      <div></div>
    </div>
  );
};
