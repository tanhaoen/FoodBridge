import React from 'react';
import * as Location from 'expo-location';

import { useMutation } from "convex/react";
import { api } from "../convex/_generated/api";

const LocationContext = React.createContext();

const LocationProvider = ({ children }) => {
    const [location, setLocation] = React.useState(null);
    const [errorMsg, setErrorMsg] = React.useState(null);

    const updateLocation = useMutation(api.users.updateLocation);
  
    React.useEffect(() => {
      (async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
          return;
        }
  
        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);

        updateLocation({ id: "jh7dd7a3s178tyv4dzz2m1ebrd6nbsq7", latitude: location.coords.latitude, longitude: location.coords.longitude });
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