import Geocode from 'react-geocode';

const getLocation = () => {
    Geocode.setLocationType("ROOFTOP");
	Geocode.enableDebug();
	Geocode.setApiKey('AIzaSyD6VMRDeZ6kVDa7BP4rgVx5NdFanIQOa3g')
    const successCallback = (position)=>{
		console.log(position)
        let region = null;
		const {longitude, latitude} = position.coords;
		Geocode.fromLatLng('55.848525', '-4.226761').then(
			(response) => {
				console.log('response is ', response);
				response.results[0].address_components.forEach((addressComponent)=>{
					if(addressComponent.types[0]==='administrative_area_level_2'){
						region = addressComponent.long_name;
						console.log('region is ', region)
					}
					else{
						console.log('Could not find the administrative area')
                        return response.results[0]
					}
				})
			},
			(error) => {
			  console.error(error);
			}
		  );
        return region;
	}
	const errorCallback = (msg)=>{
		console.log(msg)
	}


    if ("geolocation" in navigator) {
        console.log("Location services available");
      } else {
        console.log("Location services not Available");
      }
    
    navigator.geolocation.getCurrentPosition(successCallback,errorCallback,{timeout:10000});
}
export default getLocation;