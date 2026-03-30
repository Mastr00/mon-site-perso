import os
import glob

replacements = {
    'bg-[#020617]': 'bg-slate-50 dark:bg-[#020617]',
    'bg-[#0F172A]': 'bg-white dark:bg-[#0F172A]',
    'bg-[#1E293B]': 'bg-slate-100 dark:bg-[#1E293B]',
    'text-white': 'text-slate-900 dark:text-white',
    'text-slate-400': 'text-slate-500 dark:text-slate-400',
    'text-slate-300': 'text-slate-700 dark:text-slate-300',
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
                    
                    if new_content != content:
                        with open(filepath, 'w', encoding='utf-8') as f:
                            f.write(new_content)
                        print(f"Updated {filepath}")
                except Exception as e:
                    print(f"Error reading {filepath}: {e}")

print("Done replacing tailwind classes.")
