import { z } from "zod";

export const updateAppointmentStatusSchema = z.object({
  id: z.string().uuid(),
  status: z.enum(["scheduled", "completed", "canceled", "no_show"], {
    required_error: "Status é obrigatório.",
  }),
});
