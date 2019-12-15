# React Dialogue Tree

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

### Basic Usage - Dialogue Nodes

Here is the simplest dialogue object possible. The dialogue object has one dialogue node at the path `root` of the tree:

    {
      "root": {
        "text": "hello world"
      }
    }

The user will see the `text` "hello world", and that's the end of the dialogue.

If you want the dialogue to start on a node other than "root", use the "startAt" string prop to specify another root-level dialogue node.

    const myDialogue = {
      "myStartingNode": {
        "text": "hello world"
      }
    }

    // ...

    <DialogueTree
      dialogue={myDialogue}
      startAt={'myStartingNode'}
    />

#### Moving from node to the next: `then`

Here is another dialogue.

    {
      "root": {
        "text": "hello",
        "then": {
          "text": "world"
        }
      }
    }

The root dialogue node has a `then` property, with a value that is itself a dialogue node.

Because there is a `then` but no `choices` property (more below), a single choice with the default text, "Continue", will be created.

The user will see "hello", with the default choice. Choosing that choice moves to the next node with text "world" at the end of the dialogue.

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


#### choices

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

For now, override css classes yourself.


### Advanced

#### custom scripts

You can associate one or more scripts with a dialogue node or choice node.

Scripts associated with a dialogue node are run when that node is arrived at. Scripts associated with a choice node are run when that choice is chosen.

You can run custom functions either when a dialogue node is arrived at or a choice is chosen. These are supplied with a `customScripts` object.

This dialogue loops on the root node, logging greetings to the console on each click:

    <DialogueTree
      dialogue={myDialogue}
      customScripts={{
        greet: (node) => { console.log('Hello, `${node.name}.`') }
      }}
    />

    /* myDialogue */ 

    {
      "root": {
        "text": "You have a desire to say hello to everyone present.",
        "scripts": ["logHello"],
        "choices": [
          {
            "text": "Greet Mr. Peanutbutter",
            "scripts": ["greet"],
            "name": "Mister",
            "then": "root"
          },
          {
            "text": "Greet Mr. Horseman",
            "scripts": ["greet"],
            "name": "Bojack",
            "then": "root"
          },
          {
            "text": "Greet Ms. Nguyen",
            "scripts": ["greet"],
            "name": "Diane",
            "then": "root"
          }
        ]
      }
    }

**Note:** The customScripts object doesn't have to be flat; in the dialogue you can include the access path to the desired script, like so:


    const customScripts = {
      logs: {
        hello: () => { console.log('hello') }
      }
    }

    const worldNode = {
      "text": "world",
      "then": "world",
      "scripts": ["logs.hello"]
    }


#### component

Instead of a `text` property, a dialogue node can have a `component` property. Components are supplied in a customComponents object.

This dialogue will show the arbitrarily-added "yell" value three times:

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


This custom component will be supplied all the properties of the dialogue node (`then`, `choices`, arbitrary custom properties, etc.), plus:

**customScripts** - The custom scripts object passed to DialogueTree (defaults to an empty object)
**goToNode** - If you're hiding the choices section (via an empty `choices` array in a dialogue node), you'll want a way to continue the dialogue. The **goToNode** function should be called with a choice node (an object with a `then` property pointing to the dialogue node to jump to).
**chosenChoice** - This is the choice node that was chosen when this dialogue node was the current node. This is how you determine whether a node is the current node or in the history-- only nodes in the history will have a chosenChoice.

**component and customComponents**

#### Start somewhere other than "root"

If you want the dialogue to start on a node other than "root", use the "startAt" string prop to specify another root-level dialogue node.

    const myDialogue = {
      "myStartingNode": {
        "text": "hello world"
      }
    }

    // ...

    <DialogueTree
      dialogue={myDialogue}
      startAt={'myStartingNode'}
    />

This is nice sometimes, semantically. It also allows a consuming component to dynamically choose the starting position.
