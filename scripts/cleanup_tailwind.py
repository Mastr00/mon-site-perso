import os

cleanups = {
    'dark:bg-slate-50 dark:bg-[#020617]': 'dark:bg-[#020617]',
    'dark:bg-white dark:bg-[#0F172A]': 'dark:bg-[#0F172A]',
    'dark:bg-slate-100 dark:bg-[#1E293B]': 'dark:bg-[#1E293B]',
    'dark:text-slate-900 dark:text-white': 'dark:text-white',
    'dark:text-slate-500 dark:text-slate-400': 'dark:text-slate-400',
    'dark:text-slate-700 dark:text-slate-300': 'dark:text-slate-300',
    
    # Also clean up double darks if they exist like dark:dark:text-white
    'dark:dark:': 'dark:',
    
    # In case there's dark:text-slate-900 without the second part from some other combo
    'dark:text-slate-900 dark:text-slate-900': 'dark:text-slate-900',
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
                    for bad, good in cleanups.items():
                        new_content = new_content.replace(bad, good)
                    
                    if new_content != content:
                        with open(filepath, 'w', encoding='utf-8') as f:
                            f.write(new_content)
                        print(f"Cleaned {filepath}")
                except Exception as e:
                    print(f"Error {filepath}: {e}")

print("Cleanup complete.")
