export class AuthRequest {
  username: string = '';
  password: string = '';
}

export class AuthResponse {
  nombre: string;
  accessToken: string;
}