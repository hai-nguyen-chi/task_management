class ErrorWithStatus {
  message: string
  status: number

  constructor({ message, status }: ErrorWithStatus) {
    this.message = message
    this.status = status
  }
}

export { ErrorWithStatus }
