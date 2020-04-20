
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
//messageOne.textContent = 'from javascript'

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value

    messageOne.textContent = 'loading...'
    messageTwo.textContent = ''

    fetch('http://localhost:3000/weather?address='+encodeURIComponent(location)).then((response) => {
    response.json().then((data) => {
        if(data.error){
            messageOne.textContent = data.error
        }else{
            console.log(data.forecast)
            messageOne.textContent = "for: " + data.forecast.placeName 
            messageTwo.textContent = 'it is: ' + data.forecast.weatherCondition[0] + " with a temperature of: " + data.forecast.currentTemperature + " degrees C."
        }
    })
})
})