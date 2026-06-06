import axios, { isAxiosError } from "axios";

export const apiClient = axios.create({
  baseURL: "https://api.github.com",
  headers: {
    Accept: "application/vnd.github+json",
  },
});

export const isNotFoundError = (error: unknown): boolean => {
  return isAxiosError(error) && error.response?.status === 404;
};

export const getErrorMessage = (error: unknown): string => {
  if (isAxiosError(error)) {
    if (error.response?.status === 403) {
      return "Limite de requisições da API do GitHub excedido.";
    }

    if (error.response?.status === 404) {
      return "Recurso não encontrado.";
    }

    return error.message;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "Não foi possível carregar os dados. Tente novamente.";
};
