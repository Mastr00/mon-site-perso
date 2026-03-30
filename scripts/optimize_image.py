import os
from PIL import Image

def optimize_image(filepath, max_width=1200):
    try:
        img = Image.open(filepath)
        width, height = img.size
        print(f"Original size: {width}x{height}, {os.path.getsize(filepath) / (1024*1024):.2f} MB")
        
        # Resize if width is larger than max_width
        if width > max_width:
            ratio = max_width / width
            new_height = int(height * ratio)
            img = img.resize((max_width, new_height), Image.Resampling.LANCZOS)
            print(f"Resizing to: {max_width}x{new_height}")
            
        # Convert and save as WebP 
        new_filepath = filepath.rsplit('.', 1)[0] + '.webp'
        img.save(new_filepath, 'WEBP', quality=80, method=6)
        
        new_size = os.path.getsize(new_filepath) / (1024*1024)
        print(f"Saved optimized image: {new_filepath} ({new_size:.2f} MB)")
        
        # We can delete original jpg to save space, but let's just make WebP
        return new_filepath
    except Exception as e:
        print(f"Error optimizing {filepath}: {e}")
        return None

optimize_image('public/images/projects/esp32-wether.jpg')
