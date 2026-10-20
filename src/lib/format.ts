const brlFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

export function formatCentsToBRL(cents: number): string {
  if (!Number.isFinite(cents)) {
    return brlFormatter.format(0);
  }
  return brlFormatter.format(Math.round(cents) / 100);
}

export function formatIsoTime(isoString: string, timeZone?: string): string {
  try {
    const date = new Date(isoString);
    if (Number.isNaN(date.getTime())) {
      return "--:--";
    }
    return new Intl.DateTimeFormat("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
      ...(timeZone ? { timeZone } : {}),
    }).format(date);
  } catch {
    return "--:--";
  }
}

