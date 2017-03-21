var assert = require('chai').assert
var expect = require('chai').expect
import 'mocha'
import { Actor } from "../../app/src/actor"

describe('Actor', function () {
	it('generates correct restV1 URLs', function () {
		expect(Actor.restv1URL(1)).to.be.a('string')
		assert.equal('/v1/actors/1', Actor.restv1URL(1), 'Actor restv1URL is correct');
	})
})
