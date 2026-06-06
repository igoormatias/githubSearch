const dateFormatter = new Intl.DateTimeFormat("pt-BR");
const numberFormatter = new Intl.NumberFormat("pt-BR");

export const formatDate = (dateString: string): string => {
  return dateFormatter.format(new Date(dateString));
};

export const formatNumber = (value: number): string => {
  return numberFormatter.format(value);
};

export const formatRelativeDate = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) {
    return "hoje";
  }

  if (diffDays === 1) {
    return "há 1 dia";
  }

  if (diffDays < 30) {
    return `há ${diffDays} dias`;
  }

  const diffMonths = Math.floor(diffDays / 30);

  if (diffMonths === 1) {
    return "há 1 mês";
  }

  if (diffMonths < 12) {
    return `há ${diffMonths} meses`;
  }

  const diffYears = Math.floor(diffMonths / 12);
  return diffYears === 1 ? "há 1 ano" : `há ${diffYears} anos`;
};
