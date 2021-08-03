const Airtable = require('airtable')

module.exports = ({ apiKey, baseId }) => {
  const base = new Airtable({ apiKey }).base(baseId)

  const getMinifiedRecord = record => {
    if (!record.fields.completed) {
      record.fields.completed = false
    }

    return {
      id: record.id,
      fields: record.fields
    }
  }

  const minifyRecords = records => {
    return records.map(record => getMinifiedRecord(record))
  }

  return {
    find: async (tableName, query) => {
      const table = base(tableName)
      const records = await table.select(query).firstPage()
      return minifyRecords(records)
    },
    findById: async (tableName, id) => {
      const table = base(tableName)
      const record = await table.find(id)
      return getMinifiedRecord(record)
    }
  }
}
