#!/bin/bash
find -name '*_TN' -exec rm -rf
for i in `find -name '*.jpg'`
do
convert "$i" -resize 140x140 "${i}_TN"
echo $i processed
done
