import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

import pin from '../assets/pin.png'

class Mapa extends Component {
    static defaultProps = {
        zoom: 11
    };

    render() {

        return (
            // Important! Always set the container height explicitly
            <div style={this.props.mapstyle}>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: "AIzaSyBRx0vzhwFusq4BnyhWbhL4VnHmPH1XgfA" }}
                    center={this.props.center}
                    zoom={this.props.zoom}
                    heatmapLibrary={true}
                    heatmap={{ positions: this.props.heatmap, options: { radius: 20, opacity: 0.6, } }}
                >

                    {this.props.heatmap === undefined ? <img src={pin} alt="pin" lat={this.props.center.lat} lng={this.props.center.lng} style={{ height: 18, width: 10 }} /> : <></>
                    }
                </GoogleMapReact>
            </div>
        );
    }
}
export default Mapa;
