import os
import shutil

# Mapping based on creation time (oldest to newest)
# Timestamps:
# msa14... 00:58
# d9asx... 00:59
# c6222... 01:19
# eiihd... 01:19
# mjda5... 01:20
# netk1... 01:20
# 6wk43... 01:20
# q886p... 01:22

mapping = [
    ("Gemini_Generated_Image_msa14imsa14imsa1.png", "portfolio_gala_soiree.png"),
    ("Gemini_Generated_Image_d9asxzd9asxzd9as.png", "portfolio_seminaire_tech.png"),
    ("Gemini_Generated_Image_c62222c62222c622.png", "portfolio_atelier_metiers.png"),
    ("Gemini_Generated_Image_eiihdteiihdteiih.png", "portfolio_evenement_artistique.png"),
    ("Gemini_Generated_Image_mjda5imjda5imjda.png", "portfolio_conference_annuelle.png"),
    ("Gemini_Generated_Image_netk13netk13netk.png", "portfolio_celebration_outdoor.png"),
    ("Gemini_Generated_Image_6wk43g6wk43g6wk4.png", "testimonial_jean_dupont.png"),
    ("Gemini_Generated_Image_q886pjq886pjq886.png", "about_team_photo.png")
]

base_dir = "asset/image"

for old_name, new_name in mapping:
    old_path = os.path.join(base_dir, old_name)
    new_path = os.path.join(base_dir, new_name)
    
    if os.path.exists(old_path):
        print(f"Renaming {old_name} to {new_name}")
        os.rename(old_path, new_path)
    else:
        print(f"File not found: {old_name}")
