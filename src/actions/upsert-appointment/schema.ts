import { z } from "zod";

export const upsertAppointmentSchema = z.object({
  id: z.string().uuid().optional(),
  patientId: z.string().uuid({
    message: "Paciente é obrigatório.",
  }),
  doctorId: z.string().uuid({
    message: "Médico é obrigatório.",
  }),
  date: z.date({
    required_error: "Data é obrigatória.",
  }),
  timeSlot: z.string().min(1, {
    message: "Horário é obrigatório.",
  }),
  appointmentPriceInCents: z.number().min(1, {
    message: "Valor da consulta é obrigatório.",
  }),
  status: z
    .enum(["scheduled", "completed", "canceled", "no_show"], {
      required_error: "Status é obrigatório.",
    })
    .default("scheduled"),
});

export type UpsertAppointmentSchema = z.infer<typeof upsertAppointmentSchema>;
