// can be put as library / package
// TODO: better logging
export const errorToString = (error: Error, isPrintStack = false) => {
  const stack = isPrintStack ? `, stack: ${error.stack}` : '';
  // can handle error based on instaceof
  return `[${error.constructor.name}] ${error.message} ${stack}`;
};
