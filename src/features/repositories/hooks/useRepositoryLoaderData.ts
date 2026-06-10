import { useLoaderData } from "react-router-dom";
import type { repositoryLoader } from "@/app/routes/repository-route";

export type RepositoryLoaderData = Awaited<ReturnType<typeof repositoryLoader>>;

export const useRepositoryLoaderData = (): RepositoryLoaderData =>
  useLoaderData() as RepositoryLoaderData;
