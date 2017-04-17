import React from 'react'
import chai, {expect} from 'chai'
chai.use(require('chai-enzyme')())
import {shallow} from 'enzyme'
import {spy} from 'sinon'
chai.use(require('sinon-chai'))
import {createStore} from 'redux'

import App from './App'

const db = require('APP/db');
// const Planets = db.Planets; ????

describe('Planets Component', () => {

  describe('fetching all planets', () => {
    let planetsFromDb, appCopy;
    beforeEach('create copy of app', () => {
      appCopy = shallow(<App />)
      
    })

    it('has the correct number of planets', () => {
      Planets.findAll({})
      .then(planets => {
        planetsFromDb = planets
      })
      
      const dbArrLength = planetsFromDb.length
      expect(appCopy).to.have.length(dbArrLength)
    })

  })

}) 

// test that all planets were fetched correctly
  // length of array - # of planets
  // check specific property-value of a known planet?

