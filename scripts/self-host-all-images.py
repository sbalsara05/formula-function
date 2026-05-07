#!/usr/bin/env python3
"""
Download all Wikimedia imageUrls from drivers.ts and self-host them.
Uses 1280px thumbnails (avoids full-res rate limits) with 7s delays.
Compresses any image over 400KB using sips.
Updates drivers.ts in place.

Run: python3 scripts/self-host-all-images.py
"""

import os
import time
import subprocess
import urllib.request
import urllib.error

DRIVERS_TS = '/Users/sbalsara/Documents/GitHub/formula-function/frontend/src/data/mock/drivers.ts'
IMAGES_DIR = '/Users/sbalsara/Documents/GitHub/formula-function/frontend/public/images/drivers'
MAX_BYTES   = 400 * 1024  # 400 KB
DELAY_SECS  = 20

UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36'
HEADERS = {
    'User-Agent': UA,
    'Accept': 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
    'Accept-Language': 'en-US,en;q=0.9',
    'Accept-Encoding': 'gzip, deflate, br',
    'Referer': 'https://commons.wikimedia.org/',
    'Sec-Fetch-Dest': 'image',
    'Sec-Fetch-Mode': 'no-cors',
    'Sec-Fetch-Site': 'cross-site',
    'Cache-Control': 'no-cache',
}


def to_thumb_url(url: str, width: int = 1280) -> str:
    """Convert a full or thumb Wikimedia URL to a 1280px thumbnail URL."""
    base = 'https://upload.wikimedia.org/wikipedia/commons/'
    if '/thumb/' in url:
        # already a thumb — strip the size suffix and rebuild at width
        # e.g. .../thumb/7/7e/File.jpg/800px-File.jpg → .../thumb/7/7e/File.jpg/1280px-File.jpg
        parts = url.split('/thumb/', 1)
        path = parts[1].rsplit('/', 1)[0]          # '7/7e/File.jpg'
        filename = path.rsplit('/', 1)[-1]          # 'File.jpg'
        return f'{base}thumb/{path}/{width}px-{filename}'
    elif url.startswith(base):
        rest = url[len(base):]                       # '9/95/File.jpg'
        filename = rest.rsplit('/', 1)[-1]           # 'File.jpg'
        return f'{base}thumb/{rest}/{width}px-{filename}'
    return url

# URL → local filename (within IMAGES_DIR)
# Thumbnail URLs are mapped to the full-resolution download URL via a separate dict below.
URL_TO_NAME: dict[str, str] = {
    # ── Vettel ──────────────────────────────────────────────────────────────
    'https://upload.wikimedia.org/wikipedia/commons/9/95/Sebastian_Vettel_2008_Singapore.jpg':
        'vettel-singapore-2008.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/1/1f/F1_2013_Belgian_Grand_Prix_-_Sebastian_Vettel.jpg':
        'vettel-belgium-2013.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/a/ad/2018_Chinese_Grand_Prix_FP3_Sebastian_Vettel_%2840987411774%29.jpg':
        'vettel-china-2018.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/8/82/Sebastian_Vettel%2C_F1_British_Grand_Prix_2021.jpg':
        'vettel-silverstone-2021.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/7/7a/Vettel_Monza_2008.jpg':
        'vettel-monza-2008.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/6/69/Vettel_abu_dabi_2010.jpg':
        'vettel-abudhabi-2010.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/b/b6/Malaysia_F1_GP_2013_%289165779965%29.jpg':
        'vettel-malaysia-2013.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/3/38/Sebastian_Vettel_won_2009_Japanese_GP.jpg':
        'vettel-japan-2009.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/3/3b/2013_Italian_GP_-_Vettel.jpg':
        'vettel-italy-2013.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/2/29/Indian_Grand_Prix_2013_Podium_%28Ank_Kumar%2C_Infosys%29_01.jpg':
        'vettel-india-2013.jpg',
    # ── Bearman ─────────────────────────────────────────────────────────────
    'https://upload.wikimedia.org/wikipedia/commons/a/ac/2025_Japan_GP_-_Haas_-_Oliver_Bearman_-_FP2.jpg':
        'bearman-japan-2025.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/f/fd/FIA_F2_Austria_2024_Nr._3_Bearman.jpg':
        'bearman-austria-f2-2024.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/f/f8/FIA_F1_Austria_2025_Nr._87_Bearman.jpg':
        'bearman-austria-2025.jpg',
    # ── Hamilton ────────────────────────────────────────────────────────────
    'https://upload.wikimedia.org/wikipedia/commons/b/b6/McLaren_Hamilton_2008_Spanish_GP.jpg':
        'hamilton-spain-2008.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/2/24/Lewis_Hamilton-Mercedes_W11_%285%29.jpg':
        'hamilton-mercedes-w11-2020.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/b/b8/2025_Japan_GP_-_Ferrari_-_Lewis_Hamilton_-_FP1.jpg':
        'hamilton-ferrari-japan-2025.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/8/8b/Hamilton_Brazil_2008_celebrations.jpg':
        'hamilton-brazil-2008.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/a/ab/F1_2014_JAP_Lewis_Hamilton_4968.jpg':
        'hamilton-japan-2014.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/6/65/Lewis_Hamilton_2020_Tuscan_Grand_Prix_-_race_day.jpg':
        'hamilton-tuscany-2020.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/8/87/Lewis_Hamilton_Turn_1_%2815067481393%29.jpg':
        'hamilton-australia-2015.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/8/8c/FIA_F1_Imola_2025_No._44_Hamilton.jpg':
        'hamilton-imola-2025.jpg',
    # ── Verstappen ──────────────────────────────────────────────────────────
    'https://upload.wikimedia.org/wikipedia/commons/c/ca/Max_Verstappen_2015_Malaysia_FP1.jpg':
        'verstappen-malaysia-2015.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/4/42/FIA_F1_Austria_2024_Nr._1_Verstappen.jpg':
        'verstappen-austria-2024.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/6/60/FIA_F1_Austria_2023_Race_%281%29.jpg':
        'verstappen-austria-2023-race.jpg',
    # ── Leclerc ─────────────────────────────────────────────────────────────
    'https://upload.wikimedia.org/wikipedia/commons/b/b6/Charles_Leclerc_Monza_F2_2017.jpg':
        'leclerc-monza-f2-2017.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/b/bf/Charles_Leclerc_after_winning_F2_championship_%28cropped%29.jpg':
        'leclerc-f2-champion-2017.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/c/c6/2018_Chinese_Grand_Prix_FP3_Charles_Leclerc_%2839897914770%29.jpg':
        'leclerc-china-2018.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/3/38/Charles_Leclerc_%2853837544592%29.jpg':
        'leclerc-british-2024.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/9/93/Charles_Leclerc_2019_Italian_Grand_Prix.jpg':
        'leclerc-italy-2019.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/8/83/FIA_F1_Austria_2022_Podium_Race_Winner_Leclerc.jpg':
        'leclerc-austria-2022.jpg',
    # ── Piastri ─────────────────────────────────────────────────────────────
    'https://upload.wikimedia.org/wikipedia/commons/9/9b/Oscar_Piastri_Spa.jpg':
        'piastri-spa.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/e/ee/2021_British_Grand_Prix_%2851349300361%29_%28cropped%29.jpg':
        'piastri-silverstone-2021-crop.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/f/f4/2021_British_Grand_Prix_%2851349300361%29.jpg':
        'piastri-silverstone-2021.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/6/69/2024_British_Grand_Prix%2C_Piastri_%281%29.jpg':
        'piastri-silverstone-2024.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/2/20/Oscar_Piastri_Chinese_GP_2024.jpg':
        'piastri-china-2024.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/f/fb/2026_Chinese_GP_-_McLaren_-_Oscar_Piastri_-_Qualifying.jpg':
        'piastri-china-2026.jpg',
    # ── Bortoleto ───────────────────────────────────────────────────────────
    # thumbnail URL → maps to full URL below for download
    'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/FIA_F3_Spa_2023_Nr._23_Bortoleto.jpg/800px-FIA_F3_Spa_2023_Nr._23_Bortoleto.jpg':
        'bortoleto-spa-f3-2023.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/2/20/2024-07-28_077_Spa%2C_Formel_2_Hauptrennen%3B_Gabriel_Bortoleto_%2853890031922%29.jpg':
        'bortoleto-spa-f2-2024.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/1/1e/2025_ImolaGP_Gabriel_Bortoleto.jpg':
        'bortoleto-imola-2025.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/c/c2/2025_Japan_GP_-_Sauber_-_Gabriel_Bortoleto_-_FP2.jpg':
        'bortoleto-japan-2025.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/0/04/FIA_F1_Austria_2025_Nr._5_Bortoleto.jpg':
        'bortoleto-austria-2025.jpg',
    # ── Norris ──────────────────────────────────────────────────────────────
    'https://upload.wikimedia.org/wikipedia/commons/a/ae/Lando_Norris%2CChinese_GP_2024.jpg':
        'norris-china-2024.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/0/0e/Lando_Norris%2CChinese_GP_2024_Race.jpg':
        'norris-china-2024-race.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/0/0a/2024-08-25_Motorsport%2C_Formel_1%2C_Gro%C3%9Fer_Preis_der_Niederlande_2024_STP_3975_by_Stepro.jpg':
        'norris-netherlands-2024.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/c/cf/2026_Chinese_GP_-_McLaren_-_Lando_Norris_-_Qualifying.jpg':
        'norris-china-2026.jpg',
    # ── Russell ─────────────────────────────────────────────────────────────
    'https://upload.wikimedia.org/wikipedia/commons/9/98/2020_Formula_One_tests_Barcelona%2C_Williams_FW43%2C_Russell.jpg':
        'russell-williams-barcelona-2020.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/7/7f/George_Russell_2022.jpg':
        'russell-mercedes-2022.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/7/7f/KingsLeonSilverstne040724_%2828_of_112%29_%2853838006028%29_%28cropped%29.jpg':
        'russell-silverstone-2024.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/c/ce/F%C3%B3rmula_1_Heineken_Grande_Pr%C3%AAmio_de_S%C3%A3o_Paulo_2022_%2852497580456%29.jpg':
        'russell-brazil-2022.jpg',
    # ── Antonelli ───────────────────────────────────────────────────────────
    'https://upload.wikimedia.org/wikipedia/commons/d/d9/2025_Japan_GP_-_Mercedes_-_Kimi_Antonelli_-_FP2.jpg':
        'antonelli-japan-2025.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/d/d8/2025_Imola_GP_Kimi_Antonelli.jpg':
        'antonelli-imola-2025.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/7/77/FIA_F1_Austria_2025_Nr._12_Antonelli.jpg':
        'antonelli-austria-2025.jpg',
    # ── Alonso ──────────────────────────────────────────────────────────────
    'https://upload.wikimedia.org/wikipedia/commons/4/4d/Fernando_Alonso_2005_Canada.jpg':
        'alonso-canada-2005.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/c/c9/Fernando_Alonso_Monza_2007.jpg':
        'alonso-monza-2007.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/6/6d/Fernando_Alonso_won_2008_Japanese_GP.jpg':
        'alonso-japan-2008.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/5/58/2012_Canadian_Grand_Prix_Fernando_Alonso_Ferrari_F2012-02.jpg':
        'alonso-canada-2012.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/d/da/McLaren_Honda_No.14_Fernando_Alonso_%2822108466065%29.jpg':
        'alonso-mclaren-honda.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/8/8f/FIA_F1_Austria_2021_Nr._14_Alonso.jpg':
        'alonso-austria-2021.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/3/39/FIA_F1_Austria_2023_Nr._14_%281%29.jpg':
        'alonso-austria-2023.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/d/df/Fernando_Alonso_won_2012_Malaysian_GP.jpg':
        'alonso-malaysia-2012.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/3/39/2024_Spanish_Grand_Prix_%2853810013882%29.jpg':
        'alonso-spain-2024.jpg',
    # ── Stroll ──────────────────────────────────────────────────────────────
    'https://upload.wikimedia.org/wikipedia/commons/b/b8/Lance_Stroll_Monza_2017.jpg':
        'stroll-monza-2017.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/4/43/Lance_Stroll_during_Hungarian_Formula_1_GP.jpg':
        'stroll-hungary.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/7/7b/FIA_F1_Austria_2023_Nr._18_%281%29.jpg':
        'stroll-austria-2023.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/2/26/Lance_Stroll_2017_Azerbaijan_GP.png':
        'stroll-baku-2017.png',
    'https://upload.wikimedia.org/wikipedia/commons/0/0e/Lance_Stroll%2C_2020_pre-season_testing.jpg':
        'stroll-testing-2020.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/1/1d/2024_British_Grand_Prix%2C_Stroll_%281%29.jpg':
        'stroll-silverstone-2024.jpg',
    # ── Gasly ───────────────────────────────────────────────────────────────
    'https://upload.wikimedia.org/wikipedia/commons/4/43/Pierre_Gasly_2017_Malaysia_%28cropped%29.jpg':
        'gasly-malaysia-2017.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/a/a8/Pierre_Gasly_during_Hungarian_Formula_1_GP.jpg':
        'gasly-hungary.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/b/bf/Pierre_Gasly-Alpha_Tauri_AT01_%283%29.jpg':
        'gasly-alphatauri-2020.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/c/cf/Pierre_Gasly_2024_Chinese_GP.jpg':
        'gasly-china-2024.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/e/e0/FIA_F1_Austria_2021_Nr._10_Gasly.jpg':
        'gasly-austria-2021.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/5/55/FIA_F1_Austria_2024_Nr._10_Gasly.jpg':
        'gasly-austria-2024.jpg',
    # ── Colapinto ───────────────────────────────────────────────────────────
    'https://upload.wikimedia.org/wikipedia/commons/8/80/Franco_Colapinto_2025_Italian_Grand_Prix_FP3.jpg':
        'colapinto-italy-2025.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/3/33/FIA_F1_Imola_2025_No._43_Colapinto.jpg':
        'colapinto-imola-2025.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/4/49/2025_Emilia_Romagna_Grand_Prix_01.jpg':
        'colapinto-emilia-romagna-2025.jpg',
    # ── Albon ───────────────────────────────────────────────────────────────
    'https://upload.wikimedia.org/wikipedia/commons/1/1d/Alexander_Albon-Red_Bull_RB16_%283%29.jpg':
        'albon-redbull-2020.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/3/36/Alex_Albon_2022.jpg':
        'albon-williams-2022.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/d/d9/Alexander_Albon_2020_Tuscan_Grand_Prix_-_race_day.jpg':
        'albon-tuscany-2020.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/f/fa/2024_British_Grand_Prix%2C_Albon_%281%29.jpg':
        'albon-silverstone-2024.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/7/7d/FIA_F1_Austria_2025_Nr._23_Albon.jpg':
        'albon-austria-2025.jpg',
    # ── Sainz ───────────────────────────────────────────────────────────────
    'https://upload.wikimedia.org/wikipedia/commons/0/09/F1_-_Toro_Rosso_-_Carlos_Sainz_Jnr_%2828582688225%29.jpg':
        'sainz-toro-rosso-2015.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/9/9e/Sainz_Renault_RS18_Testing_Barcelona.jpg':
        'sainz-renault-2018.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/0/07/Carlos_Sainz_Jr%27s_2019_McLaren_MCL34_Renault_Formula_1_Car_%2849379470978%29.jpg':
        'sainz-mclaren-2019.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/f/fa/Carlos_Sainz_-_2023_Italian_Grand_Prix.jpg':
        'sainz-italy-2023.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/e/eb/FIA_F1_Austria_2025_Nr._55_Sainz.jpg':
        'sainz-austria-2025.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/9/9d/Carlos_Sainz_waves_to_the_Silverstone_crowd_after_claiming_his_first_victory_in_Formula_One_at_the_2022_British_Grand_Prix_%2852195615157%29.jpg':
        'sainz-silverstone-2022.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/8/8b/FIA_F1_Austria_2023_Carlos_Sainz.jpg':
        'sainz-austria-2023.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/4/4e/2025_Singapore_GP_-_Williams_-_Carlos_Sainz_-_FP2.jpg':
        'sainz-singapore-2025.jpg',
    # ── Ocon ────────────────────────────────────────────────────────────────
    'https://upload.wikimedia.org/wikipedia/commons/3/3f/Esteban_Ocon_2017_Malaysia_FP2_1.jpg':
        'ocon-malaysia-2017.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/d/d8/Esteban_Ocon%2C_2020_pre-season_testing.jpg':
        'ocon-testing-2020.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/9/98/FIA_F1_Austria_2021_Nr._31_Ocon.jpg':
        'ocon-austria-2021.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/1/10/2025_Japan_GP_-_Haas_-_Esteban_Ocon_-_FP2.jpg':
        'ocon-japan-2025.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/1/19/2024_British_Grand_Prix%2C_Ocon_%281%29.jpg':
        'ocon-silverstone-2024.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/7/7e/FIA_F1_Austria_2024_Nr._31_Ocon.jpg':
        'ocon-austria-2024.jpg',
    # ── Hulkenberg ──────────────────────────────────────────────────────────
    'https://upload.wikimedia.org/wikipedia/commons/b/b5/Hulkenberg_Canada_2010.jpg':
        'hulkenberg-canada-2010-a.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/8/8a/2012_Canadian_Grand_Prix_Nico_Hulkenberg_Force_India_Mercedes_VJM05.jpg':
        'hulkenberg-canada-2012.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/6/66/FIA_F1_Austria_2018_Nr._27_H%C3%BClkenberg.jpg':
        'hulkenberg-austria-2018.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/0/02/FIA_F1_Austria_2023_Nr._27_%281%29.jpg':
        'hulkenberg-austria-2023.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/f/f3/Audi_R26_of_Nico_H%C3%BClkenberg_%28028A8505%29.jpg':
        'hulkenberg-le-mans-2024.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/0/0c/Hulkenberg_2010_Canadian_GP.jpg':
        'hulkenberg-canada-2010-b.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/7/7e/2024_British_Grand_Prix%2C_H%C3%BClkenberg_%281%29.jpg':
        'hulkenberg-silverstone-2024.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/d/db/H%C3%BClkenberg_2024_BelgiumGP.jpg':
        'hulkenberg-belgium-2024.jpg',
    # ── Tsunoda ─────────────────────────────────────────────────────────────
    'https://upload.wikimedia.org/wikipedia/commons/c/cf/FIA_F1_Austria_2021_Nr._22_Tsunoda.jpg':
        'tsunoda-austria-2021.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/0/04/2024_British_Grand_Prix%2C_Tsunoda_%281%29.jpg':
        'tsunoda-silverstone-2024.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/a/a5/FIA_F1_Austria_2024_Nr._22_Tsunoda.jpg':
        'tsunoda-austria-2024.jpg',
    # ── Hadjar ──────────────────────────────────────────────────────────────
    'https://upload.wikimedia.org/wikipedia/commons/f/f7/2025_ImolaGP_Isack_Hadjar.jpg':
        'hadjar-imola-2025.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/0/02/2025_Japan_GP_-_Racing_Bulls_-_Isack_Hadjar_-_FP2.jpg':
        'hadjar-japan-2025.jpg',
    # ── Lawson ──────────────────────────────────────────────────────────────
    'https://upload.wikimedia.org/wikipedia/commons/b/b1/2025_Japan_GP_-_Racing_Bulls_-_Liam_Lawson_-_FP2.jpg':
        'lawson-japan-2025.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/f/f9/RB_VCARB_03_of_Liam_Lawson_%28028A8054%29.jpg':
        'lawson-vcarb-2024.jpg',
    # ── Perez ───────────────────────────────────────────────────────────────
    'https://upload.wikimedia.org/wikipedia/commons/e/e7/Sauber_C30_Sergio_Perez_%2818076962515%29.jpg':
        'perez-sauber-2011.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/5/5e/Sergio_P%C3%A9rez_%2836099986012%29.jpg':
        'perez-force-india.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/e/e4/FIA_F1_Austria_2021_Nr._11_Perez.jpg':
        'perez-austria-2021.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/1/15/Cadillac_MAC-26_of_Sergio_P%C3%A9rez_%28028A8062%29.jpg':
        'perez-cadillac-2026.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/e/eb/Sergio_Perez-Racing_Point_RP_20_%285%29.jpg':
        'perez-racing-point-2020.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/1/1b/2024-08-25_Motorsport%2C_Formel_1%2C_Gro%C3%9Fer_Preis_der_Niederlande_2024_STP_3758_by_Stepro.jpg':
        'perez-netherlands-2024.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/e/ec/FIA_F1_Austria_2024_Nr._11_Perez.jpg':
        'perez-austria-2024.jpg',
    # ── Bottas ──────────────────────────────────────────────────────────────
    'https://upload.wikimedia.org/wikipedia/commons/b/b6/Bottas_Baku_2016.jpg':
        'bottas-baku-2016.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/d/de/FIA_F1_Austria_2021_Nr._77_Bottas.jpg':
        'bottas-austria-2021.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/7/76/Valtteri_Bottas_2022_Emilia_Romagna_Grand_Prix.jpg':
        'bottas-emilia-romagna-2022.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/b/b5/2026_Chinese_GP_-_Cadillac_-_Valtteri_Bottas_-_Qualifying.jpg':
        'bottas-china-2026.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/f/f4/2017_Russian_Grand_Prix_5.jpg':
        'bottas-russia-2017.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/d/d8/FIA_F1_Austria_2019_Nr._77_Bottas_1.jpg':
        'bottas-austria-2019.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/c/c8/2024_British_Grand_Prix%2C_Bottas_%281%29.jpg':
        'bottas-silverstone-2024.jpg',
    # ── Prost ───────────────────────────────────────────────────────────────
    'https://upload.wikimedia.org/wikipedia/commons/d/d9/Prost_at_1981_Dutch_Grand_Prix.jpg':
        'prost-netherlands-1981.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/c/c8/Prost_at_1985_British_Grand_Prix.jpg':
        'prost-silverstone-1985.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/2/2d/Alain_Prost_%28McLaren_Honda%29%2C_1988.jpg':
        'prost-mclaren-1988.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/4/40/Alain_Prost%2C_1990_USA_GP_Phoenix.jpg':
        'prost-phoenix-1990.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/0/04/Alain_Prost_-_Williams_FW15C_at_the_1993_British_Grand_Prix_%2833557467311%29.jpg':
        'prost-williams-1993.jpg',
    # ── Schumacher ──────────────────────────────────────────────────────────
    'https://upload.wikimedia.org/wikipedia/commons/4/46/Jordan_191_Michael_Schumacher_%2814464876702%29.jpg':
        'schumacher-jordan-1991.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/5/50/Michael_Schumacher_-_Benetton_194_at_the_1994_British_Grand_Prix_%2832541379235%29.jpg':
        'schumacher-benetton-1994.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/f/f0/Michael_Schumacher_2006_Indianapolis.jpg':
        'schumacher-indianapolis-2006.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/a/a0/2012_Australian_Grand_Prix_10.jpg':
        'schumacher-australia-2012.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/5/55/Benetton_B192-05_1992_noBG.jpg':
        'schumacher-benetton-1992.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/0/04/Ferrari_F1-2000_front-right2_2019_Michael_Schumacher_Private_Collection.jpg':
        'schumacher-ferrari-2000.jpg',
    # ── Senna ───────────────────────────────────────────────────────────────
    'https://upload.wikimedia.org/wikipedia/commons/4/4c/Ayrton_Senna_Toleman_TG184_1984_British_GP_Brands_Hatch_001.jpg':
        'senna-toleman-1984.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/8/84/Ayrton_Senna_1988_Canada.jpg':
        'senna-canada-1988.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/4/44/Ayrton_Senna_Williams_FW16_Petersen_Automotive_Museum.jpg':
        'senna-williams-fw16.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/c/c3/1985_European_GP_Senna.jpg':
        'senna-european-1985.jpg',
    # ── Raikkonen ───────────────────────────────────────────────────────────
    'https://upload.wikimedia.org/wikipedia/commons/1/1a/Kimi_Raikkonen%2C_Sauber_Petronas_C20_%288968309257%29.jpg':
        'raikkonen-sauber-2001.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/6/63/Kimi_R%C3%A4ikk%C3%B6nen_2003_Silverstone.jpg':
        'raikkonen-silverstone-2003.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/0/0a/Kimi_Raikkonen_2007_Britain_2.jpg':
        'raikkonen-silverstone-2007.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/d/d5/2012_Canadian_GP_-_Kimi_Raikkonen_Lotus_E20_02.jpg':
        'raikkonen-canada-2012.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/0/0e/Kimi_Raikkonen_-_Scuderia_Ferrari_SF16-H_-_2016_Singapore_Grand_Prix_FP2_%2829498055360%29.jpg':
        'raikkonen-singapore-2016.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/5/56/Kimi_Raikkonen%2C_Alfa_Romeo-Ferrari_C38%2C_2019_Italian_Grand_Prix%2C_Monza%2C_6th_September_%2848782017171%29.jpg':
        'raikkonen-alfa-romeo-2019.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/8/87/Kimi_Raikkonen_won_2007_Brazil_GP.jpg':
        'raikkonen-brazil-2007.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/d/d3/Kimi_Raikkonen_2013_Malaysia_FP1.jpg':
        'raikkonen-malaysia-2013.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/c/c6/FIA_F1_Austria_2018_Nr._7_R%C3%A4ikk%C3%B6nen.jpg':
        'raikkonen-austria-2018.jpg',
    # ── Button ──────────────────────────────────────────────────────────────
    'https://upload.wikimedia.org/wikipedia/commons/a/a8/2000_Williams_FW22_SCD24.jpg':
        'button-williams-2000.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/0/0a/Buttonwin.jpg':
        'button-brawn-2009.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/4/4a/Button_British_Grand_Prix_2009.jpg':
        'button-silverstone-2009.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/d/d6/McLaren_mp4-26_Button_2011_Canadian_GP.jpg':
        'button-canada-2011.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/d/d6/Jenson_Button_2009_Bahrain.jpg':
        'button-bahrain-2009.jpg',
    # ── Hakkinen ────────────────────────────────────────────────────────────
    'https://upload.wikimedia.org/wikipedia/commons/4/47/2000_Belgian_Grand_Prix.jpg':
        'hakkinen-belgium-2000.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/6/62/Mika_H%C3%A4kkinen_2000_United_States_Grand_Prix.jpg':
        'hakkinen-usa-2000.jpg',
    # ── Hill ────────────────────────────────────────────────────────────────
    'https://upload.wikimedia.org/wikipedia/commons/b/b0/Damon_Hill_-_Williams_FW15C_at_the_1993_British_Grand_Prix_%2833557427941%29.jpg':
        'hill-williams-1993.jpg',
    # ── Rosberg ─────────────────────────────────────────────────────────────
    'https://upload.wikimedia.org/wikipedia/commons/d/db/Nico_Rosberg_2009_Italy.jpg':
        'rosberg-italy-2009.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/f/f3/Nico_Rosberg_2016_Malaysia_1.jpg':
        'rosberg-malaysia-2016.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/1/1b/NRosberg-ITA-2012.jpg':
        'rosberg-italy-2012.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/f/fb/2013_Monaco_Grand_Prix_-_Sunday_%2815272209777%29.jpg':
        'rosberg-monaco-2013.jpg',
    # ── Ricciardo ───────────────────────────────────────────────────────────
    'https://upload.wikimedia.org/wikipedia/commons/6/6e/HRT_F_111_Daniel_Ricciardo_%2817456427903%29.jpg':
        'ricciardo-hrt-2011.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/3/30/2012_Canadian_Grand_Prix_Daniel_Ricciardo_Toro_Rosso_STR7.jpg':
        'ricciardo-toro-rosso-2012.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/1/1f/Daniel_Ricciardo_2014_Singapore_FP2.jpg':
        'ricciardo-singapore-2014.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/8/81/Daniel_Ricciardo_during_Hungarian_Formula_1_GP.jpg':
        'ricciardo-hungary.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/0/0a/Daniel_Ricciardo%2C_Mclaren_F1_Team%2C_British_GP%2C_Silverstone_2021_%2851350323865%29.jpg':
        'ricciardo-mclaren-2021.jpg',
    # thumbnail URL:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Daniel_Ricciardo_2024_Chinese_GP.jpg/1280px-Daniel_Ricciardo_2024_Chinese_GP.jpg':
        'ricciardo-china-2024.jpg',
    # ── Magnussen ───────────────────────────────────────────────────────────
    'https://upload.wikimedia.org/wikipedia/commons/5/50/Kevin_Magnussen_2014_Singapore_FP2.jpg':
        'magnussen-singapore-2014.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/5/5b/FIA_F1_Austria_2022_Nr._20_Magnussen.jpg':
        'magnussen-austria-2022.jpg',
    # ── Doohan ──────────────────────────────────────────────────────────────
    'https://upload.wikimedia.org/wikipedia/commons/8/8d/2025_Japan_GP_-_Alpine_-_Jack_Doohan_-_FP3.jpg':
        'doohan-japan-2025.jpg',
    # ── Lindblad ────────────────────────────────────────────────────────────
    'https://upload.wikimedia.org/wikipedia/commons/0/03/Arvid_Lindblad_at_the_Red_Bull_Fan_Zone_%E2%80%93_Crown_Riverwalk%2C_Melbourne_%28028A7727%29.jpg':
        'lindblad-redbull-2026.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/5/52/FIA_F2_Austria_2025_Nr._4_Lindblad.jpg':
        'lindblad-austria-f2-2025.jpg',
}

def compress_if_needed(path: str) -> None:
    size = os.path.getsize(path)
    if size > MAX_BYTES:
        print(f'  → {size//1024}KB — compressing…')
        subprocess.run(
            ['sips', '-Z', '1200', '--setProperty', 'formatOptions', '75', path],
            capture_output=True
        )
        new_size = os.path.getsize(path)
        print(f'  → compressed to {new_size//1024}KB')


def is_valid_image(path: str) -> bool:
    result = subprocess.run(['file', path], capture_output=True, text=True)
    output = result.stdout.lower()
    return 'jpeg' in output or 'png' in output or 'gif' in output or 'webp' in output


def download(url: str, dest: str) -> bool:
    # Use 1280px thumbnail — avoids full-resolution rate limits
    download_url = to_thumb_url(url, width=1280)
    req = urllib.request.Request(download_url, headers=HEADERS)
    try:
        with urllib.request.urlopen(req, timeout=30) as resp:
            with open(dest, 'wb') as f:
                f.write(resp.read())
        return True
    except Exception as e:
        print(f'  ✗ Error: {e}')
        return False


def main():
    os.makedirs(IMAGES_DIR, exist_ok=True)

    with open(DRIVERS_TS, 'r', encoding='utf-8') as f:
        content = f.read()

    replacements_made = {}
    failed = []

    total = len(URL_TO_NAME)
    for i, (url, filename) in enumerate(URL_TO_NAME.items(), 1):
        dest = os.path.join(IMAGES_DIR, filename)
        local_ref = f'/images/drivers/{filename}'

        # Skip already downloaded
        if os.path.exists(dest) and is_valid_image(dest):
            print(f'[{i}/{total}] SKIP (exists) → {filename}')
            replacements_made[url] = local_ref
            continue

        print(f'[{i}/{total}] Downloading {filename}…')
        if not download(url, dest):
            failed.append((url, filename))
            continue

        if not is_valid_image(dest):
            print(f'  ✗ Not a valid image — removing')
            os.remove(dest)
            failed.append((url, filename))
            continue

        compress_if_needed(dest)
        replacements_made[url] = local_ref
        print(f'  ✓ {os.path.getsize(dest)//1024}KB saved')

        if i < total:
            time.sleep(DELAY_SECS)  # respect Wikimedia rate limit

    # Update drivers.ts
    print(f'\nApplying {len(replacements_made)} replacements to drivers.ts…')
    updated = content
    for old_url, local_ref in replacements_made.items():
        updated = updated.replace(f'"{old_url}"', f'"{local_ref}"')
        updated = updated.replace(f"'{old_url}'", f"'{local_ref}'")

    with open(DRIVERS_TS, 'w', encoding='utf-8') as f:
        f.write(updated)

    print(f'✓ drivers.ts updated')

    if failed:
        print(f'\n⚠ FAILED ({len(failed)}):')
        for url, fn in failed:
            print(f'  {fn}: {url}')
    else:
        print('\n✓ All images downloaded successfully')


if __name__ == '__main__':
    main()
