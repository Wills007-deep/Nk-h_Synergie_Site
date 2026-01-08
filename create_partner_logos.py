from PIL import Image, ImageDraw, ImageFont
import os

# Ensure directory exists
output_dir = "asset/image"
if not os.path.exists(output_dir):
    os.makedirs(output_dir)

# Transparent background, Light text colors
partners = [
    {"name": "EventTech", "color": "#C5A66E"},   # Gold
    {"name": "LumièrePro", "color": "#FFFFFF"},   # White
    {"name": "SoundWave", "color": "#A0AEC0"},    # Light Gray
    {"name": "Gourmet", "color": "#C5A66E"},     # Gold
    {"name": "DecorStyle", "color": "#FFFFFF"}    # White
]

font_size = 36
width, height = 200, 100

try:
    # Try to load a font, otherwise use default
    font = ImageFont.truetype("DejaVuSans-Bold.ttf", font_size)
except:
    font = ImageFont.load_default()

for partner in partners:
    # RGBA for transparency
    img = Image.new('RGBA', (width, height), color=(0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    
    # Calculate text position to center it
    bbox = d.textbbox((0, 0), partner["name"], font=font)
    text_width = bbox[2] - bbox[0]
    text_height = bbox[3] - bbox[1]
    x = (width - text_width) / 2
    y = (height - text_height) / 2
    
    d.text((x, y), partner["name"], fill=partner["color"], font=font)
    
    filename = f"partner_{partner['name'].lower()}.png"
    img.save(os.path.join(output_dir, filename))
    print(f"Created {filename}")
