In order to run(I used bash for my command prompt)...
1. Direct to the mongo/bin folder in a command prompt and run 'mongod'
2. Direct to the mongo/bin folder in another command prompt and run 'mongo'
3. Type 'use itemlist' in the mongo command prompt
4. Direct to the itemlistapp directory (One directory above the public folder) in another command prompt and type
'npm install express'
'npm install request'
'npm install mongojs'
'npm install body-parser'
'node server'
5. Web app is on 'localhost:3000'
6. Either refresh the page when you run in to a bug (There are a good amount and i didn't implement error checks) or  in the mongo command prompt type 'db.dropDatabase()'  