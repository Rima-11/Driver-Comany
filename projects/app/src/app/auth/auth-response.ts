export interface AuthResponse {
  user: {
      firstname: string,
      phone: number,
      password: string,
      access_token: string,
      expires_in: number,
      remember: boolean
  }
}
