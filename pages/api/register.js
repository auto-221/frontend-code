export async function register(event) {
    event.preventDefault()
    console.log(event.target.value)
    const formData = new FormData()
    formData.append(nom, event.target.value.nom)
    formData.append(email, event.target.value.email)
    formData.append(password, event.target.value.password)
    formData.append(adresse, event.target.value.adresse)
    formData.append(email, event.target.value.email)

    const res = await fetch('http://localhost:1337/users/create', {
    
        body: JSON.stringify({
            formData
          }),
          headers: {
            'Content-Type': 'application/json'
          },
          method: 'POST'
    })

    const result = await res.json()
}