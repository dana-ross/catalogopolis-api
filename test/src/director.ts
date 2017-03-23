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
		let original = new Director, mutated = Director.addHATEAOSTo(original)
		expect(mutated).to.be.an.instanceof(Director)
		expect(mutated).to.have.property('links')
	})

	it('can add HATEAOS data to the current instance', () => {
		let original = new Director, mutated = original.addHATEAOS()
		expect(mutated).to.be.an.instanceof(Director)
		expect(mutated).to.have.property('links')
	})

	it('instantiates a new Director from an object or database row', () => {
		let instance = Director.fromRow({id: 5, name: 'Test', links: []})
		expect(instance).to.be.an.instanceof(Director)
		expect(instance.id).to.be.a('number')
		expect(instance.id).to.equal(5)
		expect(instance.name).to.be.a('string')
		expect(instance.name).to.equal('Test')

	})

})
