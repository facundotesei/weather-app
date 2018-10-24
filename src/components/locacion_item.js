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
        const random = Math.floor(Math.random() * 2) + 0   
        axios.get(`${IMG_API_URL}?key=${IMG_API_KEY}&q=${name}&image_type=photo&per_page=3`)
        .then((response) => this.setState({url:response.data.hits[0].largeImageURL}))             
    }

    onDeleteClick = () => {
      axios.delete(`${ROOT_URL}/boards/${this.props.boardId}/removeLocacion?lugarId=${this.props.locacion.id}`)
      .then(() => this.props.fetchBoard(this.props.boardId));             
    }

  render() {
    const styles = { backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.35), rgba(0, 0, 0, 0.17))," + `url(${this.state.url})`, //55 y 85
                     backgroundPosition: 'center center',
                     backgroundSize: 'cover',
                     backgroundRepeat: 'no-repeat',
                     backgroundClip: 'border-box',    
                     height: '300px',
                     display: 'block',
                     marginLeft: 'auto',
                     marginRight: 'auto',
                     position: 'relative'
                   } 
    const { name, weather, main, wind, clouds } = this.props.locacion;
    if (!this.props.locacion) { return <div>Loading...</div>; }

    return (
        <tr>
           <td  style={styles} className={"column"} >
             <div className="content">
               <p>{name}</p>
               <p className="temp">{_.round(main.temp - 273.15)}ºC</p>
               <p className="descrip"><img src={`http://openweathermap.org/img/w/${weather[0].icon}.png`} alt='icon'/>{_.capitalize(weather[0].description)}</p>
               <p className="humidity">{main.humidity} <i className="wi wi-humidity"></i></p>
               <p className="pressure">{main.pressure} hPa <i className="wi wi-barometer"></i></p>
               <p className="speed">{wind.speed} m/s <i className="wi wi-strong-wind"></i></p>
               <p className="clouds">{clouds.all} % <i className="wi wi-cloudy"></i></p>
               <p className="temperatures">
                  <i className="wi wi-thermometer"></i>
                  <i className="wi wi-direction-down"> {_.round(main.temp_min - 273.15)}º </i> 
                  <i className="wi wi-direction-up"> {_.round(main.temp_max - 273.15)}º </i>                  
               </p>
               <span className="glyphicon glyphicon-remove" aria-hidden="true" onClick={this.onDeleteClick}></span>
             </div>
           </td>
        </tr>
    );
  }
}

export default LocacionList