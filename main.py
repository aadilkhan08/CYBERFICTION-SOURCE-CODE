# Import necessary modules
import os
from PIL import Image

# Define a function to convert images to webp format


def convert_images_to_webp(directory):
    # Loop over all files in the provided directory
    for filename in os.listdir(directory):
        # Check if the file is a jpg or png image
        if filename.endswith(".jpg") or filename.endswith(".png"):
            # Open the image file
            img = Image.open(os.path.join(directory, filename))
            # Create a new filename by replacing the old extension with .webp
            webp_filename = os.path.splitext(filename)[0] + '.webp'
            # Save the image in webp format
            img.save(os.path.join(directory, webp_filename), 'webp')


# Call the function on the 'assets' directory
convert_images_to_webp('assets')
