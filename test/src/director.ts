/**
 * @file Unit tests for the Director class
 */

import 'mocha'
import {assert, expect} from 'chai'
import { Director } from "../../app/src/director"

describe('Director', function () {

	it('generates correct restV1 URLs', () => {
		expect(Director.restv1URL(1)).to.be.a('string')
		assert.equal('/v1/directors/1', Director.restv1URL(1), 'Director restv1URL is correct');
	})

	it('can add HATEAOS data to an instance', () => {
		let director = new Director, mutatedDirector = Director.addHATEAOSTo(director)
		expect(mutatedDirector).to.be.an.instanceof(Director)
		expect(mutatedDirector).to.have.property('links')
	})

	it('can add HATEAOS data to the current instance', () => {
		let director = new Director, mutatedDirector = director.addHATEAOS()
		expect(mutatedDirector).to.be.an.instanceof(Director)
		expect(mutatedDirector).to.have.property('links')
	})

	it('instantiates a new Director from an object or database row', () => {
		let director = Director.fromRow({id: 5, name: 'Test', links: []})
		expect(director).to.be.an.instanceof(Director)
		expect(director.id).to.be.a('number')
		expect(director.id).to.equal(5)
		expect(director.name).to.be.a('string')
		expect(director.name).to.equal('Test')

	})

})
