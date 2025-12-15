import os

images = {
    "portfolio_gala_soiree.svg": "Gala Soirée",
    "portfolio_seminaire_tech.svg": "Séminaire Tech",
    "portfolio_atelier_metiers.svg": "Atelier des Métiers",
    "portfolio_evenement_artistique.svg": "Événement Artistique",
    "portfolio_conference_annuelle.svg": "Conférence Annuelle",
    "portfolio_celebration_outdoor.svg": "Célébration Outdoor",
    "testimonial_jean_dupont.svg": "Jean Dupont",
    "about_team_photo.svg": "Notre Équipe"
}

output_dir = "/home/willsdev/Bureau/Project_site _evenementiel/asset/image"
os.makedirs(output_dir, exist_ok=True)

for filename, text in images.items():
    color = "#e0e0e0"
    text_color = "#333333"
    svg_content = f'''<svg width="800" height="600" xmlns="http://www.w3.org/2000/svg">
  <rect width="100%" height="100%" fill="{color}"/>
  <text x="50%" y="50%" font-family="Arial" font-size="40" fill="{text_color}" dominant-baseline="middle" text-anchor="middle">{text}</text>
</svg>'''
    
    with open(os.path.join(output_dir, filename), "w") as f:
        f.write(svg_content)
        
print("Placeholders created.")
