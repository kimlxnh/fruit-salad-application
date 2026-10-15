const fruitForm = document.querySelector('#inputSection form')
const fruitList = document.querySelector('#fruitSection ul')
const fruitNutrition = document.querySelector ('#nutritionSection p');

fruitForm.addEventListener('submit', extractFruit)
let cal = 0
const fruitCal = {};
const apiKey = "58058276-b2e322337dd4be25ae00cd21c";

function extractFruit(e){
    e.preventDefault()
    fetchFruitData(e.target.fruitInput.value);
    e.target.fruitInput.value=""
    }

function addFruit(fruit){
    const li = document.createElement('li')
    li.textContent = fruit.name
    li.dataset.calories = fruit.nutritions.calories
    li.addEventListener('click', removeFruit)
    fruitList.appendChild(li)

    cal += fruit.nutritions.calories
    fruitNutrition.textContent = cal
    }

function removeFruit (e){
    const li = e.currentTarget;
    cal -= Number(li.dataset.calories);
    fruitNutrition.textContent = cal;
    li.remove();
}

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
