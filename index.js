const BASE_URL="https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const dropdown=document.querySelectorAll(".dropdown select");
const btn=document.querySelector("button");
const msg=document.querySelector(".msg");
const doubleArrow=document.querySelector(".exchangeImg");

for(let select of dropdown){
  for(code in countryList){
    let newOption=document.createElement("option");
    newOption.innerText=code;
    newOption.value=code;
    if(select.name=="from" && code==="USD"){
newOption.selected="selected";
    }else if(select.name=="to" && code==="NPR"){
newOption.selected="selected";
    }
    select.append(newOption);
  }
  select.addEventListener("change",(evt)=>{
    updateFlag(evt.target);
  });
}
const updateExchangeRate=async()=>{
  let fromCurr=((document.querySelector(".from select").value).toString()).toLowerCase();
let toCurr=((document.querySelector(".to select").value).toString()).toLowerCase();
let amount=document.querySelector(".amount input");
amtVal=amount.value;
if (/^\d*$/.test(amtVal)) {
  if(amtVal==""||amtVal<1)
    {
      amtVal=1;
      amount.value="1";
    }
    
    const URL=`${BASE_URL}/${fromCurr}.json`;
    let response= await fetch(URL);
    // console.log(response);
    let result= await response.json();
    console.log(result[fromCurr][toCurr]);
    let finalAmount= (amtVal*result[fromCurr][toCurr].toFixed(2));
    msg.innerText=`${amtVal} ${fromCurr.toUpperCase()} = ${finalAmount} ${toCurr.toUpperCase()}`;
}else{
  msg.innerText="Please enter numbers";

}
 }
 
const updateFlag=(element)=>{
  let currCode=element.value;
  let countryCode=countryList[currCode];
  let newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`;
  let img= element.parentElement.querySelector("img");
  img.src=newSrc;
  }

  doubleArrow.addEventListener("click",()=>{
 let fromSelect=document.querySelector(".from select");
 let toSelect=document.querySelector(".to select");

//  console.log("Before Swap:");
//  console.log("From currency (before):", fromSelect.value);
//  console.log("To currency (before):", toSelect.value);
    let temp=fromSelect.value;
    fromSelect.value=toSelect.value;
    toSelect.value=temp;

// console.log("After Swap:");
// console.log("From currency (after):", fromSelect.value);
// console.log("To currency (after):", toSelect.value);

updateExchangeRate();
updateFlag(document.querySelector(".from select"));
updateFlag(document.querySelector(".to select"));

  });

  btn.addEventListener("click",(evt)=>{
evt.preventDefault();
updateExchangeRate();
  })

 window.addEventListener("load",()=>{
  updateExchangeRate();
})