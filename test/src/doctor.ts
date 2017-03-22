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
		let doctor = new Doctor, mutatedDoctor = Doctor.addHATEAOSTo(doctor)
		expect(mutatedDoctor).to.be.an.instanceof(Doctor)
		expect(mutatedDoctor).to.have.property('links')
	})

	it('can add HATEAOS data to the current instance', () => {
		let doctor = new Doctor, mutatedDoctor = doctor.addHATEAOS()
		expect(mutatedDoctor).to.be.an.instanceof(Doctor)
		expect(mutatedDoctor).to.have.property('links')
	})

})
