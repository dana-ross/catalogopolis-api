/**
 * @file Unit tests for the Doctor class
 */

import 'mocha'
import {assert, expect} from 'chai'
import { Season } from "../../app/src/season"

describe('Season', function () {

	it('generates correct restV1 URLs', () => {
		expect(Season.restv1URL(1)).to.be.a('string')
		assert.equal('/v1/seasons/1', Season.restv1URL(1), 'Season restv1URL is correct');
	})

	it('can add HATEAOS data to an instance', () => {
		let original = new Season, mutated = Season.addHATEAOSTo(original)
		expect(mutated).to.be.an.instanceof(Season)
		expect(mutated).to.have.property('links')
	})

	it('can add HATEAOS data to the current instance', () => {
		let original = new Season, mutated = original.addHATEAOS()
		expect(mutated).to.be.an.instanceof(Season)
		expect(mutated).to.have.property('links')
	})

})
