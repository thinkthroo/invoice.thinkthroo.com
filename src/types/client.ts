export interface Client {
  id: string;
  name: string;
  email: string;
  address: string | null;
  created_at: Date | null;
}

export type Clients = Client[];
