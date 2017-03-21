/**
 * @file Unit tests for the Actor class
 */

import 'mocha'
import {assert, expect} from 'chai'
import { Actor } from "../../app/src/actor"

describe('Actor', function () {

	it('generates correct restV1 URLs', () => {
		expect(Actor.restv1URL(1)).to.be.a('string')
		assert.equal('/v1/actors/1', Actor.restv1URL(1), 'Actor restv1URL is correct');
	})

	it('can add HATEAOS data to an instance', () => {
		let actor = new Actor, mutatedActor = Actor.addHATEAOSTo(actor)
		expect(mutatedActor).to.be.an.instanceof(Actor)
		expect(mutatedActor).to.have.property('links')
	})

	it('can add HATEAOS data to the current instance', () => {
		let actor = new Actor, mutatedActor = actor.addHATEAOS()
		expect(mutatedActor).to.be.an.instanceof(Actor)
		expect(mutatedActor).to.have.property('links')
	})

	it('instantiates a new Actor from an object or database row', () => {
		let actor = Actor.fromRow({id: 5, name: 'Test', links: []})
	})

})
