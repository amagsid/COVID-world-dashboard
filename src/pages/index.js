import React from 'react';
import Helmet from 'react-helmet';
import L from 'leaflet';
import { Row, Col } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import CasesDeathsByCountry from '../components/CasesDeathsByCountry';
import Charts from '../components/ChartsWrapper';
import { promiseToFlyTo, geoJsonToMarkers, clearMapLayers } from 'lib/map';
import { trackerLocationsToGeoJson, trackerFeatureToHtmlMarker } from 'lib/coronavirus';
import { friendlyDate } from 'lib/util';
import Dashboard from '../components/Dashboard';
import { useCoronavirusTracker } from 'hooks';
import Layout from 'components/Layout';
// import Container from 'components/Container';
import Map from 'components/Map';

// const LOCATION = {
//   lat: 0,
//   lng: 0,
// };
// const CENTER = [LOCATION.lat, LOCATION.lng];
const DEFAULT_ZOOM = 5;

const IndexPage = () => {
  const { data: countries = [] } = useCoronavirusTracker({
    api: 'countries',
  });

  const { data: stats = {} } = useCoronavirusTracker({
    api: 'all',
  });

  const hasCountries = Array.isArray( countries ) && countries.length > 0;

  async function mapEffect({ leafletElement: map } = {}) {
    if ( !map || !hasCountries ) return;

    clearMapLayers({
      map,
      excludeByName: ['Mapbox'],
    });

    const locationsGeoJson = trackerLocationsToGeoJson( countries );

    const locationsGeoJsonLayers = geoJsonToMarkers( locationsGeoJson, {
      onClick: handleOnMarkerClick,
      featureToHtml: trackerFeatureToHtmlMarker,
    });

    const bounds = locationsGeoJsonLayers.getBounds();

    locationsGeoJsonLayers.addTo( map );

    map.fitBounds( bounds );
  }

  function handleOnMarkerClick({ feature = {} } = {}, event = {}) {
    const { target = {} } = event;
    const { _map: map = {} } = target;

    const { geometry = {}, properties = {} } = feature;
    const { coordinates } = geometry;
    const { countryBounds, countryCode } = properties;

    promiseToFlyTo( map, {
      center: {
        lat: coordinates[1],
        lng: coordinates[0],
      },
      zoom: 10,
    });

    if ( countryBounds && countryCode !== 'US' ) {
      const boundsGeoJsonLayer = new L.GeoJSON( countryBounds );
      const boundsGeoJsonLayerBounds = boundsGeoJsonLayer.getBounds();

      map.fitBounds( boundsGeoJsonLayerBounds );
    }
  }

  const mapSettings = {
    // center: CENTER,
    defaultBaseMap: 'Mapbox',
    zoom: DEFAULT_ZOOM,
    mapEffect,
  };

  let updatedDate;

  if ( stats ) {
    updatedDate = friendlyDate( stats?.updated );
  }

  return (
    <Layout pageName="home">
      <Helmet>
        <title>Home Page</title>
      </Helmet>
      <Container fluid>
        <Row>
          <Col md={8} className="tracker">
            <Dashboard date={updatedDate} />
            <Row>
              <Col md={3} className={'col-styling p-0 '} style={{ maxHeight: '850px' }}>
                <CasesDeathsByCountry />
              </Col>
              <Col md={9}>
                <Map {...mapSettings} style={{ maxHeight: '800px' }} />
              </Col>
            </Row>
          </Col>
          <Col md={4} className={'mt-2 pl-0 col-styling scroll'} style={{ maxHeight: '850px' }}>
            <Charts />
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default IndexPage;
