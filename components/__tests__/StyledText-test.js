import * as React from 'react'
import { Text } from 'react-native'
import renderer from 'react-test-renderer'

import { expect, it } from '@jest/globals'

import { MonoText } from '../StyledText'

it('MonoText renders correctly', () => {
  const tree = renderer
    .create(
      <MonoText>
        <Text>Snapshot test!</Text>
      </MonoText>,
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
