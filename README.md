# React Dialogue Tree

...If you want the dialogue to start on a node other than "root", use the "startAt" string prop to specify another root-level dialogue node (similar to using the 'then' property).

What is it?
-----------

React Dialogue Tree is a react component that produces a video game-style branching dialogue.

It is extremely flexible:
  - Dialogue logic includes branching, looping, or jumping to any node.
  - You can run custom scripts when a node enters, or when a choice is made.
  - You can provide custom styles 
  - You can provide a custom react component to use instead of any (or every) node in the tree.

Excepting custom scripts, custom react components, and custom styles, the tree's only input is a simple, human readable JSON format.


How do I install it?
----------------

`npm i -S react-dialogue-tree`

How do I use it?
----------------

```javascript
import DialogueTree from 'react-dialogue-tree'

const myDialogueTree = <DialogueTree dialogue={{ root: { text: 'hello world' } }} />
```

The most important prop to this component is the `dialogue` prop. It is an object comprised of **dialogue nodes**.

A dialogue node represents one "stage" of the dialogue. Usually, a stage consists of a text prompt and one or more user choices.

### Basic Usage


##### text

Here is the simplest dialogue object possible. The dialogue object has one dialogue node at the path `root` of the tree:

    {
      "root": {
        "text": "hello world"
      }
    }

The user will see the `text` "hello world", and that's the end of the dialogue.

There must be a dialogue node at path `root`; this is where the dialogue starts.

`text` supports basic markdown syntax.


##### then

Here is another dialogue. Notice that the word "hello" uses markdown to display in bold.

    {
      "root": {
        "text": "**hello**",
        "then": {
          "text": "world"
        }
      }
    }

Notice that the root dialogue node has a `then` property, with a value that is itself a dialogue node.

Because there is a `then` but no `choices` property (more below), a single choice with the default text, "Continue", will be created.

The user will see **"hello"**, with the default choice. That choice leads to the text "world" and the end of the dialogue.

This is an equivalent way to write the above:

    {
      "root": {
        "text": "hello",
        "then": "world"
      },
      "world": {
        "text": "world"
      }
    }

The value of the `then` property can be either an inline dialogue node or a string with the id of the dialogue node to jump to.

Currently, you can only jump to siblings of the root node. That is to say, nodes at the top level of the dialogue object.

Loops are OK:

    {
      "root": {
        "text": "hello",
        "then": "world"
      },
      "world": {
        "text": "world"
        "then": "root"
      }
    }


##### choices

User choice is the reason to use a dialogue tree. This introduces **choice nodes**

    {
      "root": {
        "text": "How many roads must a man walk down?",
        "choices": [
          {
            "text": "42",
            "then": "42Roads"
          },
          {
            "text": "55 roads, *of course*!",
            "then": "55Roads"
          }
        ]
      },
      "42Roads": {
        "text": "Ain't that the truth!"
      },
      "55Roads": {
        "text": "That ain't the truth.",
        "then": "root"
      }
    }

Like dialogue nodes, choice nodes have `text` and `then` properties. The dialogue will progress to a choice node's `then` value if the choice is chosen.

Remember that a dialogue node with a `then` but no `choices` property gets a default "Continue" choice. **If the `choices` property is an empty array, not even the default choice will appear.**


### Styling


### Advanced

##### script

You can run custom functions either when a dialogue node is arrived at or a choice is chosen. These are supplied with a `customScripts` object.

    <DialogueTree
      dialogue={myDialogue}
      customScripts={{
        logHello: () => { console.log('hello') },
        logWorld: () => { console.log('world') }
      }}
    />

    /* myDialogue.json */ 

    {
      "root": {
        "text": "hello",
        "script": "logHello",
        "choices": [
          {
            "text": "world",
            "then": "world",
            "script": "logWorld"
          },
          {
            "text": "moon",
            "then": "moon"
          }
        ]
      },
      "world": {
        "text": "Hello, world!"
      },
      "moon": {
        "text": "Good night"
      }
    }

As soon as the dialogue starts, the root node is arrived at. The root node has a `script` property that points to `logHello`, so that runs. If the user then picks the "world" choice, the `logWorld` script runs because of the choice node's `script` property.

The customScripts object doesn't have to be flat; in the dialogue you can include the access path to the desired script, like so:


    const customScripts = {
      logs: {
        hello: () => { console.log('hello') },
        world: () => { console.log('world') }
      }
    }

    const worldNode = {
      "text": "world",
      "then": "world",
      "script": "logs.world"
    }


##### component

Instead of a `text` property, a dialogue node can have a `component` property. Components are supplied in a customComponents object.


    <DialogueTree
      dialogue={myDialogue}
      customComponents={{
        Echo: props => <div>{props.yell}, {props.yell}, {props.yell}</div>
      }}
    />


    /* myDialogue.json */ 

    {
      "root": {
        "component": "Echo",
        "yell": "echo"
      }
    }


This dialogue will show the arbitrarily-added "yell" value three times.


This custom component will be supplied all the properties of the dialogue node (`then`, `choices`, arbitrary custom properties, etc.), plus:

**scripts** - The custom scripts object passed to DialogueTree (defaults to an empty object)
**goToNode** - If you're hiding the choices section (via an empty `choices` array in a dialogue node), you'll want a way to continue the dialogue. The **goToNode** function should be called with a choice node (an object with a `then` property pointing to the dialogue node to jump to).
**isInHistory** - This boolean tells you whether the node is the current node or if it is being rendered in the dialogue history.
**chosenChoice** - This is the choice node that was chosen when this dialogue node was the current node. If it is active now, this prop will be `undefined`.
