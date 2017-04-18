import React from 'react'
import { connect } from 'react-redux';
import Campuses from '../components/Campuses'
import { selectCampus, deleteACampus } from '../action-creators/campuses'

const Planets = (props) => {
  return (
    <div>
      {props.planets.map((planet) => {
        return (<div key={planet.id} className="col-md-4">
          <Link>
            <span><h3>{planet.name}</h3>
             <img />
            </span>
          </Link>
        </div>)
      })}
    </div>
  )
}

// TODOS HERE:
// - for <Link> {/*insert link to one planet*/}
// - for <img /> {/*inset image src of planet*/}


const mapStateToProps = (state) => {
  // will need to check our state once connected to DB
  return {
    planets: state.planets.planets,
  }
}

const mapDispatchToProps = (dispatch) => {
}

export default connect(
  mapStateToProps, mapDispatchToProps
  )(Planets)
