export interface Invitation {
  id: string;
  email: string;
  role_id: string;
  role: string | null;
  status: string;
  invited_by: string | null;
  created_at: string;
  expires_at: string | null;
}

export interface CreateInvitationPayload {
  email: string;
  role_id: string;
}

export interface Role {
  id: string;
  name: string;
}

export interface ActionResult<T = Invitation> {
  success: boolean;
  data?: T;
  error?: string;
}
