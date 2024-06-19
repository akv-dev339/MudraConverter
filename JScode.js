const BASE_URL = "https://api.currencyapi.com/v3/convert";
const API_KEY = 'cur_live_syp41cdEzrL0lPcNIQ6glXPazdds6yG674XpCOfq'; // Replace with your actual API key
const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");
for(let select of dropdowns){
for(currCode in countryList){
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    if (select.name === "from" && currCode === "USD") {
        newOption.selected = "selected";
      } else if (select.name === "to" && currCode === "INR") {
        newOption.selected = "selected";
      } 
    select.append(newOption);
    
}
select.addEventListener("change", (evt) =>{
    updateFlag(evt.target);
});
}

const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src=newSrc;
}

btn.addEventListener("click",async(evt) =>{
 evt.preventDefault();
 let amount = document.querySelector(".amount input");
 let amtVal = amount.value;

 const fromCurrency = fromCurr.value;
 const toCurrency = toCurr.value;
 //console.log(`From: ${fromCurrency}, To: ${toCurrency}, Amount: ${amtVal}`);

 const URL = `${BASE_URL}?apiKey=${API_KEY}&value=${amtVal}&from=${fromCurrency}&to=${toCurrency}`;
 
 try {
   let response = await fetch(URL);
   if (!response.ok) {
     throw new Error(`Error: ${response.statusText}`);
   }
   let data = await response.json();
   let finalAmount = data.result;
   msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
 } catch (error) {
   console.error('Failed to fetch currency conversion:', error);
   msg.innerText = 'Unable to fetch exchange rate';
 }
});
