export const formatDisplayDate = (
  dateString: string,
  format: "MM/YY"
): string => {
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      console.warn("Data inválida fornecida para formatação:", dateString);
      return "Inválida";
    }

    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const yearFull = date.getFullYear();

    if (format === "MM/YY") {
      const yearShort = yearFull.toString().slice(-2);
      return `${month}/${yearShort}`;
    }

    console.warn("Formato de data não suportado:", format);
    return "Formato Inválido";
  } catch (error) {
    console.error("Erro ao formatar data:", error);
    return "";
  }
};
export const formatDisplayDateWithYear = (isoString: string) => {
  const [year, month, day] = isoString.slice(0, 10).split("-");
  return `${day}/${month}/${year}`;
};
