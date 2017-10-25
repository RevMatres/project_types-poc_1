# V2.2.3

I put the buffer back in to support Opacity.

### Note

If the pointer movement is tiny, strange artifacts show up.  
If the lineCaps property is set to 'round', the round caps overlap, so that's not useful, to fix that.

A possible solution would be, to record more Points and set a minimum delta movement.  
Then the actual movement would be drawn until the new position reached minimum delta movement.  
Here the actual movement is erased and a line from the last point before minimum delta movement and the current position is drawn.

However, that loses lots of information.
