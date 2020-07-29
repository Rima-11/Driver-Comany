export interface AuthResponse {
  user: {
      firstname: string;
      lastname: string;
      town: string;
      country: string;
      phone: number;
      password: string;
      access_token: string;
      expires_in: number;
      remember: boolean;
      email: string;
      id: number;
  }
}
