import { format, parseISO } from "date-fns";
import pt from "date-fns/locale/pt";

export function formatDate(date) {
  const parsed = parseISO(date);
  const formattedDate = format(parsed, "dd/MM/yyyy", {
    locale: pt
  });
  return formattedDate;
}

export function formatDateHour(date) {
  const parsed = parseISO(date);
  const formattedDate = format(parsed, "dd/MM/yyyy HH:mm", {
    locale: pt
  });
  return formattedDate;
}
