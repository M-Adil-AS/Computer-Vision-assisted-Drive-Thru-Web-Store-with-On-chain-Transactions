let data_raw = JSON.parse(document.querySelector('#forecastSales').getAttribute('payload'))
data_raw = data_raw.map((object) => {
    return {timestamp:object.timespan, price:object.purchase}
})
let timestamps = data_raw.map((object) => object.timestamp)
let prices = data_raw.map((object) => object.price)

let compare = timestamps[0].includes('/') ? 'month' : 'year'
let config = {responsive: true}
Plotly.newPlot('initial-chart', [], {title:"Forecast Sales", font:{size: 12}, hoverlabel:{font: {color: 'white'}}}, config)

const url = window.location.href.includes('ngrok') ? 'https://ml-forecast-as.azurewebsites.net/forecast' : 'http://shahbazalivk.pythonanywhere.com/forecast'

axios.post(url, {compare:compare, data:prices}).then((response)=>{
    if(response.data=='Insufficient Data!' || response.data=='Something went Wrong!'){
        alert(response.data)
    }
    else{
        let forecastPrices = response.data
        let forecastTimes = generateTimestamps()

        Plotly.plot('initial-chart', [{ x: timestamps, y: prices, name: "Given" }],
        {title:"Forecast Sales", font:{size: 12}, hoverlabel:{font: {color: 'white'}}}, config)
        Plotly.plot('initial-chart', [{ x: forecastTimes, y: forecastPrices, name: "Prediction" }], 
        {title:"Forecast Sales", font:{size: 12}, hoverlabel:{font: {color: 'white'}}}, config)
    }
}).catch(()=>{
    alert('Something went Wrong!')
})

function generateTimestamps(){
    let generated = []

    if(compare=='month'){
        let last_stamp = timestamps.slice(-1)[0]
        let mm = Number(last_stamp.split('/')[0])
        let yy = Number(last_stamp.split('/')[1])
        
        for(let i=0; i<12; i++){
            if(mm==12){mm=1; yy++}
            else mm++
            generated.push(`${mm}/${yy}`)
        }
    }
    else if(compare=='year'){
        let last_stamp = timestamps.slice(-1)[0]
        last_stamp = Number(`${last_stamp[0]}${last_stamp[1]}${last_stamp[3]}${last_stamp[4]}`)
        
        for(let i=0; i<3; i++){
            last_stamp++
            generated.push(`${last_stamp}`)
        }
    }

    return generated
}