/**
 * @file Unit tests for the Doctor class
 */

import 'mocha'
import {assert, expect} from 'chai'
import { Doctor } from "../../app/src/doctor"

describe('Doctor', function () {

	it('generates correct restV1 URLs', () => {
		expect(Doctor.restv1URL(1)).to.be.a('string')
		assert.equal('/v1/doctors/1', Doctor.restv1URL(1), 'Doctor restv1URL is correct');
	})

	it('can add HATEAOS data to an instance', () => {
		let original = new Doctor, mutated = Doctor.addHATEAOSTo(original)
		expect(mutated).to.be.an.instanceof(Doctor)
		expect(mutated).to.have.property('links')
	})

	it('can add HATEAOS data to the current instance', () => {
		let original = new Doctor, mutated = original.addHATEAOS()
		expect(mutated).to.be.an.instanceof(Doctor)
		expect(mutated).to.have.property('links')
	})

})
