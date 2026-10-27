const fruitForm = document.querySelector('#inputSection form')
const fruitList = document.querySelector('#fruitSection ul')
const fruitNutrition = document.querySelector ('#nutritionSection p');
const createForm = document.querySelector('#create-form')
const deleteForm = document.querySelector('#delete-form')
const updateForm = document.querySelector("#update-form");

fruitForm.addEventListener('submit', extractFruit);
let cal = 0
const fruitCal = {};
const apiKey = "58058276-b2e322337dd4be25ae00cd21c";

createForm.addEventListener('submit', createNewFruit);
deleteForm.addEventListener('submit', deleteNewFruit);
updateForm.addEventListener("submit", updateFruit);

function extractFruit(e){
    e.preventDefault()
    fetchFruitData(e.target.fruitInput.value);
    e.target.fruitInput.value=""
    }

/* Same as the next few lines but re-written in a more JS way.

function fetchFruitData(fruit){
        fetch(`https://fruit-api-5v0j.onrender.com/fruits/${fruit}`)
        .then(processResponse)
        .then (data => addFruit(data))
        .catch(e => console.log(e))
    }

function processResponse(resp){
        if (resp.ok) {
            return resp.json()
        } else {
            throw "Error: http status code = " + resp.status
        }
    }
*/

async function fetchFruitData(fruit) {
    try {
        //Make sure to replace this link with your deployed API URL in this fetch
        const respData = await fetch(`https://fruit-backend-api.onrender.com/fruits/${fruit}`);

        const respImg = await fetch(
            `https://pixabay.com/api/?q=${fruit}+fruit&key=${apiKey}`
        );

        if (respData.ok && respImg.ok) {
            const data = await respData.json();
            const imgData = await respImg.json();
            addFruit(data, imgData);
        } else {
            throw "Something has gone wrong with one of the API requests";
        }
    } catch (e) {
        console.log(e);
    }
}

function addFruit(fruit, fruitImg){
    const img = document.createElement("img");
    img.classList.add('fruits');
    img.alt = fruit.name;
    img.src = fruitImg.hits[0].previewURL;

    img.addEventListener("click", removeFruit, {once: true});
    fruitList.appendChild(img);

    fruitCal[fruit.name] = fruit.nutritions.calories;

    cal += fruit.nutritions.calories
    fruitNutrition.textContent = "Total Calories:" + cal;
    }

function removeFruit(e){
        const fruitName = e.target.alt;
        cal -= fruitCal[fruitName];
        fruitNutrition.textContent = "Total Calories: " + cal;

        delete fruitCal[fruitName];
        e.target.remove()
    }
//HTTP req can only send text so JSON.stringify turns object to str
//content type is a header that tells the server the body is in JSON form, if not written req.body will come thorugh as empty/undefined
async function createNewFruit(e) {
    e.preventDefault()
    const data = {
        name: e.target.fruitCreate.value
    }
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    }
    const response = await fetch(`https://fruit-backend-api.onrender.com/fruits`, options)
    let messageStatus = document.querySelector('#message')
    //start control flow

    if (response.status === 201){
        e.target.fruitCreate.value = ''
        messageStatus.textContent= 'Fruit successfully created.'
        setTimeout(() => {
            messageStatus.textContent=''
        }, 4000)
    } else {
        e.target.fruitCreate.value=''
        messageStatus.textContent='This fruit already exists. Please enter another one.'
        setTimeout(() =>{
            messageStatus.textContent=''
        },4000)
    }
} 
// new delete request made 

async function deleteNewFruit(e) {
    e.preventDefault()
    const data = {
        name: e.target.fruitDelete.value
    }
    const response = await fetch(`https://fruit-backend-api.onrender.com/fruits/${data.name}`, {method: "DELETE"})
    let messageStatus = document.querySelector('#deleteFruit')

    if (response.status === 204) {
        e.target.fruitDelete.value=''
        messageStatus.textContent = 'Fruit successfully deleted.'
        setTimeout(() => {
        messageStatus.textContent = ''
    }, 4000)
    } else {
        e.target.fruitDelete.value=''
        messageStatus.textContent = 'Could not delete the fruit. Try again.'
        setTimeout(()=> {
            messageStatus.textContent=''
        },4000)
    }
}
// Sends a PATCH request to change a fruit's name and/or family
async function updateFruit(e) {
  e.preventDefault();

  const fruitName = e.target.currentName.value;
  const data = {
    name: e.target.newName.value,
    family: e.target.newFamily.value
  };

  const options = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  };

  const response = await fetch(`<https://fruit-backend-api.onrender.com/fruits/fruits/${fruitName}`, options);

  let messageStatus = document.querySelector("#update-message");
  if (response.status === 200) {
    e.target.currentName.value = '';
    e.target.newName.value = '';
    e.target.newFamily.value = '';
    messageStatus.textContent = "Fruit successfully updated.";
  } else {
    messageStatus.textContent = "This fruit doesn't exist. Please check the name!";
  }
  setTimeout(() => {
    messageStatus.textContent = "";
  }, 4000);
}
