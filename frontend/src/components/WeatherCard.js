import React from 'react';

class WeatherCard extends React.Component {

  render() {
    let newDate = new Date();
    const weekday = this.props.day.dt * 1000
    newDate.setTime(weekday)

    const imgURL = "owf owf-"+ this.props.day.weather[0].id +" owf-5x red"

    return (
      <div style={{width:'150px',float:'left',margin:'10px'}}>
        <div className="card">
          <h5 className="">{this.props.day.dt_txt.slice(8,10)}/{this.props.day.dt_txt.slice(5,7)}/{this.props.day.dt_txt.slice(0,4)}</h5>
          <i className={imgURL}></i>
          <h4>Max: {Math.ceil(this.props.day.main.temp_max)} °C</h4><h4>Min: {Math.floor(this.props.day.main.temp_min)} °C</h4>
          <div className="card-body">
            <p className="card-text">{this.props.day.weather[0].description}</p>
          </div>
        </div>
      </div>
    )
  }
}

export default WeatherCard;