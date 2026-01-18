const API_URL = ''; // Use empty string for relative paths when proxying

export const generateWebsite = async (prompt) => {
  console.log('Sending request to server for prompt:', prompt);
  try {
    const response = await fetch(`${API_URL}/api/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt }),
    });

    console.log('Server response status:', response.status);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to generate website');
    }

    return await response.json();
  } catch (error) {
    console.error('API Service Error:', error);
    throw error;
  }
};
