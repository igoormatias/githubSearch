import type { GitHubUser } from "./user";
import type { Repository } from "@/features/repositories/types/repository";

export type UserPageData = {
  user: GitHubUser;
  repositories: Repository[];
};
