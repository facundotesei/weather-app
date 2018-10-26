import _ from "lodash";
import React, { Component } from "react";
import { ROOT_URL } from '../actions';
import axios from 'axios';
import '../style/locacion_item.css'
import { IMG_API_URL, IMG_API_KEY } from '../constants';

class LocacionList extends Component {
    constructor(props) {
      super(props);
      this.state = { url:''};
    }
    
    componentDidMount() {
        const { name } = this.props.locacion;
        axios.get(`${IMG_API_URL}?key=${IMG_API_KEY}&q=${name}&image_type=photo&per_page=3`)
        .then((response) => this.setState({url:response.data.hits[0].largeImageURL}))             
    }

    onDeleteClick = () => {
      const { boardId, locacion: { id }, fetchBoard, auth } = this.props;
      const headers = auth.getHeaders(); 
      axios.delete(`${ROOT_URL}/boards/${boardId}/removeLocacion?lugarId=${id}`, { headers }) 
      .then(() => fetchBoard(boardId, this.props.auth.getHeaders()));             
    }

    render() {
    const styles = { backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.35), rgba(0, 0, 0, 0.17)), url(${this.state.url})`, 
                     backgroundPosition: 'center center',
                     backgroundSize: 'cover',
                     backgroundRepeat: 'no-repeat',
                     backgroundClip: 'border-box',    
                   } 
    if (!this.props.locacion) { return <div>Loading...</div>; }

    const { name, weather, main: { humidity, pressure, temp, temp_max, temp_min }, wind, clouds } = this.props.locacion;
    let WEATHER_ICON = `http://openweathermap.org/img/w/${weather[0].icon}.png`;
    return (
        <tr>
           <td style={styles} className="column" >
             <div className="content">
               <p>{name}</p>
               <p className="temp">{_.round(temp - 273.15)}ºC</p>
               <p className="descrip"><img src={WEATHER_ICON} alt='icon'/>{_.capitalize(weather[0].description)}</p>
               <p className="humidity">{humidity} <i className="wi wi-humidity" /></p>
               <p className="pressure">{pressure} hPa <i className="wi wi-barometer" /></p>
               <p className="speed">{wind.speed} m/s <i className="wi wi-strong-wind" /></p>
               <p className="clouds">{clouds.all} % <i className="wi wi-cloudy" /></p>
               <p className="temperatures">
                  <i className="wi wi-thermometer" />
                  <i className="wi wi-direction-down"> {_.round(temp_min - 273.15)}º </i> 
                  <i className="wi wi-direction-up"> {_.round(temp_max - 273.15)}º </i>                  
               </p>
               <span className="glyphicon glyphicon-remove" aria-hidden="true" onClick={this.onDeleteClick} />
             </div>
           </td>
        </tr>
    );
  }
}

export default LocacionList