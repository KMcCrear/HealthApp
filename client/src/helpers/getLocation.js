import Geocode from 'react-geocode';

const getLocation = (setLocation, setError) => {
    Geocode.setLocationType("ROOFTOP");
	Geocode.enableDebug();
	Geocode.setApiKey('AIzaSyD6VMRDeZ6kVDa7BP4rgVx5NdFanIQOa3g')
    let result = null;
    const successCallback = (position)=>{
		console.log(position)
		const {longitude, latitude} = position.coords;
		Geocode.fromLatLng(latitude, longitude).then(
			(response) => {
				console.log('response is ', response);
				response.results[0].address_components.forEach((addressComponent)=>{
					if(addressComponent.types[0]==='administrative_area_level_2' || addressComponent.types[0]==='postal_town'){
						result = addressComponent.long_name;
                        console.log('region is ', result)
                        setLocation(result)
                    }
                    if(addressComponent.types[0]==='country' && addressComponent.long_name!=='United Kingdom'){
                        //address outside UK - api wont work
                        setError(`You are located in ${addressComponent.long_name}. We only support UK addresses.`)
                    }
				})
			},
			(error) => {
			  console.error(error);
			}
		  );
	}
	const errorCallback = (msg)=>{
        setError(msg.message)
    }
    
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback, { timeout: 10000 });
}
export default getLocation;