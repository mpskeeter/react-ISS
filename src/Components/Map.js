import React from 'react';
import { withScriptjs, withGoogleMap, GoogleMap } from 'react-google-maps';
import { compose, withProps } from 'recompose';
import PropTypes from 'prop-types';

import ISSMarker from './ISSMarker';
import ISSPolyline from './ISSPolyline';

const propTypes = {
  history: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const Map = compose(
  withProps({
    googleMapURL: 'https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places',
    loadingElement: <div style={{ height: '100%' }} />,
    containerElement: <div style={{ height: '500px' }} />,
    mapElement: <div style={{ height: '100%' }} />,
  }),
  withScriptjs,
  withGoogleMap,
)(({
  history,
}) => {
  console.log(history);
  const current = history[history.length - 1];
  const line = history.map(item => (
    {
      lat: item.latitude,
      lng: item.longitude,
    }
  ));

  console.log(line);

  return (
    <GoogleMap
      defaultZoom={2}
      defaultCenter={{ lat: 0, lng: 0 }}
    >
      {history.length > 1 && <ISSPolyline path={line} />}
      {
        history.length > 0 && <ISSMarker
          key={`${current.latitude}:${current.longitude}`}
          position={{
            lat: current.latitude,
            lng: current.longitude,
          }}
        />
      }
      {/* {
        history.map(item => (
          <ISSMarker
            key={`${item.latitude}:${item.longitude}`}
            position={{
              lat: item.latitude,
              lng: item.longitude,
            }}
          />
        ))
      } */}
    </GoogleMap>
  );
});

Map.propTypes = propTypes;

export default Map;
