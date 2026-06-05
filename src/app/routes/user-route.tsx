import type { LoaderFunctionArgs } from "react-router-dom";
import { getUser } from "@/features/user/services/user-service";
import { getUserRepositories } from "@/features/repositories/services/repository-service";
import { isNotFoundError } from "@/shared/api";

export const userLoader = async ({ params }: LoaderFunctionArgs) => {
  const username = params.username;

  if (!username) {
    throw new Response("Username is required", { status: 400 });
  }

  try {
    const [user, repositories] = await Promise.all([
      getUser(username),
      getUserRepositories(username),
    ]);

    return { user, repositories };
  } catch (error) {
    if (isNotFoundError(error)) {
      throw new Response("User not found", { status: 404 });
    }

    throw error;
  }
};
