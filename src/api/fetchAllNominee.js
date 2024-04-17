function compare(a, b) {
    if (a.id < b.id) {
      return -1;
    }
    if (a.id > b.id) {
      return 1;
    }
    return 0;
  }

export default async function fetchAllNominee() {
    try {
        const response = await fetch('http://localhost:3000/nominees');
        if (!response.ok) {
          throw new Error('Failed to fetch Nominees');
        }
        const data = await response.json();
  
        if(data.success){
          if (Object.keys(data).length > 0) {
            data.data.sort(compare);
          }
          return data.data;
        }
        else{
          console.log(data.message);
        }
      } catch (error) {
        console.error('Error fetching vote counts:', error);
      }

}