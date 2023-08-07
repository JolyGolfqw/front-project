export interface State {
  error: string | null;
  signingUp: boolean;
  signingIn: boolean;
  id: string | null;
  login: string | null;
  token: string | null;
}

export type createImg = {
  name: string;
  description: string;
  address: string;
  phone: string;
  price: string;
  image: any;
  category: string;
};
