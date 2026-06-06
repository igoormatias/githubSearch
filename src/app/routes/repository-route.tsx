import type { LoaderFunctionArgs } from "react-router-dom";
import { getRepository } from "@/features/repositories";
import { isNotFoundError } from "@/shared/api";

export const repositoryLoader = async ({ params }: LoaderFunctionArgs) => {
  const owner = params.owner;
  const repo = params.repo;

  if (!owner || !repo) {
    throw new Response("Owner and repository are required", { status: 400 });
  }

  try {
    return await getRepository(owner, repo);
  } catch (error) {
    if (isNotFoundError(error)) {
      throw new Response("Repository not found", { status: 404 });
    }

    throw error;
  }
};
