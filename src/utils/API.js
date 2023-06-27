const API_END_POINT = 'https://kdt-frontend.programmers.co.kr/documents';

export const getRootDocument = async() => {
  try {
    const response = await fetch(API_END_POINT, {
      headers: {
        'x-username': 'roto'
      }
    });
    
    if (response.ok) {
      const data = response.json();
      return data;
    }
  } catch (error) {
    throw new Error(error.message);
  }
}

export const getDocumentContent = async(id) => {
  try {
    const response = await fetch(`${API_END_POINT}/${id}`, {
      headers: {
        'x-username': 'roto'
      }
    });

    if (response.ok) {
      const data = response.json();
      return data;
    }
  } catch (error) {
    throw new Error(error.message);
  }
}