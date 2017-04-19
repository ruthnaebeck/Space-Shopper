/* global describe it beforeEach */

import React from 'react'
import chai, {expect} from 'chai'
chai.use(require('chai-enzyme')())
import {shallow} from 'enzyme'
import {spy} from 'sinon'
chai.use(require('sinon-chai'))
import {createStore} from 'redux'

import App from './App'
import { Planets } from './Planets'

describe('Planets Component', () => {

  describe('fetching all planets', () => {
    let planetsFromDb, renderedPlanets
    beforeEach('create copy of app', () => {
      renderedPlanets = shallow(<Planets planets={[{id: 1, name: 'Mars'}]}/>)
    })

    it('has the correct number of planets', () => {
      expect(renderedPlanets.children).to.have.length(1)
    })
  })
})

// test that all planets were fetched correctly
  // length of array - # of planets
  // check specific property-value of a known planet?

