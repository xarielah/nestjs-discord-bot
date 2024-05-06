export type AuditPayload = {
  players: number;
  time: number;
};

export type AuditDocument = AuditPayload & {
  _id: string;
};
