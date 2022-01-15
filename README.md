# React Dialogue Tree

What is it?
-----------




How do I install it in my own project?
----------------

`npm i -S react-dialogue-tree`



How do I use it?
----------------

```javascript
import DialogueTree from 'react-dialogue-tree'

const myDialogueTree = TODO
```



### Styling

`import 'react-dialogue-tree/dist/react-dialogue-tree.css'`

or however else you like 


#### Start somewhere other than "root"

If you want the dialogue to start on a node other than "root", TODO

This allows a consuming component to dynamically choose the starting position.


How do I run this project locally?
----------------

`npm install --legacy-peer-deps`

The flag is needed per: https://github.com/storybookjs/storybook/issues/12983

`npm start`


# Other versions included

A minified version is available at `react-dialogue-tree/dist/react-dialogue-tree.min.js`.

If you want to transpile for yourself, use `import DialogueTree from 'react-dialogue-tree/src/index'` and make sure your transpiler isn't ignoring it. You will also need to transpile `yarn-bound` and `@mnbroatch/bondage`, and include all in your bundle, if necessary.

