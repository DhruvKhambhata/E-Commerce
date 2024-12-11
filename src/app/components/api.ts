// api.js
export const getProducts = async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/albums/1/photos');
      
      if (!response.ok) {
        throw new Error('Failed to fetch comments');
      }
  
      const data = await response.json();
      console.log("data", data);
      return data;
    } catch (error) {
      console.error('Error fetching comments:', error);
      throw error;
    }
  };
  