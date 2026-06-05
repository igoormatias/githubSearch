import type { LoaderFunctionArgs } from "react-router-dom";
import { getUser } from "@/features/user/services/user-service";
import { isNotFoundError } from "@/shared/api";

export const userLoader = async ({ params }: LoaderFunctionArgs) => {
  const username = params.username;

  if (!username) {
    throw new Response("Username is required", { status: 400 });
  }

  try {
    const user = await getUser(username);
    return { user };
  } catch (error) {
    if (isNotFoundError(error)) {
      throw new Response("User not found", { status: 404 });
    }

    throw error;
  }
};
