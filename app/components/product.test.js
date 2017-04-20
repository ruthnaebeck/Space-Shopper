/* global describe it beforeEach */

import React from 'react'
import chai, {expect} from 'chai'
chai.use(require('chai-enzyme')())
import {shallow} from 'enzyme'
import {spy} from 'sinon'
chai.use(require('sinon-chai'))
import {createStore} from 'redux'

import App from './App'
import { Product } from './Product'

describe('Product Component', () => {
  describe('Inventory qty drop down menu', () => {
    let renderedProduct
    beforeEach('create copy of app', () => {
      renderedProduct = shallow(<Product selectedProduct={{ id: 1, name: 'Hotel1', invQty: 4 }}/>)
    })

    it('Has the correct number of options', () => {
      // console.log('result', renderedProduct.find('.qty'))
      expect(renderedProduct.find('option.qty')).to.have.length(4)
    })
  })
})
