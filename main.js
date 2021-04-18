// document.querySelector('.home').addEventListener('click', () => {
//     document.querySelectorAll('div').forEach(d => d.classList.add('hidden'))
// })

let userCities = null
const loadAllCity = async() => {
    try {
        const loadCity = await axios.post('http://localhost:3001/user/info', {
            userId: localStorage.getItem('userId')
        })
        document.getElementById('user-city-list').innerHTML = ''
        loadCity.data.userCities.forEach(location => {
            console.log(location);
            const p = document.createElement('p')
            const d = document.createElement('button')
            d.innerText = 'delete' // add event to delete it axios.delete 
            p.innerText = `${location.name} ${location.type}`
            document.getElementById('user-city-list').append(p, d)
            d.setAttribute('data-id', location.id)
            d.addEventListener('click', async(event) => {
                const targetId = event.target.getAttribute('data-id')
                const res = await axios.delete('http://localhost:3001/cities/delete', {
                    data: {
                        userId: localStorage.getItem('userId'),
                        id: targetId
                    }
                })
                loadAllCity()
                console.log(res);
            })


        })
        console.log(loadCity);

    } catch (error) {
        console.log(error);
    }

}
loadAllCity()


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
        alert('Welcome New User')
        document.getElementById('signup').reset()
        document.getElementById('signup').classList.add('hidden')
        document.getElementById('login-content').classList.remove('hidden')
            // document.querySelector('#helper').classList.add('hidden')



    } catch (error) {
        console.log(error)
        alert('email is already used.')

    }
})

document.getElementById('homeButton').addEventListener('click', () => {
    document.getElementById('signup').classList.add('hidden')
    document.getElementById('helper').classList.remove('hidden')
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
        alert('You are logged in')
        localStorage.setItem('userId', userId)
        document.getElementById('login-form').reset()
        document.getElementById('login-form').classList.add('hidden')
        document.getElementById('userprofile').classList.remove('hidden')
        document.querySelector('#signup-content').classList.add('hidden')
        document.querySelector('#citymood').classList.remove('hidden')
    } catch (error) {
        console.log(error)


    }
})


document.querySelector('#logOut3').addEventListener('click', () => {
    localStorage.removeItem('userId')
    alert('You have logged out')
    document.getElementById('userprofile').classList.add('hidden')
    document.querySelector('#citymood').classList.add('hidden')


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
        // 
        // result.data.userLocation.forEach(location => {
        //     console.log(location);
        //     const p = document.createElement('p')
        //     const d = document.createElement('button')
        //     d.innerText = 'delete' // add event to delete it axios.delete 
        //     p.innerText = `${location.name} ${location.type}`
        //     document.getElementById('user-city-list').append(p, d)
        //     d.setAttribute('data-id', location.id)
        //     d.addEventListener('click', async(event) => {
        //         const targetId = event.target.getAttribute('data-id')
        //         const res = await axios.delete('http://localhost:3001/cities/delete', {
        //             data: {
        //                 userId: localStorage.getItem('userId'),
        //                 id: targetId
        //             }
        //         })
        //         console.log(res);
        //     })
        loadAllCity()



    } catch (error) {
        console.log(error);
    }
}

// document.getElementById('usrform').addEventListener('submit', async(e) => {
//     e.preventDefault()

//     const name = document.getElementById('usrName').value
//     const type = document.getElementById('usrComment').value

//     try {
//         const res = await axios.put('http://localhost:3001/cities/update', {
//             name: name,
//             type: type
//         })
//         console.log(res);


//     } catch (error) {
//         console.log(error.message);
//     }

// })


document.getElementById('edit').addEventListener('submit', async(e) => {
    e.preventDefault()

    const editName = document.getElementById('editname').value
    const editEmail = document.getElementById('editemail').value

    const userId = localStorage.getItem('userId')
    try {
        if (editName !== "" && editEmail !== "") {
            const res = await axios.put('http://localhost:3001/user/edit', {
                userId: userId,
                name: editName,
                email: editEmail
            })
            console.log(res);
        }
        if (editName !== "" && editEmail === "") {
            const res = await axios.put('http://localhost:3001/user/edit', {
                userId: userId,
                name: editName
            })
            console.log(res);
        }
        if (editName === "" && editEmail !== "") {
            const res = await axios.put('http://localhost:3001/user/edit', {
                userId: userId,
                email: editEmail
            })
            console.log(res);
        }
        document.getElementById('edit').reset()
        alert('user updated')
    } catch (error) {
        console.log(error);
    }

})

document.querySelector('.introsignup').addEventListener('click', () => {
    document.querySelector('#signup-content').classList.remove('hidden')
    document.querySelector('.introsignup').classList.add('hidden')
    document.querySelector('#helper').classList.add('hidden')

})

document.querySelector(".intrologin").addEventListener('click', () => {
    document.querySelector('#helper').classList.add('hidden')
    document.querySelector('#login-content').classList.remove('hidden')

})

document.querySelector("#editusername").addEventListener('click', () => {
    document.querySelector('#userprofile').classList.add('hidden')
    document.querySelector('#citymood').classList.add('hidden')
    document.querySelector('#edit-content').classList.remove('hidden')

})

document.querySelector("#backhome").addEventListener('click', () => {
    document.querySelector('#edit-content').classList.add('hidden')
    document.querySelector('#citymood').classList.remove('hidden')
    document.querySelector('#userprofile').classList.remove('hidden')

})