# React Dialogue Tree

React Dialogue Tree is a component for displaying a videogame-style dialog box on a web page or in a react app. It accepts and presents a dialogue written in the [Yarn Language](https://yarnspinner.dev/).

Under the hood, it uses [Bondage.js](https://github.com/mnbroatch/bondage). This repo also functions as an example of how to integrate Bondage.js into a component.

# Installation
----------------

`npm i -S react-dialogue-tree`


# Usage

If you want to use React Dialogue Tree in some component:

```javascript
import React from 'react'
import DialogueTree from 'react-dialogue-tree'
import 'react-dialogue-tree/dist/react-dialogue-tree.css'

export default function SomeComponent (dialogue) {
  return <DialogueTree dialogue={dialogue} /> 
}
```

### Props

**dialogue (required if no "runner" prop)**: *string* - The Yarn dialogue to run. A .yarn file in string form.

**runner (required if no "dialogue" prop)**: *YarnBound* - An existing YarnBound runner to use instead of instantiating a new one

**startAt**: *string*: - The title of the node to start the dialogue on.
  - default: "Start"

**functions**: *object* - An object containing custom functions to run when they are called in a yarn expression.
  - As the Yarn docs mention, these should not have side effects. They may execute at unexpected times.

**variableStorage**: *object* - A custom storage object with `get()` and `set()` functions (a `new Map()`, for instance.)
  - Unless you have a specific need you can omit this and use the built-in default.
  - One use is supplying variables with initial values, though you could also do that in the dialogue.

**handleCommand**: *function* - This will be called with the Command Result as the single argument (see below for the data structure), when the dialogue hits a command.

**combineTextAndOptionsResults**: *boolean* - If this is false, options nodes will be shown by themselves rather than combined with the text prompt before them.
  - default: true

**onDialogueEnd**: *function* - Will fire when the last node of the dialogue is reached, with no arguments.

**defaultOption**: *string* - User will click this to advance from a text line.

**finalOption**: *string* - User will click this to end the dialogue.

**locale**: *string* - Used for pluralization markdown attributes.

# Styling

`import 'react-dialogue-tree/dist/react-dialogue-tree.css'`

or however else you like to manage your css.


# Command Result

Generic commands in your story will call the handleCommand function with an object like this:

```javascript
{
  "command": "someCommand",
  "hashtags": [],
  "metadata": {
    "title": "StartingNode",
    "someTag": "someTag",
    "filetags": [
      "someFiletag"
    ]
  }
}
```


# Installing as a standalone component:

```html
<html>
  <head>
    <script crossorigin src="https://unpkg.com/react@17/umd/react.production.min.js"></script>
    <script crossorigin src="https://unpkg.com/react-dom@17/umd/react-dom.production.min.js"></script>
    <script src="path-to-file/react-dialogue-tree.min.js"></script>
    <link rel="stylesheet" href="path-to-file/react-dialogue-tree.min.css">
  </head>
  <body>
    <div id="root"></div>
    <script>
      const dialogue = `
        title: Start
        ---
        This is a line of text.
        ===
      `
      ReactDOM.render(
        React.createElement(
          ReactDialogueTree.default, // "default" is important
          {dialogue},
        ),
        document.getElementById('root')
      )
    </script>
  </body>
</html>
```


How do I run this project locally?
----------------

Storybook is available for development:

`npm install`
`npm start`


# Other versions included

A minified version is available at `react-dialogue-tree/dist/react-dialogue-tree.min.js`.

If you want to transpile for yourself, use `import DialogueTree from 'react-dialogue-tree/src/index'` and make sure your transpiler isn't ignoring it. You will also need to transpile `yarn-bound` and `@mnbroatch/bondage`, and include all 3 in your bundle, if applicable.
