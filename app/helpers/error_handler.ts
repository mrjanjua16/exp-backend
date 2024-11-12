import type { Response } from '@adonisjs/core/http'

// Define a type for the database error
interface ErrorDetail {
  code: string
  detail?: string
  constraint?: string
  message?: string
  messages?: string[]
}

export const errorHandler = (entity: string, error: ErrorDetail, response: Response) => {
  // Check if the error is a PostgreSQL error (use error.code for specific codes)
  if (error.code === '23505') {
    return response.conflict({
      status: 409,
      message: `Conflict: ${error.detail || `${entity} already exists.`}`,
      constraint: error.constraint,
    })
  } else if (error.code === 'E_VALIDATION_ERROR') {
    return response.conflict({
      status: error.code,
      message: `Conflict: validation failed.`,
      constraint: error.constraint,
      error: error?.messages,
    })
  } else if (error.code === '23503') {
    // Foreign key violation
    return response.badRequest({
      status: 400,
      message: `Foreign Key Violation: ${error.detail || 'Invalid reference found.'}`,
      constraint: error.constraint,
    })
  } else if (error.code === 'E_ROW_NOT_FOUND') {
    // ORM-specific error for row not found
    return response.notFound({
      status: 404,
      message: `${entity} with provided ID was not found.`,
    })
  } else {
    // General error handling for other types of errors
    return response.badRequest({
      status: 400,
      code: error.code,
      message: error.message || 'An unexpected error occurred',
    })
  }
}
