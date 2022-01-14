/* eslint-env jest */

import '@testing-library/jest-dom/extend-expect'
import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import DialogueTree from './src/DialogueTreeContainer.js'

const dialogue = `title: Start
---
<<declare $var1=false>>
<<set $var2=5>>
I am a line
I am also a line
-> I am an option
  I am the line after the first option!
-> I am a second option
  I am the line after the second option!
-> I am a disabled option<<if $var1 is true>>
  I should not show
I am another line. $var2 is {$var2}
I am yet another line. Here's a three: {returnThree()}
===`

describe('react-dialogue-tree', () => {
  test('runs a dialogue', async () => {
    render(
      <DialogueTree
        dialogue={dialogue}
        functions={{ returnThree: () => 3 }}
      />
    )

    expect(screen.getByText('I am a line')).toBeVisible()
    await userEvent.click(screen.getByText('Next'))
    expect(screen.getByText('I am also a line')).toBeVisible()
    expect(screen.queryByText('Next')).toBeNull()
    expect(screen.getByText('I am an option')).toBeVisible()
    expect(screen.getByText('I am a second option')).toBeVisible()
    expect(screen.getByText('I am a disabled option')).toBeVisible()
    expect(screen.getByText('I am a disabled option')).toHaveClass('dialogue-node__option--disabled')
    await userEvent.click(screen.getByText('I am a disabled option'))
    expect(screen.queryByText('I should not show')).toBeNull()
    await userEvent.click(screen.getByText('I am a second option'))
    expect(screen.getByText('I am the line after the second option!')).toBeVisible()
    await userEvent.click(screen.getByText('Next'))
    expect(screen.getByText('I am another line. $var2 is 5')).toBeVisible()
    await userEvent.click(screen.getByText('Next'))
    expect(screen.getByText("I am yet another line. Here's a three: 3")).toBeVisible()
  })
})
