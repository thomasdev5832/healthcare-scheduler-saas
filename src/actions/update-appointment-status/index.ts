"use server";

import { and, eq, ne } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

import { db } from "@/db";
import { appointmentsTable } from "@/db/schema";
import { auth } from "@/lib/auth";
import { actionClient } from "@/lib/next-safe-action";

import { updateAppointmentStatusSchema } from "./schema";

export const updateAppointmentStatus = actionClient
  .schema(updateAppointmentStatusSchema)
  .action(async ({ parsedInput }) => {
    const { id, status } = parsedInput;

    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      throw new Error("Unauthorized");
    }

    if (!session?.user.clinic?.id) {
      throw new Error("Clinic not found");
    }

    // Busca o agendamento atual para obter o doctorId e a data
    const appointment = await db.query.appointmentsTable.findFirst({
      where: eq(appointmentsTable.id, id),
    });

    if (!appointment) {
      throw new Error("Agendamento não encontrado");
    }

    // Se estamos tentando marcar como "scheduled", precisamos verificar conflitos
    if (status === "scheduled" || status === "completed") {
      // Verifica se já existe outro agendamento scheduled no mesmo horário e médico
      const conflictingAppointment = await db.query.appointmentsTable.findFirst({
        where: and(
          eq(appointmentsTable.doctorId, appointment.doctorId),
          eq(appointmentsTable.date, appointment.date),
          eq(appointmentsTable.status, "scheduled"),
          ne(appointmentsTable.id, id) // Exclui o próprio agendamento
        ),
        with: {
          doctor: {
            columns: {
              name: true
            }
          }
        }
      });

      if (conflictingAppointment) {
        throw new Error(`Não é possível alterar este agendamento. O horário já está ocupado pelo ${conflictingAppointment.doctor.name}.`);
      }
    }

    await db
      .update(appointmentsTable)
      .set({
        status,
      })
      .where(eq(appointmentsTable.id, id));

    // Revalidamos todos os caminhos necessários para garantir que os dados estejam atualizados
    revalidatePath("/appointments");
    revalidatePath("/dashboard");

    // Quando um agendamento é cancelado ou marcado como não comparecido,
    // revalidamos todos os caminhos para garantir que o horário seja mostrado como disponível
    if (status === "canceled" || status === "no_show") {
      // Revalidamos o caminho raiz para garantir que todas as consultas sejam atualizadas
      revalidatePath("/");
    }
  });