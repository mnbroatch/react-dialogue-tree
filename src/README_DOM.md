# Limitations of Bondage.js

Some limitations of


# Limitations

Most limitations of Dominatrix are going to be limitations of the underlying bondage library (it is, after all, much more complex than this one).

Currently I am using an improved fork found at: TODO

This section does not endeavor to be an exhaustive list of issues with bondage.js (try, you know, their issues page), but a couple gotchas that you'll find right off the bat are:

- No {$inline} expressions

- No #line: tags

- No arbitrary:metadata

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
[[Don't do this|SomeNode]]
<<endif>>
```

- Indentation on shortcuts is too restrictive:

working:

```javascript
OK, let's see a shortcut
-> No! Never!
  Haha, made you shortcut
-> Woohoo! When can we start?
  We're already done!
  -> Aw, come on, one more!
    OK, one more nested shortcut, just for you <3.
  -> Good enough!
    Glad you liked it!
```

not working:

```javascript
OK, let's see a shortcut
  -> No! Never!
    Haha, made you shortcut
  -> Woohoo! When can we start?
    We're already done!
      -> Aw, come on, one more!
        OK, one more nested shortcut, just for you <3.
      -> Good enough!
        Glad you liked it!
```

