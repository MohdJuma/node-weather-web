const request = require('request')

const forecast = (latitude,longitude, callback)=> {
    const url='http://api.weatherstack.com/current?access_key=91d421e430057c324ec649b92f65cee4&query='+latitude+ ','+longitude

    request({url,json:true},(error,{body})=>{

        if(error){
            callback('Unable to connect to weather service', undefined)
        } else if(body.error){
            callback('unable to find location ', undefined)
        } else{
            callback(undefined,
                'What I see outside is '+ body.current.weather_descriptions[0]+' and it is ' +body.current.temperature+'°C but it feels like ' +body.current.feelslike+'°C'
            )
        }

    })
}

module.exports = forecast