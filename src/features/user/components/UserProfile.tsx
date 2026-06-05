import { Link } from "react-router-dom";
import {
  FiBriefcase,
  FiExternalLink,
  FiGlobe,
  FiMail,
  FiMapPin,
} from "react-icons/fi";
import type { GitHubUser } from "../types/user";
import { formatNumber } from "@/shared/utils";

type UserProfileProps = {
  user: GitHubUser;
};

export const UserProfile = ({ user }: UserProfileProps) => {
  const website = user.blog?.trim() || null;

  return (
    <aside className="space-y-6">
      <img
        src={user.avatar_url}
        alt={`${user.login} avatar`}
        className="h-64 w-full rounded-xl border border-border object-cover"
      />

      <div className="space-y-2">
        <h1 className="text-2xl font-bold text-foreground">
          {user.name ?? user.login}
        </h1>
        <p className="text-foreground-muted">@{user.login}</p>
      </div>

      {user.bio && (
        <p className="text-sm leading-relaxed text-foreground">{user.bio}</p>
      )}

      <ul className="space-y-3 text-sm text-foreground-muted">
        {user.company && (
          <li className="flex items-center gap-2">
            <FiBriefcase aria-hidden="true" />
            <span>{user.company}</span>
          </li>
        )}
        {user.location && (
          <li className="flex items-center gap-2">
            <FiMapPin aria-hidden="true" />
            <span>{user.location}</span>
          </li>
        )}
        {user.email && (
          <li className="flex items-center gap-2">
            <FiMail aria-hidden="true" />
            <a
              href={`mailto:${user.email}`}
              className="text-primary transition-colors duration-200 hover:underline"
            >
              {user.email}
            </a>
          </li>
        )}
        {website && (
          <li className="flex items-center gap-2">
            <FiGlobe aria-hidden="true" />
            <a
              href={website.startsWith("http") ? website : `https://${website}`}
              target="_blank"
              rel="noopener noreferrer"
              className="truncate text-primary transition-colors duration-200 hover:underline"
            >
              {website}
            </a>
          </li>
        )}
        <li className="flex items-center gap-2">
          <FiExternalLink aria-hidden="true" />
          <a
            href={user.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary transition-colors duration-200 hover:underline"
          >
            View on GitHub
          </a>
        </li>
      </ul>

      <div className="grid grid-cols-3 gap-4 border-t border-border pt-6 text-center">
        <div>
          <p className="text-lg font-semibold text-foreground">
            {formatNumber(user.public_repos)}
          </p>
          <p className="text-xs uppercase tracking-wide text-foreground-muted">
            Repositories
          </p>
        </div>
        <div>
          <p className="text-lg font-semibold text-foreground">
            {formatNumber(user.followers)}
          </p>
          <p className="text-xs uppercase tracking-wide text-foreground-muted">
            Followers
          </p>
        </div>
        <div>
          <p className="text-lg font-semibold text-foreground">
            {formatNumber(user.following)}
          </p>
          <p className="text-xs uppercase tracking-wide text-foreground-muted">
            Following
          </p>
        </div>
      </div>

      <Link
        to="/"
        className="inline-flex text-sm text-primary transition-colors duration-200 hover:underline"
      >
        Back to search
      </Link>
    </aside>
  );
};
