import React from 'react';
import * as Location from 'expo-location';

const LocationContext = React.createContext();

const LocationProvider = ({ children }) => {
    const [location, setLocation] = React.useState(null);
    const [errorMsg, setErrorMsg] = React.useState(null);
  
    React.useEffect(() => {
      (async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
          return;
        }
  
        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
      })();
    }, []);

    let text = 'Waiting..';
    if (errorMsg) {
        text = errorMsg;
    } else if (location) {
        text = JSON.stringify(location);
    }
  
    return (
      <LocationContext.Provider value={{ location, errorMsg }}>
        {children}
      </LocationContext.Provider>
    );
  };

export { LocationContext };

export default LocationProvider;