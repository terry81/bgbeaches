#!/bin/bash
for i in `ls`
do
convert "$i" -resize 140x140 "TN_${i}"
echo $i processed
done
