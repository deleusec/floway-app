// hooks/useLocationTracking.ts
import { useEffect, useState } from 'react';
import * as Location from 'expo-location';

const useLocationTracking = () => {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [path, setPath] = useState<{ latitude: number; longitude: number }[]>([]);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      setPath([{ latitude: location.coords.latitude, longitude: location.coords.longitude }]);

      Location.watchPositionAsync(
        { accuracy: Location.Accuracy.High, timeInterval: 1000, distanceInterval: 1 },
        (newLocation) => {
          setLocation(newLocation);
          setPath((prevPath) => [
            ...prevPath,
            { latitude: newLocation.coords.latitude, longitude: newLocation.coords.longitude },
          ]);
        }
      );
    })();
  }, []);

  return { location, path };
};

export default useLocationTracking;
