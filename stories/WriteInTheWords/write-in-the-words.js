import React from 'react'
import DialogueTree from '../../src/index'

export default (props) => {
  return (
    <div className="dialogue-tree-container">
      <DialogueTree
        {...props}
        onDialogueEnd={() => { alert('onDialogueEnd called') }}
      />
    </div>
  )
}
