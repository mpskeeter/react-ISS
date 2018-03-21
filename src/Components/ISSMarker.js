/* global google */
import React from 'react';
import { Marker } from 'react-google-maps';

const ISSMarker = props => (
  <Marker
    icon={
      {
        path: google.maps.SymbolPath.CIRCLE,
        scale: 5,
      }
    }
    {...props}
  />
);

export default ISSMarker;
