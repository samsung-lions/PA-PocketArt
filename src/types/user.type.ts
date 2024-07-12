type Provider = 'email';

interface identityData {
  email: string;
  email_verified: boolean;
  phone_verified: boolean;
  sub: string;
}

interface Identity {
  created_at: string;
  email: string;
  id: string;
  identity_data: identityData[];
  identity_id: string;
  last_sign_in_at: string;
  provider: Provider;
  updated_at: string;
  user_id: string;
}

export interface User {
  app_metadata: {
    provider: Provider;
    providers: Provider[];
  };
  aud: string;
  confirmed_at: string;
  created_at: string;
  email: string;
  email_confirmed_at: string;
  id: string;
  identities: Identity[];
  is_anonymous: boolean;
  last_sign_in_at: string;
  phone: string;
  role: string;
  updated_at: string;
  user_metadata: {
    email: string;
    email_verified: boolean;
    phone_verified: boolean;
    sub: string;
  };
}
