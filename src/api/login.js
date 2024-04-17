export default async function login(username,password){
    try {
        const response = await fetch(`http://localhost:3000/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, password }),
        });
        if (!response.ok) {
          throw new Error('Invalid username or password');
        }
        const data = await response.json();
        return data;
      } catch (error) {
        console.error('Error While Login:', error);
      }
};
