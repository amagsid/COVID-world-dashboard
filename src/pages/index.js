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

  /**
   * mapEffect
   * @description Fires a callback once the page renders
   * @example Here this is and example of being used to zoom in and set a popup on load
   */

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
    // var myLines = [
    //   {
    //     type: 'LineString',
    //     coordinates: [
    //       [-100, 40],
    //       [-105, 45],
    //       [-110, 55],
    //     ],
    //   },
    //   {
    //     type: 'LineString',
    //     coordinates: [
    //       [-105, 40],
    //       [-110, 45],
    //       [-115, 55],
    //     ],
    //   },
    // ];

    // var myStyle = {
    //   color: '#ff7800',
    //   weight: 5,
    //   opacity: 0.65,
    // };

    // L.geoJSON( myLines, {
    //   style: myStyle,
    // }).addTo( map );

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

  return (
    <Layout pageName="home">
      <Helmet>
        <title>Home Page</title>
      </Helmet>
      <Container fluid>
        <Row>
          <Col md={9} className="tracker">
            <Dashboard />
            <Row>
              <Col md={3} className={'col-styling'}>
                <CasesDeathsByCountry />
              </Col>
              <Col md={9}>
                <Map {...mapSettings} />
              </Col>
            </Row>

            <div className="tracker-last-updated">
              <p>Last Updated: { stats ? friendlyDate( stats?.updated ) : '-' }</p>
            </div>
          </Col>
          <Col md={3} className={'mt-2 pl-0'}>
            <Col className={' col-styling ml-3'} style={{ height: '850px' }}>
              <Charts />
            </Col>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default IndexPage;
