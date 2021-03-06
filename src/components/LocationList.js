import React, { Component } from "react";
import Place from "./Place";


class LocationList extends Component {
      state = {
        locations: "",
        query: "",
        suggestions: true
      };
  
      filterLocations = this.filterLocations.bind(this);
    
    /** Filter Locations based on user query*/
    filterLocations(e) {
      this.props.closeInfoWindow();
      const { value } = e.target;
      var locations = [];
      this.props.locations.forEach(function(location) {
        if (location.title.toLowerCase().indexOf(value.toLowerCase()) >= 0) {
          location.marker.setVisible(true);
          locations.push(location);
        } else {
          location.marker.setVisible(false);
        }
      });
  
      this.setState({
        locations: locations,
        query: value
      });
    }
  
    componentWillMount() {
      this.setState({
        locations: this.props.locations
      });
    }

  
    /** render function of Location List*/
    render() {
      var locationlist = this.state.locations.map(function(listItem, index) {
        return (
          <Place
            key={index}
            populateInfoWindow={this.props.populateInfoWindow.bind(this)}
            data={listItem}
          />
        );
      }, this);
  
      return (  
        // <div id="mySidenav" class="sidenav">
            // <a href="javascript:void(0)" class="closebtn" onClick={this.closeNav()}>&times;</a>
            <div className="search-area">
                <input
                    role="search"
                    aria-labelledby="filter"
                    id="search-field"
                    className="search-input"
                    type="text"
                    placeholder="Filter"
                    value={this.state.query}
                    onChange={this.filterLocations}
                />
                <ul className="location-list">
                    {this.state.suggestions && locationlist}
                </ul>
            </div>
        // </div>
      );
    }
  }
  
  export default LocationList;
  
