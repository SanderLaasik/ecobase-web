<template>
    <div ref="map-root"
         style="width: 100%; height: 50%">
    </div>
  </template>
  
  <script>
    import View from 'ol/View'
    import Map from 'ol/Map'
    import TileLayer from 'ol/layer/Tile'
    import OSM from 'ol/source/OSM'
    import * as olProj from 'ol/proj';
    import VectorLayer from 'ol/layer/Vector'
    import VectorSource from 'ol/source/Vector'
    import GeoJSON from 'ol/format/GeoJSON'
    import 'ol/ol.css'
    import {register} from 'ol/proj/proj4'
    import proj4 from 'proj4'
    import { mapState } from 'vuex';
    
    proj4.defs("EPSG:3301",
        "+proj=lcc +lat_1=59.33333333333334 +lat_2=58 +lat_0=57.51755393055556 +lon_0=24 +x_0=500000 +y_0=6375000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs"
    )
    register(proj4)
  
    export default {
        name: 'MapContainer',
        components: {},
        props: {},
        vectorLayer: null,
        vectorData: [],
        methods: {
            getVectorData() {
                const data = {
                    type: 'Feature'
                };
                return data
            },
            setVectorProperties(standsCoordinates) {
                this.vectorData = {
                    type: 'Feature',
                    geometry: {
                        type: 'Polygon',
                        coordinates: standsCoordinates
                    }
                }
                const feature = new GeoJSON().readFeature(this.vectorData, {
                    featureProjection: 'EPSG:3857'
                });

                this.vectorLayer.setProperties({
                    source: new VectorSource({
                        features: [feature],
                    })
                })
            },
            drawMap() {
                new Map({
                    target: this.$refs['map-root'],
                    layers: [
                        new TileLayer({
                            source: new OSM(),
                        }),
                        this.vectorLayer
                    ],
        
                    view: new View({
                        zoom: 15,
                        //center: olProj.transform([578695.38, 6529427.28], 'EPSG:3301', 'EPSG:3857'),
                        center: olProj.transform([579273.785, 6589448.659], 'EPSG:3301', 'EPSG:3857'),
                        constrainResolution: true
                    }),
                })
            }
        },
        mounted() {
            this.vectorLayer = new VectorLayer()
            this.drawMap(this.vectorLayer)
        },
        computed: mapState(['stands']),
        watch: {
            stands() {
                const stands = this.$store.getters.getStandsAndCoordinates;
                var standsCoordinates = []
                stands.forEach(stand => {
                    var coordinates = []
                    stand.coordinates[0][0].forEach(standCoordinate => {
                        const coordinate = olProj.transform(standCoordinate, 'EPSG:3301', 'EPSG:4326')
                        coordinates.push(coordinate)
                    })
                    standsCoordinates.push(coordinates)
                });
                
                this.setVectorProperties(standsCoordinates)
            },
        },
    }
  </script>