This is a rough idea how this was done. 

1) go through all elements and increment each irrespective of what they are!
2) call a function called glowUp => that increases the value of elements (goes through the grid again) that is greater than 9 to zero and set the value of neigbours to plus one. 
3) After it does that we check if there is any element that is still greater than 9, if true, we need to run the glowUp function again!
4) Along the way we can add the glowed Points, we also set and clear the glowed points!

For part 2 we just check if the returned grid has all elements set to zero! if yes return the index that was calling this step!

