export const StatusBar = (payload: { point: number; maxPoint?: number }) => {
  const { point, maxPoint } = {
    ...payload,
    maxPoint: 10,
  };
  const pointDivs = [];
  for (let i = 1; i <= maxPoint; i++) {
    pointDivs.push(
      i <= point ? (
        <div className="status-point"></div>
      ) : (
        <div className="status-point-empty"></div>
      )
    );
  }
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>{pointDivs}</div>
  );
};