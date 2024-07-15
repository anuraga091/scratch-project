export const waitAction = (duration) => async (dispatch) => {
  dispatch({ type: 'sprite/wait', payload: { duration } });
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, duration * 1000);
  });
};