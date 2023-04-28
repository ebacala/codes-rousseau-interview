import { describe, expect, test } from 'vitest'
import { capitalizeString } from './string'

describe('String Helper', () => {
  test('capitalizeString', () => {
    expect(capitalizeString('teSt')).toEqual('Test')
  })
})