"use server";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { and, eq, ne } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

import { db } from "@/db";
import { appointmentsTable } from "@/db/schema";
import { auth } from "@/lib/auth";
import { actionClient } from "@/lib/next-safe-action";

import { upsertAppointmentSchema } from "./schema";

// Configura o dayjs para usar UTC
dayjs.extend(utc);

export const upsertAppointment = actionClient
  .schema(upsertAppointmentSchema)
  .action(async ({ parsedInput }) => {
    const {
      id,
      patientId,
      doctorId,
      date,
      timeSlot,
      appointmentPriceInCents,
      status,
    } = parsedInput;

    // Combina a data e o horário em um único timestamp
    const [hours, minutes] = timeSlot.split(":").map(Number);

    // Cria um timestamp UTC para armazenar no banco de dados, como é feito com os médicos
    const appointmentDate = dayjs(date)
      .hour(hours)
      .minute(minutes)
      .second(0)
      .millisecond(0)
      .toDate();

    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      throw new Error("Unauthorized");
    }

    if (!session?.user.clinic?.id) {
      throw new Error("Clinic not found");
    }

     // Se estamos tentando marcar como "scheduled", precisamos verificar conflitos
    if (status === "scheduled" || status === "completed") {
      // Verifica se já existe outro agendamento scheduled ou completed no mesmo horário e médico
      const conflictingAppointment = await db.query.appointmentsTable.findFirst({
        where: and(
          eq(appointmentsTable.doctorId, doctorId),
          eq(appointmentsTable.date, appointmentDate),
          eq(appointmentsTable.status, "scheduled"),
          id ? ne(appointmentsTable.id, id) : undefined // Exclui o próprio agendamento, se estiver editando
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
      .insert(appointmentsTable)
      .values({
        id,
        patientId,
        doctorId,
        date: appointmentDate,
        appointmentPriceInCents,
        clinicId: session.user.clinic.id,
        status,
      })
      .onConflictDoUpdate({
        target: [appointmentsTable.id],
        set: {
          patientId,
          doctorId,
          date: appointmentDate,
          appointmentPriceInCents,
          status,
        },
      });

    revalidatePath("/appointments");
    revalidatePath("/dashboard");
  });
