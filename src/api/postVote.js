export default async function postVote(selectedNominee){
    try {
        const response = await fetch(`http://localhost:3000/vote/${selectedNominee}`, {
          method: 'POST',
          credentials: 'include'
        });
        if (!response.ok) {
          throw new Error('Failed to submit vote');
        }
        const data = await response.json();
        return data;
  
      } catch (error) {
        console.error('Error submitting vote:', error);
      }
}