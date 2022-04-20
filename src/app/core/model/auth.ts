export interface Login {
  username: string;
  password: string;
}

export interface SignUp {
  username: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  data: Data;
}

export interface Data {
  token: string;
}

export interface SignUpResponse {
  success: boolean;
  message: string;
  data: null;
}
