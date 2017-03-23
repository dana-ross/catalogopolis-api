/**
 * @file Unit tests for the Doctor class
 */

import 'mocha'
import {assert, expect} from 'chai'
import { Serial } from "../../app/src/serial"

describe('Serial', function () {

	it('generates correct restV1 URLs', () => {
		expect(Serial.restv1URL(1)).to.be.a('string')
		assert.equal('/v1/serials/1', Serial.restv1URL(1), 'Serial restv1URL is correct');
	})

	it('can add HATEAOS data to an instance', () => {
		let original = new Serial, mutated = Serial.addHATEAOSTo(original)
		expect(mutated).to.be.an.instanceof(Serial)
		expect(mutated).to.have.property('links')
	})

	it('can add HATEAOS data to the current instance', () => {
		let original = new Serial, mutated = original.addHATEAOS()
		expect(mutated).to.be.an.instanceof(Serial)
		expect(mutated).to.have.property('links')
	})

})
