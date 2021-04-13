// document.querySelector('.home').addEventListener('click', () => {
//     document.querySelectorAll('div').forEach(d => d.classList.add('hidden'))
// })





document.querySelector('#signup').addEventListener('submit', async(event) => {
    event.preventDefault()
        // prevent the page from reseting when load
    const name = document.querySelector('#name').value
    const email = document.querySelector('#email').value
    const password = document.querySelector('#password').value
        // get the value of the email and password and save them, log them to see if your able to catch.

    try {
        const res = await axios.post('http://localhost:3001/user/signup', {
            // log the res and post it to the back end server 
            name: name,
            email: email,
            password: password

        })
        console.log(res);
        // line 4 - 14 add and E to the form and once submit is hit, it will get the value of email,name, and password and save it.  Then we will fetch with axios with the information that and send it to the psql table. 

        const userId = res.data.newUser.id // with the res you are now going into the object and digging into the payload so data... newuser.. and then the id ( you are trying to get the id)
        localStorage.setItem('userId', userId)

    } catch (error) {
        console.log(error)
        alert('email is already used.')

    }
})


document.querySelector('#login-form').addEventListener('submit', async(event) => {
    event.preventDefault()

    const email = document.querySelector('#login-email').value
    const password = document.querySelector('#login-password').value


    try {
        const res = await axios.post('http://localhost:3001/user/login', {

            email: email,
            password: password

        })
        console.log(res);


        const userId = res.data.user.id
        console.log(res.data);

        localStorage.setItem('userId', userId)

    } catch (error) {
        console.log(error)


    }
})


document.querySelector('#logOut').addEventListener('click', () => {
    localStorage.removeItem('userId')
    alert('logged out')
})

document.querySelector('#vacation-form').addEventListener('submit', async(event) => {
    event.preventDefault()
    const type = document.querySelector('#vacation').value
    console.log(type);
    try {
        const typeCity = await axios.get(`http://localhost:3001/cities/${type}`)
        console.log(typeCity);

        const typeId = typeCity.data.oneCity
        console.log(typeId);
        document.getElementById('cityList').innerHTML = ''
        for (let type of typeId) {
            console.log(type.id)
            const cityLi = document.createElement('li')
            cityLi.innerHTML = `${type.name}, ${type.type}`
            document.getElementById('cityList').append(cityLi)

            cityLi.addEventListener('click', (e) => {
                // console.log(`Name: ${type.name}, Type: ${type.type}`)
                document.getElementById('cityInfo').innerHTML = ''
                const nameCity = document.createElement('p')
                nameCity.innerHTML = `${type.name}, ${type.type}`
                document.getElementById('cityInfo').append(nameCity)


                const button = document.createElement('button')
                button.innerHTML = 'Add City'
                const buttonLoc = document.getElementById('cityInfo')
                button.classList.add('saveCity')
                buttonLoc.append(button)

                document.querySelector('saveCity')
                button.addEventListener('click', async(e) => {
                    e.preventDefault()
                    saveLocation(type.id, type.type)
                })

                // add a button that save 
                // save type.id// append a new <p>
                // look for the user thats log in the back end and then save it add to the assocate  
            })

        }

        // loop to the array and append it to the front
    } catch (error) {
        console.log(error);
    }
})

const saveLocation = async(id, type) => {
    try {

        const user = localStorage.getItem('userId')
        console.log(id);

        const result = await axios.post(`http://localhost:3001/cities/save`, {
            id,
            userId: user
        })
        console.log(result);
        document.getElementById('user-city-list').innerHTML = ''
        result.data.userLocation.forEach(location => {
            console.log(location);
            const p = document.createElement('p')
            const d = document.createElement('button')
            d.innerText = 'delete' // add event to delete it axios.delete 
            p.innerText = `${location.name} ${location.type}`
            document.getElementById('user-city-list').append(p, d)

        })
    } catch (error) {
        console.log(error);
    }
}