export interface AuthResponse {
  user: {
      name: string,
      phone: number,
      password: string,
      access_token: string,
      expires_in: number,
      remember: boolean
  }
}
