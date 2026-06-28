#!/bin/bash
#mjpeg is what the tiny screen dm is making for me for dioramas uses
#gotta be small, and not many frames a second
#135x240 less than 900 kb
#17 fps is what the prototype could handle but the real one might be able to do more
#my goal is both to have a diorama with Belief and company in it
#but also a soure of shifting light that can be offs screen in a diorama
#also
#its wild in retrospect
#rabbit sim half predicted digital circus
#before i ever watched it


for f in *.mp4
do
  tempfile="${f##*/}"

  ## display filename
  fileName="${f%.*}"
  echo "Processing $f file...I think it should be ${fileName}.mjpeg (remember to target 135 x 240 video or inverse) and keep it under 900 kb"

  # take action on each file. $f store current file name
  ffmpeg -i $f -c:v mjpeg -qscale:v 2 -an $fileName.mjpeg


done
