import L from 'leaflet';

import { isDomAvailable } from 'lib/util';

const useConfigureLeaflet = () => {
  if ( !isDomAvailable()) return;

  //https://github.com/PaulLeCam/react-leaflet/issues/453#issuecomment-410450387 for the leaflet default icon issue

  delete L.Icon.Default.prototype._getIconUrl;

  L.Icon.Default.mergeOptions({
    iconRetinaUrl: require( 'leaflet/dist/images/marker-icon-2x.png' ),
    iconUrl: require( 'leaflet/dist/images/marker-icon.png' ),
    shadowUrl: require( 'leaflet/dist/images/marker-shadow.png' ),
  });
};

export default useConfigureLeaflet;
