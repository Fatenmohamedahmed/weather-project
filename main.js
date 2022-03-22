let  months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
let userInput=document.getElementById('location');
let searchBtn=document.getElementById('click-btn');
let finalResult=[];
let myResult=[];
let cityName=[];


userInput.addEventListener('click',function(){
    userInput.style.backgroundColor='#1e202b';
    userInput.style.color='white';
})

async function getData(city)
{
    const apiResponse=await fetch(`https://api.weatherapi.com/v1/forecast.json?key=c1a7a040e5d343148ff200039221301&q=${city}&days=3`);
    if(apiResponse.status!=200)
    {
        document.getElementById('message').innerHTML="No matching location found.";
    }
    finalResult=await apiResponse.json();
    let timeZone=finalResult.location.localtime;
    const timeArray=timeZone.split(" ");
    let d = new Date(timeArray[0]);
    let monthName=months[d.getMonth()];
    let numberInMonth=d.getDate();
    let dayName = days[d.getDay()];
    let y=d.getDay();
    let nextDay=days[++y];
    let varriable=y+1;
    let thirdDay=days[varriable];

    let firstDegree=`<p class="degree-size fw-bolder text-white" id="degree">${finalResult.current.temp_c}<sup>o</sup>C</p>`;
    let maxSecondDayDegree=`<p class="text-white fa-2x" id="maxTempNext">${finalResult.forecast.forecastday[1].day.maxtemp_c}<sup>o</sup>C</p>`;
    let minSecondDayDegree=`<p class="text-white" id="minTempNext">${finalResult.forecast.forecastday[1].day.mintemp_c}<sup>o</sup>C</p>`;
    let maxThirdDayDegree=`<p class="text-white fa-2x" id="maxTempThird">${finalResult.forecast.forecastday[2].day.maxtemp_c}<sup>o</sup>C</p>`;
    let minThirdDayDegree=`<p class="text-white fa-2x" id="maxTempThird">${finalResult.forecast.forecastday[2].day.mintemp_c}<sup>o</sup>C</p>`;
    document.getElementById('header-p').innerHTML=`${numberInMonth}${monthName}`;
    document.getElementById('my-header').innerHTML=dayName;
    document.getElementById('class-name').innerHTML=finalResult.location.name;
    document.getElementById('degree').innerHTML=firstDegree;
    document.getElementById('text-info').innerHTML=finalResult.current.condition.text;
    document.getElementById('nextDayair').innerHTML=finalResult.forecast.forecastday[1].day.condition.text;
    document.getElementById('thirdDayair').innerHTML=finalResult.forecast.forecastday[2].day.condition.text;
    document.getElementById('img-src').src=`https:${finalResult.current.condition.icon}`;
    document.getElementById('next-img-src').src=`https:${finalResult.forecast.forecastday[1].day.condition.icon}`;
    document.getElementById('third-img-src').src=`https:${finalResult.forecast.forecastday[2].day.condition.icon}`;
    document.getElementById('next-day').innerHTML=nextDay;
    document.getElementById('third-day').innerHTML=thirdDay;
    document.getElementById('maxTempNext').innerHTML=maxSecondDayDegree;
    document.getElementById('minTempNext').innerHTML=minSecondDayDegree;
    document.getElementById('maxTempThird').innerHTML=maxThirdDayDegree;
    document.getElementById('minTempThird').innerHTML=minThirdDayDegree;
}



userInput.addEventListener('keyup',function(e){
    realTimeSearch(e.target.value);
    for(let i=0;i<cityName.length;i++)
    {
        if(e.target.value.length>=3 && cityName[i].toLowerCase().includes(e.target.value.toLowerCase())==true)
        {
            getData(cityName[i]);
        }
    }
})

searchBtn.addEventListener('click',function(){
    getData(userInput.value);
})

async function realTimeSearch(input)
{
    const apiResponseSearch=await fetch(`https://api.weatherapi.com/v1/search.json?key=c1a7a040e5d343148ff200039221301&q=${input}`);
    myResult=await apiResponseSearch.json();
    for(let i=0;i<myResult.length;i++)
    {
        if(input.length==3)
        {
            cityName.push(myResult[i].name);
        }
    }
    if(input.length<=2)
    {
        cityName=[];
    }
    console.log(cityName);
}


getData('cairo');
