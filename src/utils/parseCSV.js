export const parseCSV = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = (event) => {
      try {
        const text = event.target.result
        const lines = text.split(/\r?\n/)

        if (!lines.length || !lines[0].trim()) {
          reject(new Error('CSV file is empty or has no headers'))
          return
        }

        const headers = lines[0].split(',').map((header) => header.trim())

        const requiredColumns = ['experiment_id', 'metric_name', 'step', 'value']
        const missingColumns = requiredColumns.filter((column) => !headers.includes(column))

        if (missingColumns.length) {
          reject(new Error(`Missing required columns: ${missingColumns.join(', ')}`))
          return
        }

        const results = []

        for (let i = 1; i < lines.length; i++) {
          const line = lines[i].trim()
          if (!line) continue

          const values = line.split(',').map((val) => val.trim())

          if (values.length !== headers.length) {
            console.warn(
              `Row ${i + 1} has ${values.length} columns, expected ${headers.length}. Skipping...`,
            )
            continue
          }

          const obj = {}
          headers.forEach((header, index) => {
            const value = values[index].trim()
            if (header === 'step' || header === 'value') {
              obj[header] = isNaN(Number(value)) ? value : Number(value)
            } else {
              obj[header] = value
            }
          })

          results.push(obj)
        }

        if (results.length === 0) {
          reject(new Error('No valid data rows found in CSV file'))
          return
        }

        resolve(results)
      } catch (error) {
        console.error('CSV parsing error:', error)
        reject(new Error(`Failed to parse CSV file: ${error.message}`))
      }
    }

    reader.onerror = (error) => {
      console.error('File reading error:', error)
      reject(new Error('Failed to read file'))
    }

    reader.readAsText(file)
  })
}
