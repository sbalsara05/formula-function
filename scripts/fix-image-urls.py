#!/usr/bin/env python3
"""Replace all en.wikipedia.org/wiki/Special:FilePath/ URLs in drivers.ts with direct upload.wikimedia.org URLs."""
import re

REPLACEMENTS = {
    # Dutch GP 2024 series
    'https://en.wikipedia.org/wiki/Special:FilePath/2024-08-25_Motorsport,_Formel_1,_Großer_Preis_der_Niederlande_2024_STP_3758_by_Stepro.jpg':
        'https://upload.wikimedia.org/wikipedia/commons/1/1b/2024-08-25_Motorsport%2C_Formel_1%2C_Gro%C3%9Fer_Preis_der_Niederlande_2024_STP_3758_by_Stepro.jpg',
    # British GP 2024 series
    'https://en.wikipedia.org/wiki/Special:FilePath/2024_British_Grand_Prix,_Albon_(1).jpg':
        'https://upload.wikimedia.org/wikipedia/commons/f/fa/2024_British_Grand_Prix%2C_Albon_%281%29.jpg',
    'https://en.wikipedia.org/wiki/Special:FilePath/2024_British_Grand_Prix,_Bottas_(1).jpg':
        'https://upload.wikimedia.org/wikipedia/commons/c/c8/2024_British_Grand_Prix%2C_Bottas_%281%29.jpg',
    'https://en.wikipedia.org/wiki/Special:FilePath/2024_British_Grand_Prix,_H%C3%BClkenberg_(1).jpg':
        'https://upload.wikimedia.org/wikipedia/commons/7/7e/2024_British_Grand_Prix%2C_H%C3%BClkenberg_%281%29.jpg',
    'https://en.wikipedia.org/wiki/Special:FilePath/2024_British_Grand_Prix,_Ocon_(1).jpg':
        'https://upload.wikimedia.org/wikipedia/commons/1/19/2024_British_Grand_Prix%2C_Ocon_%281%29.jpg',
    'https://en.wikipedia.org/wiki/Special:FilePath/2024_British_Grand_Prix,_Piastri_(1).jpg':
        'https://upload.wikimedia.org/wikipedia/commons/6/69/2024_British_Grand_Prix%2C_Piastri_%281%29.jpg',
    'https://en.wikipedia.org/wiki/Special:FilePath/2024_British_Grand_Prix,_Stroll_(1).jpg':
        'https://upload.wikimedia.org/wikipedia/commons/1/1d/2024_British_Grand_Prix%2C_Stroll_%281%29.jpg',
    'https://en.wikipedia.org/wiki/Special:FilePath/2024_British_Grand_Prix,_Tsunoda_(1).jpg':
        'https://upload.wikimedia.org/wikipedia/commons/0/04/2024_British_Grand_Prix%2C_Tsunoda_%281%29.jpg',
    # Spanish GP 2024
    'https://en.wikipedia.org/wiki/Special:FilePath/2024_Spanish_Grand_Prix_(53810013882).jpg':
        'https://upload.wikimedia.org/wikipedia/commons/3/39/2024_Spanish_Grand_Prix_%2853810013882%29.jpg',
    # 2025 Imola / Emilia Romagna
    'https://en.wikipedia.org/wiki/Special:FilePath/2025_Emilia_Romagna_Grand_Prix_01.jpg':
        'https://upload.wikimedia.org/wikipedia/commons/4/49/2025_Emilia_Romagna_Grand_Prix_01.jpg',
    'https://en.wikipedia.org/wiki/Special:FilePath/2025_ImolaGP_Gabriel_Bortoleto.jpg':
        'https://upload.wikimedia.org/wikipedia/commons/1/1e/2025_ImolaGP_Gabriel_Bortoleto.jpg',
    'https://en.wikipedia.org/wiki/Special:FilePath/2025_ImolaGP_Isack_Hadjar.jpg':
        'https://upload.wikimedia.org/wikipedia/commons/f/f7/2025_ImolaGP_Isack_Hadjar.jpg',
    'https://en.wikipedia.org/wiki/Special:FilePath/2025_Imola_GP_Kimi_Antonelli.jpg':
        'https://upload.wikimedia.org/wikipedia/commons/d/d8/2025_Imola_GP_Kimi_Antonelli.jpg',
    # 2025 Japan GP series
    'https://en.wikipedia.org/wiki/Special:FilePath/2025_Japan_GP_-_Haas_-_Oliver_Bearman_-_FP2.jpg':
        'https://upload.wikimedia.org/wikipedia/commons/a/ac/2025_Japan_GP_-_Haas_-_Oliver_Bearman_-_FP2.jpg',
    'https://en.wikipedia.org/wiki/Special:FilePath/2025_Japan_GP_-_Mercedes_-_Kimi_Antonelli_-_FP2.jpg':
        'https://upload.wikimedia.org/wikipedia/commons/d/d9/2025_Japan_GP_-_Mercedes_-_Kimi_Antonelli_-_FP2.jpg',
    'https://en.wikipedia.org/wiki/Special:FilePath/2025_Japan_GP_-_Racing_Bulls_-_Isack_Hadjar_-_FP2.jpg':
        'https://upload.wikimedia.org/wikipedia/commons/0/02/2025_Japan_GP_-_Racing_Bulls_-_Isack_Hadjar_-_FP2.jpg',
    'https://en.wikipedia.org/wiki/Special:FilePath/2025_Japan_GP_-_Sauber_-_Gabriel_Bortoleto_-_FP2.jpg':
        'https://upload.wikimedia.org/wikipedia/commons/c/c2/2025_Japan_GP_-_Sauber_-_Gabriel_Bortoleto_-_FP2.jpg',
    # 2025 Singapore GP
    'https://en.wikipedia.org/wiki/Special:FilePath/2025_Singapore_GP_-_Williams_-_Carlos_Sainz_-_FP2.jpg':
        'https://upload.wikimedia.org/wikipedia/commons/4/4e/2025_Singapore_GP_-_Williams_-_Carlos_Sainz_-_FP2.jpg',
    # Albon
    'https://en.wikipedia.org/wiki/Special:FilePath/Alexander_Albon_2020_Tuscan_Grand_Prix_-_race_day.jpg':
        'https://upload.wikimedia.org/wikipedia/commons/d/d9/Alexander_Albon_2020_Tuscan_Grand_Prix_-_race_day.jpg',
    # Sainz
    'https://en.wikipedia.org/wiki/Special:FilePath/Carlos_Sainz_waves_to_the_Silverstone_crowd_after_claiming_his_first_victory_in_Formula_One_at_the_2022_British_Grand_Prix_(52195615157).jpg':
        'https://upload.wikimedia.org/wikipedia/commons/9/9d/Carlos_Sainz_waves_to_the_Silverstone_crowd_after_claiming_his_first_victory_in_Formula_One_at_the_2022_British_Grand_Prix_%2852195615157%29.jpg',
    'https://en.wikipedia.org/wiki/Special:FilePath/FIA_F1_Austria_2023_Carlos_Sainz.jpg':
        'https://upload.wikimedia.org/wikipedia/commons/8/8b/FIA_F1_Austria_2023_Carlos_Sainz.jpg',
    # Bottas
    'https://en.wikipedia.org/wiki/Special:FilePath/FIA_F1_Austria_2019_Nr._77_Bottas_1.jpg':
        'https://upload.wikimedia.org/wikipedia/commons/d/d8/FIA_F1_Austria_2019_Nr._77_Bottas_1.jpg',
    'https://en.wikipedia.org/wiki/Special:FilePath/2017_Russian_Grand_Prix_5.jpg':
        'https://upload.wikimedia.org/wikipedia/commons/f/f4/2017_Russian_Grand_Prix_5.jpg',
    # FIA F1 Austria 2021 series
    'https://en.wikipedia.org/wiki/Special:FilePath/FIA_F1_Austria_2021_Nr._10_Gasly.jpg':
        'https://upload.wikimedia.org/wikipedia/commons/e/e0/FIA_F1_Austria_2021_Nr._10_Gasly.jpg',
    'https://en.wikipedia.org/wiki/Special:FilePath/FIA_F1_Austria_2021_Nr._22_Tsunoda.jpg':
        'https://upload.wikimedia.org/wikipedia/commons/c/cf/FIA_F1_Austria_2021_Nr._22_Tsunoda.jpg',
    'https://en.wikipedia.org/wiki/Special:FilePath/FIA_F1_Austria_2021_Nr._31_Ocon.jpg':
        'https://upload.wikimedia.org/wikipedia/commons/9/98/FIA_F1_Austria_2021_Nr._31_Ocon.jpg',
    # FIA F1 Austria 2024 series
    'https://en.wikipedia.org/wiki/Special:FilePath/FIA_F1_Austria_2024_Nr._10_Gasly.jpg':
        'https://upload.wikimedia.org/wikipedia/commons/5/55/FIA_F1_Austria_2024_Nr._10_Gasly.jpg',
    'https://en.wikipedia.org/wiki/Special:FilePath/FIA_F1_Austria_2024_Nr._11_Perez.jpg':
        'https://upload.wikimedia.org/wikipedia/commons/e/ec/FIA_F1_Austria_2024_Nr._11_Perez.jpg',
    'https://en.wikipedia.org/wiki/Special:FilePath/FIA_F1_Austria_2024_Nr._22_Tsunoda.jpg':
        'https://upload.wikimedia.org/wikipedia/commons/a/a5/FIA_F1_Austria_2024_Nr._22_Tsunoda.jpg',
    'https://en.wikipedia.org/wiki/Special:FilePath/FIA_F1_Austria_2024_Nr._31_Ocon.jpg':
        'https://upload.wikimedia.org/wikipedia/commons/7/7e/FIA_F1_Austria_2024_Nr._31_Ocon.jpg',
    # FIA F1 Austria 2025 series
    'https://en.wikipedia.org/wiki/Special:FilePath/FIA_F1_Austria_2025_Nr._12_Antonelli.jpg':
        'https://upload.wikimedia.org/wikipedia/commons/7/77/FIA_F1_Austria_2025_Nr._12_Antonelli.jpg',
    'https://en.wikipedia.org/wiki/Special:FilePath/FIA_F1_Austria_2025_Nr._23_Albon.jpg':
        'https://upload.wikimedia.org/wikipedia/commons/7/7d/FIA_F1_Austria_2025_Nr._23_Albon.jpg',
    'https://en.wikipedia.org/wiki/Special:FilePath/FIA_F1_Austria_2025_Nr._5_Bortoleto.jpg':
        'https://upload.wikimedia.org/wikipedia/commons/0/04/FIA_F1_Austria_2025_Nr._5_Bortoleto.jpg',
    'https://en.wikipedia.org/wiki/Special:FilePath/FIA_F1_Austria_2025_Nr._87_Bearman.jpg':
        'https://upload.wikimedia.org/wikipedia/commons/f/f8/FIA_F1_Austria_2025_Nr._87_Bearman.jpg',
    # Colapinto
    'https://en.wikipedia.org/wiki/Special:FilePath/FIA_F1_Imola_2025_No._43_Colapinto.jpg':
        'https://upload.wikimedia.org/wikipedia/commons/3/33/FIA_F1_Imola_2025_No._43_Colapinto.jpg',
    'https://en.wikipedia.org/wiki/Special:FilePath/Franco_Colapinto_2025_Italian_Grand_Prix_FP3.jpg':
        'https://upload.wikimedia.org/wikipedia/commons/8/80/Franco_Colapinto_2025_Italian_Grand_Prix_FP3.jpg',
    # Alonso
    'https://en.wikipedia.org/wiki/Special:FilePath/Fernando_Alonso_2005_Canada.jpg':
        'https://upload.wikimedia.org/wikipedia/commons/4/4d/Fernando_Alonso_2005_Canada.jpg',
    'https://en.wikipedia.org/wiki/Special:FilePath/Fernando_Alonso_won_2012_Malaysian_GP.jpg':
        'https://upload.wikimedia.org/wikipedia/commons/d/df/Fernando_Alonso_won_2012_Malaysian_GP.jpg',
    # Hulkenberg
    'https://en.wikipedia.org/wiki/Special:FilePath/H%C3%BClkenberg_2024_BelgiumGP.jpg':
        'https://upload.wikimedia.org/wikipedia/commons/d/db/H%C3%BClkenberg_2024_BelgiumGP.jpg',
    'https://en.wikipedia.org/wiki/Special:FilePath/Hulkenberg_2010_Canadian_GP.jpg':
        'https://upload.wikimedia.org/wikipedia/commons/0/0c/Hulkenberg_2010_Canadian_GP.jpg',
    # Stroll
    'https://en.wikipedia.org/wiki/Special:FilePath/Lance_Stroll,_2020_pre-season_testing.jpg':
        'https://upload.wikimedia.org/wikipedia/commons/0/0e/Lance_Stroll%2C_2020_pre-season_testing.jpg',
    'https://en.wikipedia.org/wiki/Special:FilePath/Lance_Stroll_2017_Azerbaijan_GP.png':
        'https://upload.wikimedia.org/wikipedia/commons/2/26/Lance_Stroll_2017_Azerbaijan_GP.png',
    # Piastri
    'https://en.wikipedia.org/wiki/Special:FilePath/Oscar_Piastri_Chinese_GP_2024.jpg':
        'https://upload.wikimedia.org/wikipedia/commons/2/20/Oscar_Piastri_Chinese_GP_2024.jpg',
    # Gasly
    'https://en.wikipedia.org/wiki/Special:FilePath/Pierre_Gasly-Alpha_Tauri_AT01_(3).jpg':
        'https://upload.wikimedia.org/wikipedia/commons/b/bf/Pierre_Gasly-Alpha_Tauri_AT01_%283%29.jpg',
    # Perez
    'https://en.wikipedia.org/wiki/Special:FilePath/Sergio_Perez-Racing_Point_RP_20_(5).jpg':
        'https://upload.wikimedia.org/wikipedia/commons/e/eb/Sergio_Perez-Racing_Point_RP_20_%285%29.jpg',
    # Piastri W + pattern
    "W + \"2024_British_Grand_Prix,_Piastri_(1).jpg\"":
        '"https://upload.wikimedia.org/wikipedia/commons/6/69/2024_British_Grand_Prix%2C_Piastri_%281%29.jpg"',
}

file_path = '/Users/sbalsara/Documents/GitHub/formula-function/frontend/src/data/mock/drivers.ts'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

count = 0
for old, new in REPLACEMENTS.items():
    if old in content:
        content = content.replace(old, new)
        count += 1
        print(f"✓ Replaced: {old[:80]}...")
    else:
        print(f"✗ NOT FOUND: {old[:80]}...")

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print(f"\nDone. {count}/{len(REPLACEMENTS)} replacements applied.")
