import os
import re

# ファイル名を変更するディレクトリのパス
directory = "C:\\Users\\zst08\\OneDrive\\デスクトップ\\新しいフォルダー"

# ディレクトリ内のファイルを取得
files = os.listdir(directory)

# 正規表現パターン
pattern = r"https___www.serebii.net_pokedex-sv_icon_new_(\d+)\.png"

# ファイル名を変更
for file in files:
    match = re.match(pattern, file)
    if match:
        old_name = os.path.join(directory, file)
        new_name = os.path.join(directory, match.group(1) + ".png")
        os.rename(old_name, new_name)