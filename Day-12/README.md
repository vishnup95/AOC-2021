I struggled with this one!

-> The idea is that of a algorithm called DFS or path traversal. We start at the root node (start) and find the adjacent nodes or paths

                                                        start
                                                        /   \
                                                c- - - A     b - - - d
                                                       \    /
                                                         end

then find the adjacent nodes or paths using filter. We also remove all array elements that have 'start' in them. Then go to the next node and find all the connections we can have using filter, includes and flatMaps. We go through each connection and immeadiately check for lowercase. We also have an array called tempPath that stores the nodes we have waked through.

//for part- 1

tempath already includes the lowercase node, we can continue the loop and go to the next connection.
if we reach 'end' or we can break from the loop itself. We can also pop out the tempPath if we reach 'end'. We append the tempPath to a traversedPath sets.

for part-2
the condition is updated (for lower case checking) I did think of much better check but for now it works. I am not going to refactor now.
