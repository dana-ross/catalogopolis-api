/**
 * @file Unit tests for the Doctor class
 */

import 'mocha'
import {assert, expect} from 'chai'
import { Writer } from "../../app/src/writer"

describe('Writer', function () {

	it('generates correct restV1 URLs', () => {
		expect(Writer.restv1URL(1)).to.be.a('string')
		assert.equal('/v1/writers/1', Writer.restv1URL(1), 'Writer restv1URL is correct');
	})

	it('can add HATEAOS data to an instance', () => {
		let original = new Writer, mutated = Writer.addHATEAOSTo(original)
		expect(mutated).to.be.an.instanceof(Writer)
		expect(mutated).to.have.property('links')
	})

	it('can add HATEAOS data to the current instance', () => {
		let original = new Writer, mutated = original.addHATEAOS()
		expect(mutated).to.be.an.instanceof(Writer)
		expect(mutated).to.have.property('links')
	})

})
