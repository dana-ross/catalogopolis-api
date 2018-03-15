/**
 * @file Unit tests for the Companion class
 */

import 'mocha'
import {assert, expect} from 'chai'
import { Companion } from "../../app/src/companion"

describe('Companion', function () {

	it('generates correct restV1 URLs', () => {
		expect(Companion.restv1URL(1)).to.be.a('string')
		assert.equal('/v1/companions/1', Companion.restv1URL(1), 'Companion restv1URL is correct');
	})

	it('can add HATEAOS data to an instance', () => {
		let original = new Companion, mutated = Companion.addHATEAOSTo(original)
		expect(mutated).to.be.an.instanceof(Companion)
		expect(mutated).to.have.property('links')
	})

	it('can add HATEAOS data to the current instance', () => {
		let original = new Companion, mutated = original.addHATEAOS()
		expect(mutated).to.be.an.instanceof(Companion)
		expect(mutated).to.have.property('links')
	})

	it('instantiates a new Companion from an object or database row', () => {
		let instance = Companion.fromRow({id: 5, name: 'Test', links: []})
		expect(instance).to.be.an.instanceof(Companion)
		expect(instance.id).to.be.a('number')
		expect(instance.id).to.equal(5)
		expect(instance.name).to.be.a('string')
		expect(instance.name).to.equal('Test')

	})

})
