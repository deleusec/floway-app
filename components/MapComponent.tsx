// components/MapComponent.tsx
import React, { useEffect, useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from 'react-native-maps';
import useLocationTracking from '../hooks/useLocationTracking';
import { FontAwesome5 } from '@expo/vector-icons';
import tw from '@/lib/tailwind';

const MapComponent = () => {
  const mapRef = useRef<MapView | null>(null);
  const { location, path } = useLocationTracking();

  useEffect(() => {
    if (mapRef.current && path.length > 1) {
      mapRef.current.fitToCoordinates(path, {
        edgePadding: { top: 10, right: 10, bottom: 10, left: 10 },
        animated: true,
      });
    }
  }, [path]);

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        customMapStyle={mapStyle}
        initialRegion={{
          latitude: location?.coords.latitude || 37.78825,
          longitude: location?.coords.longitude || -122.4324,
          latitudeDelta: 0.5,
          longitudeDelta: 0.5,
        }}
        region={{
          latitude: location?.coords.latitude || 37.78825,
          longitude: location?.coords.longitude || -122.4324,
          latitudeDelta: 0.5,
          longitudeDelta: 0.5,
        }}
      >
        {location && (
          <Marker coordinate={{ latitude: location.coords.latitude, longitude: location.coords.longitude }}>
            <FontAwesome5 name="map-marker-alt" size={24} style={tw`text-primary`} />
          </Marker>
        )}
        {path.length > 1 && <Polyline coordinates={path} strokeColor="#F0C038" strokeWidth={3} />}
      </MapView>
    </View>
  );
};

const mapStyle = [
  {
    elementType: 'geometry',
    stylers: [
      {
        color: '#1C1F26', // Background for general map areas
      },
    ],
  },
  {
    elementType: 'labels.icon',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#6E6E6E', // Text labels
      },
    ],
  },
  {
    elementType: 'labels.text.stroke',
    stylers: [
      {
        color: '#0F0F0F', // Text outline
      },
    ],
  },
  {
    featureType: 'administrative',
    elementType: 'geometry',
    stylers: [
      {
        color: '#2A2D36', // Administrative boundaries
      },
    ],
  },
  {
    featureType: 'administrative.country',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#8A8A8A', // Country labels
      },
    ],
  },
  {
    featureType: 'administrative.land_parcel',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'administrative.locality',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#6E6E6E', // Locality labels
      },
    ],
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#6E6E6E', // POI labels
      },
    ],
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry',
    stylers: [
      {
        color: '#131517', // Park areas
      },
    ],
  },
  {
    featureType: 'poi.park',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#3D3D3D', // Park labels
      },
    ],
  },
  {
    featureType: 'road',
    elementType: 'geometry.fill',
    stylers: [
      {
        color: '#23252A', // Road fill
      },
    ],
  },
  {
    featureType: 'road',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#5E5E5E', // Road labels
      },
    ],
  },
  {
    featureType: 'road.arterial',
    elementType: 'geometry',
    stylers: [
      {
        color: '#2C2C2C', // Arterial roads
      },
    ],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [
      {
        color: '#3A3A3A', // Highways
      },
    ],
  },
  {
    featureType: 'road.highway.controlled_access',
    elementType: 'geometry',
    stylers: [
      {
        color: '#474747', // Controlled access highways
      },
    ],
  },
  {
    featureType: 'road.local',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#5E5E5E', // Local road labels
      },
    ],
  },
  {
    featureType: 'transit',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#6E6E6E', // Transit labels
      },
    ],
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [
      {
        color: '#0A0A0A', // Water bodies
      },
    ],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#1D1D1D', // Water labels
      },
    ],
  },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  map: {
    width: '100%',
    height: '100%',
  },
});

export default MapComponent;
