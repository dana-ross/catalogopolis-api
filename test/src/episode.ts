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
		let episode = new Episode, mutatedEpisode = Episode.addHATEAOSTo(episode)
		expect(mutatedEpisode).to.be.an.instanceof(Episode)
		expect(mutatedEpisode).to.have.property('links')
	})

	it('can add HATEAOS data to the current instance', () => {
		let episode = new Episode, mutatedEpisode = episode.addHATEAOS()
		expect(mutatedEpisode).to.be.an.instanceof(Episode)
		expect(mutatedEpisode).to.have.property('links')
	})

})
