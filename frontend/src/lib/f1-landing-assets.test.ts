import assert from 'node:assert/strict'
import { test } from 'node:test'
import { applyDriverNumbers, type DriverNumberData } from './f1-driver-numbers.ts'
import { applyTeamAssets } from './f1-team-assets.ts'

test('applyTeamAssets fills self-hosted browse photos and logos', () => {
  const [ferrari, audi] = applyTeamAssets([
    { slug: 'ferrari', name: 'Ferrari' },
    { slug: 'audi', name: 'Audi' },
  ])
  assert.equal(ferrari.image, '/images/teams/browse/ferrari-china-2026.jpg')
  assert.equal(ferrari.logoImage, '/images/teams/logos/ferrari.svg')
  assert.ok(ferrari.imageFallback?.includes('Special:FilePath'))
  assert.equal(audi.logoImage, '/images/teams/logos/sauber.svg')
  assert.ok(audi.logoFallback?.includes('Audi-Logo'))
})

test('applyTeamAssets does not overwrite curated image fields', () => {
  const [team] = applyTeamAssets([
    { slug: 'ferrari', image: '/custom.jpg', logoImage: '/custom.svg' },
  ])
  assert.equal(team.image, '/custom.jpg')
  assert.equal(team.logoImage, '/custom.svg')
})

test('applyDriverNumbers maps live Jolpica ids onto browse slugs', () => {
  const data: DriverNumberData = {
    verstappen: {
      number: '3',
      numberImage: 'https://media.formula1.com/image/upload/verstappen.webp',
    },
  }
  const [max] = applyDriverNumbers([{ slug: 'verstappen' }], data)
  assert.equal(max.number, '3')
  assert.equal(max.numberImage, data.verstappen.numberImage)
})

test('applyDriverNumbers leaves unknown slugs unchanged', () => {
  const [driver] = applyDriverNumbers([{ slug: 'unknown' }], {})
  assert.equal(driver.number, undefined)
  assert.equal(driver.numberImage, undefined)
})
