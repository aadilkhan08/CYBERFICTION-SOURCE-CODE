# Create Python Script to convert all images in a directory to webp format that helps to load faster in webpages and compress the total size of 70MB to 21MB in my case.

import os
from PIL import Image


def convert_images_to_webp(directory):
    for filename in os.listdir(directory):
        if filename.endswith(".jpg") or filename.endswith(".png"):
            img = Image.open(os.path.join(directory, filename))
            webp_filename = os.path.splitext(filename)[0] + '.webp'
            img.save(os.path.join(directory, webp_filename), 'webp')


convert_images_to_webp('assets')
