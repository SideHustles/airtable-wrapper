# Airtable Wrapper

## Install

```
npm i airtable-wrapper
```

## Usage

You'll need an Airtable API key and the ID of the base you want to access:

 * Visit your account page to create an API token.
 * Find the base ID by browsing to https://airtable.com/api and selecting a base. This will take you to the API documentation for your base.

### Initialising

```
const AirtableWrapper = require('./lib/airtable')
const airtable = AirtableWrapper({ apiKey: '', baseId: '' })

const { find, findById } = airtable
```

### Find multiple records matching a query

```
;(async () => {
  const records = await find({ tableName: 'coffee', query: {} })
})()
```

### Find a single record by ID

```
;(async () => {
  const record = await findById({ tableName: 'coffee', id: 'zedfrthyfdscbg' })
})()
```

### Include referenced data

Records are returned with the ID of the referenced item, for example:

```
{
  "Title": "House Blend",
  "Roaster": ["zed465rth1212scbg"]
}
```

To fetch the referenced item instead of just the ID, specify an `include` argument which should be an array of objects indicating which property you want replaced with the referenced data and which table the data should be fetched from. 

```
;(async () => {
  const records = await find({
    tableName: 'coffee',
    query: {},
    include: [{ collection: 'roasters', property: 'Roaster' }]
  })
})()

/*
 * {
 *   "Title": "House Blend",
 *   "Roaster": [
 *     {
 *       "id": "zed465rth1212scbg",
 *       "name": "Red Rooster"
 *     }
 *   ]
 * }
 */

```

### Delete a record

```
;(async () => {
  const results = await delete({ tableName: 'coffee', ids: ['zedfrthyfdscbg'] })
})()
```

### Update a record

```
;(async () => {
  const updatedRecord = await update({
    tableName: 'coffee',
    id: 'zedfrthyfdscbg',
    update: {
      Roaster: ["z3d4g5rty1814scaf"]
    }
  })
})()
```


## License

MIT License

Copyright (c) 2021 Jim Lambie

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.