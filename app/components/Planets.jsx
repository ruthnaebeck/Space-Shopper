import React from 'react'
import { connect } from 'react-redux';
import {Link} from 'react-router'


export const Planets = (props) => {
  return (
    <div>
      {
        props.planets.map((planet) => {
          return (<div key={planet.id} className="col-md-4 planets">
            <Link to={`/planets/${planet.id}`}>
              <span><h2>{planet.name}</h2>
              <img className="planetImage" src={planet.image} />
              </span>
            </Link>
          </div>)
        })
      }
    </div>
  )
}

const mapStateToProps = ({planets}) => ({planets})

const mapDispatchToProps = null

export default connect(
  mapStateToProps, mapDispatchToProps
  )(Planets)
