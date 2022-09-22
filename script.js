// api key 

const key = '665ce5e97b94c7a5a29ecc9a687d0728'

async function getForecast(location,celsius=true){

// units=imperial for fahrenheit 
// units = metric for celsius
let units;
let mark;
if (celsius){
    units = 'metric'
    mark= '°C'
} else{
    units = 'imperial'
    mark  ='°F'
}
const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=${key}&units=${units}`
const response = await fetch(url,{mode:'cors'})   
response.json().then(function(response) {
    try {
    const main = response.main
    const weather = response.weather[0]
    console.log(main)
    console.log(weather)
    // icon 
    const iconDiv = document.querySelector('#icon-div');
    iconDiv.innerHTML=''
    iconDiv.appendChild(getIcon(weather.main))
    
    // description
    const description = document.querySelector('#description');
    description.innerHTML= `${weather['main']}: ${weather['description']}`;

    // temperature
    const temp = document.querySelector('#temp')
    temp.innerText= `${main.temp.toFixed(1)}${mark}`;
    const max = document.querySelector('#max')
    max.innerText= `${main.temp_max.toFixed(1)}${mark}`;
    const min = document.querySelector('#min')
    min.innerText= `${main.temp_min.toFixed(1)}${mark}`;
    const humid = document.querySelector('#humid')
    humid.innerText= `${main.humidity}%`;
    showDiv(resultDiv);
    }
    catch(err){
        showDiv(failedDiv)
    }
})
}

// add trigger to the search button


const searchButton = document.querySelector('#search')
searchButton.onclick= function(){
    const city = document.querySelector('#city')
    const isC = (document.querySelector('input[name="unit"]:checked').value=='C')
    getForecast(city.value,isC)
    const title = document.querySelector('.result-div .title')
    title.innerHTML = city.value;
    // weather description 
    city.value = ''
    

}

const backButtons = document.querySelectorAll('#back')

backButtons.forEach(button =>{
    button.onclick=function(){
        showDiv(searchDiv)
    }
})


// div for search and result
const searchDiv = document.querySelector('.search-div')
const resultDiv = document.querySelector('.result-div')
const failedDiv = document.querySelector('.failed-div')
function showDiv(element){
    searchDiv.style.display='none';
    resultDiv.style.display='none';
    failedDiv.style.display='none';
    element.style.display='flex';
    return;
}

// Rain Clouds Clear
function getIcon(weather){
  let i = document.createElement('i')
  if (weather =='Rain'){
    i.classList.add('bi', 'bi-cloud-rain')
    i.style.color='grey'
}
   else if (weather=='Clear'){
    i.classList.add('bi','bi-sun')
    i.style.color='yellow'
  } else if (weather=='Clouds'){
    i.classList.add('bi','bi-clouds')
    i.style.color='grey'
  } else if (weather =='Snow'){
    i.classList.add('bi','bi-snow')
    i.style.color='lightblue'
  } else if (weather=='Thunderstorm'){
    i.classList.add('bi','bi-cloud-lightning-rain')
    i.style.color='yellow'
  } else if (weather=='Drizzle'){
    i.classList.add('bi','bi-cloud-drizzle')
    i.style.color='grey'
  } else{
    i.classList.add('bi','bi-cloud-minus')
    i.style.color='grey'
  }
  i.setAttribute('id','icon')
  return i
}