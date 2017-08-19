/**
 * @file Unit tests for the Actor class
 */

import 'mocha'
import {assert, expect} from 'chai'
import { Actor, Gender } from "../../app/src/actor"

describe('Actor', function () {

	it('generates correct restV1 URLs', () => {
		expect(Actor.restv1URL(1)).to.be.a('string')
		assert.equal('/v1/actors/1', Actor.restv1URL(1), 'Actor restv1URL is correct');
	})

	it('can add HATEAOS data to an instance', () => {
		let original = new Actor, mutated = Actor.addHATEAOSTo(original)
		expect(mutated).to.be.an.instanceof(Actor)
		expect(mutated).to.have.property('links')
	})

	it('can add HATEAOS data to the current instance', () => {
		let original = new Actor, mutated = original.addHATEAOS()
		expect(mutated).to.be.an.instanceof(Actor)
		expect(mutated).to.have.property('links')
	})

	it('instantiates a new Actor from an object or database row', () => {
		let actor = Actor.fromRow({id: 5, name: 'Test', gender: Gender["male"], links: []})
	})

})
