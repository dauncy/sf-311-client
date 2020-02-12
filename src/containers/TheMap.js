import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';
import InfoWindowEx  from '../components/InfoWindowEx.js'

const mapStyles = {
  width: '100%',
  height: '100%'
};

const containerStyle = {
  position: 'absolute',  
  width: '75%',
  height: '100%'
}

class TheMap extends Component {
  constructor(){
    super()
    this.state = {
      showingInfoWindow: false,  
      activeMarker: {},          
      selectedPlace: {}    
    }
  }

  componentWillUpdate(){
    this.onClose()
  }

  onMarkerClick = (props, marker, event) =>{
    console.log(props, marker)
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true})
  }
    

  onClose = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };

  handleClick=(event)=>{
    let slugId = this.state.selectedPlace.slugId
    
    this.props.history.push(`/issues/${slugId}`)
  }
  
  

  render() {
    return (
    
      <Map
        containerStyle={containerStyle}
        google={this.props.google}
        zoom={14}
        style={mapStyles}
        initialCenter={{
         lat: 37.7749,
         lng: -122.4194 }}
         
        
        >
          {this.props.data && this.props.data[0].map(object => 
         
          <Marker 
          onClick={this.onMarkerClick}
            position={{lat: object["latitude"],
                      lng: object["longitude"]}}
                      name={object.title}
                      address={object.address}
                      key={object.id}
                      mediaUrl={object.media_url}
                      status={object.status}
                      serviceDetails={object.service_details}
                      complaintDate={object.created_at}
                      slugId={object.id}

                      
            />)}
             <InfoWindowEx
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
          onClose={this.onClose}
          
        ><div  className="infoWindowGrid">
          <img className="issue-mediaUrl" src={this.state.selectedPlace.mediaUrl}></img>
          <div className="issue-title">
        <h4 >{this.state.selectedPlace.name}</h4>
        <button className="issuePage-button" onClick={this.handleClick}>Issue Page</button>
        <br></br>
        <br></br>
        <button className="add-button">Add to Que</button>
        </div>
         <p className="issue-details">{this.state.selectedPlace.serviceDetails && this.state.selectedPlace.serviceDetails.replace(/_/g, " ")}</p>
          <p className="issue-status">Status: {this.state.selectedPlace.status}</p>
          <p className= "issue-address">{this.state.selectedPlace.address}</p>
           <p className="issue-date">Complaint made: {this.state.selectedPlace.complaintDate && this.state.selectedPlace.complaintDate.slice(0, 10)}</p>
          

      </div></InfoWindowEx>
        </Map>
     
   
      
    )
  }
}

export default GoogleApiWrapper({
  apiKey: ''
})(TheMap);