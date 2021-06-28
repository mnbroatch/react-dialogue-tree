# Limitations

Most limitations of Dominatrix are going to be limitations of the underlying bondage library (it is, after all, much more complex than this one).

Currently I am using an improved fork found at: 

This section does not endeavor to be an exhaustive list of issues with bondage (try, you know, their issues page), but a couple gotchas that you'll find right off the bat are:

- No {$inline} expressions

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
