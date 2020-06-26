export interface AuthResponse {
  user: {
      name: string,
      phone: number,
      access_token: string,
      expires_in: number
  }
}
