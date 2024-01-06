#!/bin/bash

# Change directory to the public/cards folder
cd public/PNG-cards-1.3

# Loop through all the files in the folder
for file in *; do
    # Get the file extension
    extension="${file##*.}"

    # Get the card name without the extension
    card_name="${file%.*}"

    echo $card_name

    # Remove "OF" from the card name
    new_card_name=$(echo "$card_name" | sed 's/OF//g')

    # Convert numerical numbers from 1 to 10 to capital alphabets
    new_card_name=$(echo "$new_card_name" | sed 's/10/TEN/g; s/1/ONE/g; s/2/TWO/g; s/3/THREE/g; s/4/FOUR/g; s/5/FIVE/g; s/6/SIX/g; s/7/SEVEN/g; s/8/EIGHT/g; s/9/NINE/g')

    # Replace underscores with spaces
    new_card_name=$(echo "$new_card_name" | sed 's/  */_/g')
    # Rename the file to the new card name with the proper extension
    cp "$file" "../cards/${new_card_name}.${extension}"

done
