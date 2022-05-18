import React, { useState } from 'react'
import useInterval from './use-interval'
import PropTypes from 'prop-types'

const FONT_INTERVAL = 500
const TYPEWRITER_INTERVAL = 100

export default function WriteInTheWordsText ({
  text
}) {
  const [displayedText, setDisplayedText] = useState('')
  const [fontIndex, setFontIndex] = useState(0)

  useInterval(() => {
    setDisplayedText(text.slice(0, displayedText.length + 1))
  }, TYPEWRITER_INTERVAL)

  useInterval(() => {
    setFontIndex(1 - fontIndex)
  }, FONT_INTERVAL)

  return (
    <div>
      <div className='dialogue-node__text'>
        {displayedText.split(' ').map((word, i) => (
          <div key={i} className='dialogue-node__word'>
            {i !== 0 && <div key={`${i}-space`} className='dialogue-node__letter'> </div>}
            {word.split('').map((letter, j) => (
              <div
                key={j}
                className={[
                  'dialogue-node__letter',
                  ['font-frente', 'font-amatic'][fontIndex]
                ].join(' ')}
              >
                {letter}
              </div>
            ))}
          </div>
        ))}
        </div>
        <div className='dialogue-node__spacer'>
          {text.split(' ').map((word, i) => (
            <div key={i} className='dialogue-node__word'>
              {i !== 0 && <div key={`${i}-space`} className='dialogue-node__letter'> </div>}
              {word.split('').map((letter, j) => (
                <div
                  key={j}
                  className={'dialogue-node__letter font-frente'}
                >
                  {letter}
                </div>
              ))}
            </div>
          ))}
      </div>
    </div>
  )
}

WriteInTheWordsText.propTypes = {
  text: PropTypes.string
}
