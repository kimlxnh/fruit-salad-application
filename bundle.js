(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const fruitForm = document.querySelector('#inputSection form')
const fruitList = document.querySelector('#fruitSection ul')
const fruitNutrition = document.querySelector ('#nutritionSection p');
const createForm = document.querySelector('#create-form')

fruitForm.addEventListener('submit', extractFruit)
let cal = 0
const fruitCal = {};
const apiKey = "58058276-b2e322337dd4be25ae00cd21c";

fruitForm.addEventListener("submit", extractFruit);
createForm.addEventListener('submit', createNewFruit)


function extractFruit(e){
    e.preventDefault()
    fetchFruitData(e.target.fruitInput.value);
    e.target.fruitInput.value=""
    }

function addFruit(fruit){
    const li = document.createElement('li')
    li.textContent = fruit.name
    li.addEventListener('click', removeFruit)
    fruitList.appendChild(li)

    cal += fruit.nutritions.calories
    fruitNutrition.textContent = cal
    }

function removeFruit(e){
        e.target.remove()
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
//promise below must have async and await 
async function createNewFruit (e) {
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
    console.log(response)
} 

},{}]},{},[1]);
