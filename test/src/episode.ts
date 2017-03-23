/**
 * @file Unit tests for the Doctor class
 */

import 'mocha'
import {assert, expect} from 'chai'
import { Episode } from "../../app/src/episode"

describe('Episode', function () {

	it('generates correct restV1 URLs', () => {
		expect(Episode.restv1URL(1)).to.be.a('string')
		assert.equal('/v1/episodes/1', Episode.restv1URL(1), 'Episode restv1URL is correct');
	})

	it('can add HATEAOS data to an instance', () => {
		let original = new Episode, mutated = Episode.addHATEAOSTo(original)
		expect(mutated).to.be.an.instanceof(Episode)
		expect(mutated).to.have.property('links')
	})

	it('can add HATEAOS data to the current instance', () => {
		let original = new Episode, mutated = original.addHATEAOS()
		expect(mutated).to.be.an.instanceof(Episode)
		expect(mutated).to.have.property('links')
	})

})
