import React from 'react'
import { connect } from 'react-redux';
import {Link} from 'react-router'
// need selectPlanet action-creator/action sets clickedOn planet
import { Link } from 'react-router';

<<<<<<< HEAD
const Planets = (props) => {

=======
export const Planets = (props) => {
  console.log('props in planets', props.planets)
>>>>>>> 67bf99f3f9439d83d3e1d05c1f8ff63fcce8d7ac
  return (
    <div>
      {props.planets.map((planet) => {
        return (<div key={planet.id} className="col-md-4">
<<<<<<< HEAD
          <Link to={`/api/planets/${planet.id}`}>
            <span><h3>{planet.name}</h3>
             <img src={planet.image}/>
=======
          <Link to={`/planets/${planet.id}`}>
            <span><h2>{planet.name}</h2>
             <img src={planet.image} />
>>>>>>> 67bf99f3f9439d83d3e1d05c1f8ff63fcce8d7ac
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

