export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export function isValidPhone(phone: string): boolean {
  const phoneRegex = /^[\d\s\-\+\(\)]+$/
  return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 10
}

export function isValidCeloAddress(address: string): boolean {
  return /^0x[a-fA-F0-9]{40}$/.test(address)
}

export function isValidEthereumAddress(address: string): boolean {
  return /^0x[a-fA-F0-9]{40}$/.test(address)
}

export function isValidAmount(amount: string | number): boolean {
  const num = typeof amount === 'string' ? parseFloat(amount) : amount
  return !isNaN(num) && num > 0
}

export function validateProductForm(data: {
  name: string
  sku: string
  price: number
  costPrice: number
  stock: number
}): { valid: boolean; errors: Record<string, string> } {
  const errors: Record<string, string> = {}

  if (!data.name || data.name.trim().length === 0) {
    errors.name = 'Product name is required'
  }

  if (!data.sku || data.sku.trim().length === 0) {
    errors.sku = 'SKU is required'
  }

  if (!isValidAmount(data.price)) {
    errors.price = 'Price must be a positive number'
  }

  if (!isValidAmount(data.costPrice)) {
    errors.costPrice = 'Cost price must be a positive number'
  }

  if (data.price < data.costPrice) {
    errors.price = 'Selling price must be higher than cost price'
  }

  if (data.stock < 0) {
    errors.stock = 'Stock cannot be negative'
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  }
}
