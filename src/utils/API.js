const API_END_POINT = 'https://kdt-frontend.programmers.co.kr/documents';

export const getRootAPI = async() => {
  try {
    const response = await fetch(API_END_POINT, {
      headers: {
        'x-username': 'suyeon'
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

export const getContentAPI = async(id) => {
  try {
    const response = await fetch(`${API_END_POINT}/${id}`, {
      headers: {
        'x-username': 'suyeon'
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

export const createAPI = async(document) => {
  try {
    const response = await fetch(`${API_END_POINT}`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        'x-username': 'suyeon'
      }, 
      body: JSON.stringify(document)
    })

    if (response.ok) { 
      const data = response.json();

      return data;
    }
  } catch (error) {
    throw new Error(error.message);
  }
}

export const editAPI = async(id, document) => {
  try {
    const response = await fetch(`${API_END_POINT}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
        'x-username': 'suyeon'
      }, 
      body: JSON.stringify(document)
    })

    if (response.ok) { 
      const data = response.json();

      return data;
    }
  } catch (error) {
    throw new Error(error.message);
  }
}

export const removeAPI = async(id) => {
  try {
    const response = await fetch(`${API_END_POINT}/${id}`, {
      headers: {
        'x-username': 'suyeon'
      },
      method: 'DELETE'
    })

    if (response.ok) {
      alert('삭제되었습니다.');
    }
  } catch (error) {
    throw new Error(error.message);
  }
}