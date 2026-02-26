export const toFormData = (data, formData = new FormData(), parentKey = null) => {
  if (data === null || data === undefined) return formData

  if (typeof data !== "object" || data instanceof File || data instanceof Blob) {
    formData.append(parentKey, data)
    return formData
  }

  Object.keys(data).forEach(key => {
    const value = data[key]
    const fieldKey = parentKey ? `${parentKey}[${key}]` : key

    if (value === null || value === undefined) return

    if (Array.isArray(value)) {
      value.forEach((item, index) => {
        const arrayKey = `${fieldKey}[${index}]`
        toFormData(item, formData, arrayKey)
      })
    } else if (typeof value === "object" && !(value instanceof File)) {
      toFormData(value, formData, fieldKey)
    } else {
      formData.append(fieldKey, value)
    }
  })

  return formData
}
