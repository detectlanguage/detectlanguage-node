class DetectLanguageError extends Error {}

function handleError(error) {
  let message;

  try {
    const json = JSON.parse(error.message);
    message = json?.error?.message || error.message;
  } catch (e) {
    message = error.message;
  }

  const apiError = new DetectLanguageError(message);

  apiError.stack = error.stack;

  throw apiError;
}

export {
  DetectLanguageError,
  handleError,
};
