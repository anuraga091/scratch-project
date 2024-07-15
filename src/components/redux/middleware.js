let loggingEnabled = true;

export const captureActionEffectsMiddleware = store => next => action => {
  const currentState = store.getState().sprite;
  if (loggingEnabled && !action.meta?.replay && action.type.startsWith('sprite/')) {
    store.dispatch({
      type: 'history/addHistory',
      payload: {action, state: currentState}
    });
  }
  return next(action);
};

export const setLoggingEnabled = (enabled) => {
  loggingEnabled = enabled;
};
