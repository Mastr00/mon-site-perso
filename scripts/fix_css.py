import codecs

with codecs.open('styles/globals.css', 'r', 'utf-8', errors='ignore') as f:
    content = f.read()

content = content.replace('\0', '')
lines = content.split('\n')
good_lines = lines[:311]

css = '\n'.join(good_lines) + '''

/* Edge Mask for Marquee */
.mask-edges {
  -webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
  mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
}
'''

with codecs.open('styles/globals.css', 'w', 'utf-8') as f:
    f.write(css)

print('Fixed globals.css')
