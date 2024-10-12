
export const fetchEmails = async () => {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    if (!response.ok) {
      throw new Error('Failed to fetch emails');
    }
    const data = await response.json();
    return data.map(email => ({
      id: email.id,
      from: `User ${email.userId}`, // Simulating a sender
      subject: email.title,
      shortDescription: email.body.substring(0, 50) + '...', // Short description from body
      date: new Date().toISOString(), // Simulating the current date for demo purposes
      isRead: false, // Default unread status
      isFavorite: false // Default favorite status
    }));
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const fetchEmailDetails = async (id) => {
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch email details');
    }
    const email = await response.json();
    return {
      id: email.id,
      from: `User ${email.userId}`,
      subject: email.title,
      body: email.body,
      date: new Date().toISOString(), // Simulating the current date
      isFavorite: false // Default favorite status
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
};



