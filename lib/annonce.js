export async  function getAnnonces() {
  const res = await fetch('http://localhost:1337/annonces')
  const data = await res.json()
    console.log(data);
    return {
      props: {
        data
    }, 
  } 
} 