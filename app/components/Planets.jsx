import React from 'react'
import { connect } from 'react-redux';
import Campuses from '../components/Campuses'
import { selectCampus, deleteACampus } from '../action-creators/campuses'

const Planets = (props) => {
  return (
    <div>
      {props.planets.map((planet) => {
        return (<div key={planet.id} className="col-md-4">{planet.name}</div>)
      })}
    </div>
  )
}


const mapStateToProps = (state) => {
  // to access prop in current state - state.campusData.campuses
  return {
    planets: state.planets.planets,
  }
}

const mapDispatchToProps = (dispatch) => {
}

export default connect(
  mapStateToProps, mapDispatchToProps
  )(Planets)

