const Airtable = require('airtable')

module.exports = ({ apiKey, baseId }) => {
  const base = new Airtable({ apiKey }).base(baseId)

  const getMinifiedRecord = record => {
    // if (!record.fields.completed) {
    //   record.fields.completed = false
    // }

    return {
      id: record.id,
      ...record.fields
    }
  }

  const minifyRecords = records => {
    return records.map(record => getMinifiedRecord(record))
  }

  const attachReferencedData = async (record, include) => {
    for (let i = 0; i <= include.length; i++) {
      const reference = include[i]
      const referencedData = await findById({
        tableName: reference.collection,
        id: record[reference.property][0]
      })

      record[reference.property][0] = referencedData

      if (i === include.length - 1) {
        return record
      }
    }
  }

  const find = async ({ tableName, query = {}, include = [] }) => {
    const table = base(tableName)
    const records = await table.select(query).firstPage()

    const minifiedRecords = minifyRecords(records)
    
    if (include.length) {
      for (let i = 0; i <= minifiedRecords.length; i++) {
        const record = minifiedRecords[i]

        await attachReferencedData(record, include)

        if (i === minifiedRecords.length - 1) {
          return minifiedRecords
        }
      }
    } else {
      return minifiedRecords
    }
  }
  
  const findById = async ({ tableName, id }) => {
    const table = base(tableName)
    const record = await table.find(id)

    return getMinifiedRecord(record)
  }

  return {
    find,
    findById
  }
}
