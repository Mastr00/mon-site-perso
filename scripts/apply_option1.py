import os

replacements = {
    '[#020617]': '[TEMP_BG]',
    '[#0F172A]': '[TEMP_CARD]',
    '[#1E293B]': '[TEMP_ELEV]',
    '[#22D3EE]': '[TEMP_CYAN]'
}

final_replacements = {
    '[TEMP_BG]': '[#0F172A]',
    '[TEMP_CARD]': '[#1E293B]',
    '[TEMP_ELEV]': '[#334155]',
    '[TEMP_CYAN]': '[#06B6D4]'
}

directories = ['pages', 'components']

for d in directories:
    for root, dirs, files in os.walk(d):
        for file in files:
            if file.endswith(('.jsx', '.js')):
                filepath = os.path.join(root, file)
                try:
                    with open(filepath, 'r', encoding='utf-8') as f:
                        content = f.read()
                    
                    new_content = content
                    for old, new in replacements.items():
                        new_content = new_content.replace(old, new)
                        
                    for old, new in final_replacements.items():
                        new_content = new_content.replace(old, new)
                    
                    if new_content != content:
                        with open(filepath, 'w', encoding='utf-8') as f:
                            f.write(new_content)
                        print(f"Updated {filepath}")
                except Exception as e:
                    print(f"Error reading {filepath}: {e}")

print("Couleurs mises à jour avec succès!")
