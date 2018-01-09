import os
dirs = [name for name in os.listdir('./src/components')
            if os.path.isdir(os.path.join('./src/components', name))]
for name in dirs:
	f = open('./src/components/' + name + '/' + 'index.js', 'w')
	f.write('import ' + name + ' from \'./' + name + '\';\n\nexport default ' + name + ';')
	f.close()
