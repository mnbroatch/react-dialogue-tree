to try:

Options node ending dialogue
  - Broken already. Not possible with normal options (they require a node), and shortcut options break with nothing after them.




# What is Dominatrix?

Dominatrix is a quality-of-life wrapper around bondage.js, a javascript parser for the [Yarn language](https://yarnspinner.dev/).

Yarn is a language for writing dialogue trees.

The added quality-of-life features are:
  - Support yarn format (as a string, rather than a )
  - 
  - Run a command handler function on generic commands
  - Lookahead to return text and subsequent options block together (on by default)


# What does using alforno's branch get us?

Dominatrix is a wrapper around a specific [forked version of bondage.js](https://github.com/alforno/bondage.js).

Development around the [original project](https://github.com/hylyh/bondage.js) has slowed and this forked version supports a very important feature: Inline expressions. Some caveats are detailed below.


# What limitations still remain?

Most limitations of Dominatrix are going to be limitations of the underlying bondage.js library (it is, after all, much more complex than this one). Here is a non-exhaustive list of bugs and unsupported yarn features in the version of bondage.js being used:

- No #hashtags
- No [format functions]
- No arbitrary:metadata
- No \\{escaping\\} curly brackets
- No { functions() in inline expressions }.
  - Set function call() to a variable inside a command instead  

- Inline expressions eat subsequent space characters. So,

```javascript
You have to add an {"extra"}  space yourself.
```

- Shortcut options without a followup are broken. So,

```javascript
This
-> Will
  Work
-> Just
  Fine
```
but

```javascript
This
-> Will
-> Not
  Work

```

and 

```javascript
This
-> Will
  Not
-> Work
```


- Indentation breaks conditional options

So, instead of
```javascript
<<if $thing is true>>
    [[Don't do this|SomeNode]]
<<endif>>
```

do this:

```javascript
<<if $thing is true>>
[[Do this|SomeNode]]
<<endif>>
```

