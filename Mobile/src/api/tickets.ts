import { api } from "./client";

export const getMyTickets = async () => {
  const response = await api.get("/api/tickets/my");
  return response.data;
};

export const createTicket = async (ticket: {
  title: string;
  description: string;
}) => {
  const response = await api.post("/api/tickets/createtickets", ticket);
  return response.data;
};
