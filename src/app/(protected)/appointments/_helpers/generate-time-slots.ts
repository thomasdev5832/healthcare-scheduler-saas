import "dayjs/locale/pt-br";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import { doctorsTable } from "@/db/schema";

dayjs.extend(utc);
dayjs.locale("pt-br");

// Função para gerar time slots de 30 em 30 minutos baseado na disponibilidade do médico
export function generateTimeSlots(
  doctor: typeof doctorsTable.$inferSelect,
  selectedDate: Date,
): string[] {
  // Extrai as horas, minutos e segundos do horário de início
  const fromHour = Number(doctor.availableFromTime.split(":")[0]);
  const fromMinute = Number(doctor.availableFromTime.split(":")[1]);
  const fromSecond = Number(doctor.availableFromTime.split(":")[2] || 0);

  // Extrai as horas, minutos e segundos do horário de término
  const toHour = Number(doctor.availableToTime.split(":")[0]);
  const toMinute = Number(doctor.availableToTime.split(":")[1]);
  const toSecond = Number(doctor.availableToTime.split(":")[2] || 0);

  // Cria os objetos dayjs com as horas de início e fim, usando UTC e convertendo para local
  const availableFromTime = dayjs(selectedDate)
    .utc()
    .set("hour", fromHour)
    .set("minute", fromMinute)
    .set("second", fromSecond)
    .local();

  const availableToTime = dayjs(selectedDate)
    .utc()
    .set("hour", toHour)
    .set("minute", toMinute)
    .set("second", toSecond)
    .local();

  // Verifica o dia da semana da data selecionada
  const dayOfWeek = dayjs(selectedDate).day(); // 0 = domingo, 1 = segunda, ..., 6 = sábado

  // Verifica se o dia da semana está dentro da disponibilidade do médico
  if (
    dayOfWeek < doctor.availableFromWeekDay ||
    dayOfWeek > doctor.availableToWeekDay
  ) {
    return [];
  }

  // Gera os horários de 30 em 30 minutos
  const timeSlots: string[] = [];
  let currentTime = availableFromTime;

  while (currentTime.isBefore(availableToTime)) {
    timeSlots.push(currentTime.format("HH:mm"));
    currentTime = currentTime.add(30, "minute");
  }

  return timeSlots;
}
