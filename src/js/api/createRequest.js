const createRequest = async (options = {}) => {
  const response = await fetch(options.url, {
    method: options.method || 'GET',
    headers: options.headers,
    body: options.body,
  });

  if (!response.ok) {
    throw new Error(`Ошибка ${response.status}`)
  } else if (response.status === 204) {
    return;
  } else {
    const data = await response.json();
    return data;
  }
};

export default createRequest;
