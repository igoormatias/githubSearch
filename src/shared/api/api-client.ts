import axios, { isAxiosError } from "axios";
import { appEnv } from "@/shared/config/env";

export const apiClient = axios.create({
  baseURL: appEnv.apiUrl,
  headers: {
    Accept: "application/vnd.github+json",
    ...(appEnv.githubToken
      ? { Authorization: `Bearer ${appEnv.githubToken}` }
      : {}),
  },
});

export const isNotFoundError = (error: unknown): boolean => {
  return isAxiosError(error) && error.response?.status === 404;
};

export const isRateLimitError = (error: unknown): boolean => {
  return isAxiosError(error) && error.response?.status === 403;
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
