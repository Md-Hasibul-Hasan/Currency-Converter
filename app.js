// const URL = "https://catfact.ninja/fact";
// const para = document.querySelector('.para');
// const btn = document.querySelector('#btn');


// const getData = async () => {
//     console.log('getting data....');
//     let response = await fetch(URL);
//     // console.log(response);
//     // console.log(response.status);

//     let data = await response.json();
//     // console.log(data);
//     // console.log(data.length);
//     // console.log(data.fact);
//     para.innerHTML = data.fact;

// }

// // getData();
// btn.addEventListener('click', getData);







const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1";


const dropdown = document.querySelectorAll('.dropdown select');
let btn = document.querySelector('#btn');
const fromCurr = document.querySelector('.from select');
const toCurr = document.querySelector('.to select');
const msg = document.querySelector('.msg');
const swapBtn = document.querySelector('#swap');


swapBtn.addEventListener('click', (e) => {
    e.preventDefault();

    // Swap selected currency codes
    let tempCode = fromCurr.value;
    fromCurr.value = toCurr.value;
    toCurr.value = tempCode;

    // Update flags for both dropdowns
    updateFlag(fromCurr);
    updateFlag(toCurr);

    // Trigger exchange rate update
    updateExcngRate();
});



window.addEventListener('load', () => {
    updateExcngRate();
})


for(let select of dropdown){
    for(let code in countryList) {
        let newOption = document.createElement('option');
        newOption.innerText = code;
        newOption.value = code;
        select.appendChild(newOption);
        if(select.name === 'from' && code === 'USD'){
            newOption.selected = "selected";
        } else if(select.name === 'to' && code === 'BDT'){
            newOption.selected = "selected";
        }
    }

    select.addEventListener('change', (e) => {
        updateFlag(e.target);
    })
}

const updateFlag = (element) => {
    let currcode =  element.value;
    let countrycode = countryList[currcode];
    let newsrc = `https://flagsapi.com/${countrycode}/flat/64.png`;
    let img = element.parentElement.querySelector('img');
    img.src = newsrc;
}

btn.addEventListener('click', (ev) => {
    ev.preventDefault();
    updateExcngRate();
    
})

const updateExcngRate = async () => {
    let amount = document.querySelector(".amount input");
    let amountValue = amount.value;
    if(amountValue === "" || amountValue < 0){
        amountValue = 1;
        amount.value = 1;
    }

 
    const URL = `${BASE_URL}/currencies/${fromCurr.value.toLowerCase()}.json`;


    let response = await fetch(URL);
    let data = await response.json();
    // let rate = data[toCurr.value.toLowerCase()];
    let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
    let newAmount = (amountValue * rate).toFixed(2);
    msg.innerHTML = `${amountValue} ${fromCurr.value} = ${newAmount} ${toCurr.value}`;
}