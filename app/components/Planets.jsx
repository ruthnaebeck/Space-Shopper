import React from 'react'
import { connect } from 'react-redux';
import {Link} from 'react-router'
// need selectPlanet action-creator/action sets clickedOn planet

export const Planets = (props) => {
  console.log('props in planets', props.planets)
  return (
    <div>
      {props.planets.map((planet) => {
        return (<div key={planet.id} className="col-md-4">
          <Link to={`/planets/${planet.id}`}>
            <span><h3>{planet.name}</h3>
             <img src={planet.image} />
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

// const mapDispatchToProps = (dispatch) => {
// }

export default connect(
  mapStateToProps
  )(Planets)
