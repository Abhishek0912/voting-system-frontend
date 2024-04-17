
export default async function fetchVotedStatus() {
    try {
        const response = await fetch('http://localhost:3000/voted', {
          credentials: 'include'
        });
  
        if (!response.ok) {
          throw new Error('Failed to fetch voting status');
        }
  
        const data = await response.json()
        return data.value;
      }catch (error) {
        console.error('Error fetching vote counts:', error);
    }
}