import { z } from "zod";

import { patientSexEnum } from "@/db/schema";

export const upsertPatientSchema = z.object({
  id: z.string().uuid().optional(),
  name: z
    .string()
    .trim()
    .min(1, {
      message: "Nome é obrigatório.",
    })
    .max(100, {
      message: "Nome não pode ter mais de 100 caracteres.",
    }),
  email: z.string().email({
    message: "Email inválido.",
  }),
  phoneNumber: z.string().min(1, {
    message: "Número de telefone é obrigatório.",
  }),
  sex: z.enum([patientSexEnum.enumValues[0], patientSexEnum.enumValues[1]], {
    errorMap: () => ({ message: "Sexo é obrigatório." }),
  }),
});

export type UpsertPatientSchema = z.infer<typeof upsertPatientSchema>;
