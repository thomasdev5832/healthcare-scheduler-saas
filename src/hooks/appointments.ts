"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";

import { deleteAppointment } from "@/actions/delete-appointment";
import { getAvailableTimes } from "@/actions/get-available-times";
import { upsertAppointment } from "@/actions/upsert-appointment";

// Definição do tipo TimeSlot
export interface TimeSlot {
  value: string;
  available: boolean;
  label: string;
}

// Keys para os queries
export const appointmentKeys = {
  all: ["appointments"] as const,
  availableTimes: (doctorId: string, date: string) =>
    [...appointmentKeys.all, "availableTimes", doctorId, date] as const,
};

// Hook para buscar horários disponíveis
export function useAvailableTimes(
  doctorId: string | undefined,
  date: Date | undefined,
) {
  const formattedDate = date ? dayjs(date).format("YYYY-MM-DD") : undefined;
  const enabled = !!doctorId && !!formattedDate;

  return useQuery<TimeSlot[]>({
    queryKey: enabled
      ? appointmentKeys.availableTimes(doctorId!, formattedDate!)
      : ["appointments", "availableTimes", "disabled"],
    queryFn: async () => {
      if (!doctorId || !formattedDate) return [];

      try {
        const result = await getAvailableTimes({
          doctorId,
          date: formattedDate,
        });

        return result?.data || [];
      } catch (error) {
        console.error("Erro ao buscar horários disponíveis:", error);
        return [];
      }
    },
    enabled,
    // Configurações para garantir dados sempre atualizados
    staleTime: 0, // Considera os dados obsoletos imediatamente
    refetchOnMount: true, // Recarrega os dados sempre que o componente for montado
    refetchOnWindowFocus: true, // Recarrega os dados quando a janela receber foco
  });
}

// Hook para criar/atualizar agendamentos
export function useUpsertAppointment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (values: Parameters<typeof upsertAppointment>[0]) => {
      try {
        const result = await upsertAppointment(values);

        // @ts-expect-error - Os tipos da server action não estão corretamente definidos
        if (result?.error) {
          // @ts-expect-error - Os tipos da server action não estão corretamente definidos
          throw new Error(result.error);
        }

        return result;
      } catch (error) {
        if (error instanceof Error) {
          throw error;
        }
        throw new Error("Erro ao salvar agendamento");
      }
    },
    onSuccess: (_, variables) => {
      // Invalida queries relacionadas para garantir que os dados estejam atualizados
      queryClient.invalidateQueries({ queryKey: appointmentKeys.all });

      if (variables.doctorId && variables.date) {
        const formattedDate = dayjs(variables.date).format("YYYY-MM-DD");
        queryClient.invalidateQueries({
          queryKey: appointmentKeys.availableTimes(
            variables.doctorId,
            formattedDate,
          ),
        });
      }
    },
  });
}

// Hook para deletar agendamentos
export function useDeleteAppointment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (values: Parameters<typeof deleteAppointment>[0]) => {
      try {
        const result = await deleteAppointment(values);

        // @ts-expect-error - Os tipos da server action não estão corretamente definidos
        if (result?.error) {
          // @ts-expect-error - Os tipos da server action não estão corretamente definidos
          throw new Error(result.error);
        }

        return result;
      } catch (error) {
        if (error instanceof Error) {
          throw error;
        }
        throw new Error("Erro ao deletar agendamento");
      }
    },
    onSuccess: () => {
      // Invalida queries relacionadas para garantir que os dados estejam atualizados
      queryClient.invalidateQueries({ queryKey: appointmentKeys.all });
    },
  });
}
