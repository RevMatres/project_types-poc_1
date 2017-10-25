# V2.2.2

A fundamental change in the app's structure was made.

### Smoothing

For a *potential* smoothing algorithm a pointBuffer is necessary, so that one can calculate the path-piece's smoothing curve.

It appears to be sufficiently complicated to implement such an algorithm, that I've decided, **not** to build one into this proof of concept.

I reserve the right to change my mind on this later.

### What's changed

In this Version I removed the pointBuffer altogether and rebuild the app around the idea of linear paths being drawn directly.

Implementing pressure sensitivity and undo history, as well as brush features, etc. should be possible in both a smoothened version and this version *in identical ways*.


===

### UPDATE

Turns out I forgot another feature, that requires a pointBuffer: pressure based Opacity.

In the Interval, that records / draws points, I need to check, that the position has changed, before I draw a new segment. Otherwise every millisecond a new Point is added, gradually filling in any transparency to opacity: 1.

But: for that feature I only need to store the *last* point!
