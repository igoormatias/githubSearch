import { Link } from "react-router-dom";
import {
  FiBriefcase,
  FiExternalLink,
  FiGlobe,
  FiMail,
  FiMapPin,
} from "react-icons/fi";
import type { GitHubUser } from "../types/user";
import { formatNumber } from "@/shared/lib";

type UserProfileProps = {
  user: GitHubUser;
};

export const UserProfile = ({ user }: UserProfileProps) => {
  const website = user.blog?.trim() || null;

  return (
    <aside className="min-w-0 space-y-6 text-center lg:text-left">
      <img
        src={user.avatar_url}
        alt={`Avatar de ${user.login}`}
        className="mx-auto h-24 w-24 rounded-xl border border-border object-cover sm:h-[120px] sm:w-[120px] lg:mx-0 lg:h-64 lg:w-full"
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

      <ul className="space-y-3 text-left text-sm text-foreground-muted lg:text-left">
        {user.company && (
          <li className="flex items-center justify-center gap-2 lg:justify-start">
            <FiBriefcase aria-hidden="true" />
            <span>{user.company}</span>
          </li>
        )}
        {user.location && (
          <li className="flex items-center justify-center gap-2 lg:justify-start">
            <FiMapPin aria-hidden="true" />
            <span>{user.location}</span>
          </li>
        )}
        {user.email && (
          <li className="flex items-center justify-center gap-2 lg:justify-start">
            <FiMail aria-hidden="true" />
            <a
              href={`mailto:${user.email}`}
              className="cursor-pointer text-primary transition-colors duration-200 hover:underline"
            >
              {user.email}
            </a>
          </li>
        )}
        {website && (
          <li className="flex items-center justify-center gap-2 lg:justify-start">
            <FiGlobe aria-hidden="true" />
            <a
              href={website.startsWith("http") ? website : `https://${website}`}
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-pointer truncate text-primary transition-colors duration-200 hover:underline"
            >
              {website}
            </a>
          </li>
        )}
        <li className="flex items-center justify-center gap-2 lg:justify-start">
          <FiExternalLink aria-hidden="true" />
          <a
            href={user.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-pointer text-primary transition-colors duration-200 hover:underline"
          >
            Abrir no GitHub
          </a>
        </li>
      </ul>

      <div className="grid min-w-0 grid-cols-3 gap-2 border-t border-border px-1 pt-6 text-center sm:gap-4">
        <div className="min-w-0">
          <p className="text-base font-semibold text-foreground sm:text-lg">
            {formatNumber(user.public_repos)}
          </p>
          <p className="truncate text-[10px] uppercase tracking-wide text-foreground-muted sm:text-xs">
            Repositórios
          </p>
        </div>
        <div className="min-w-0">
          <p className="text-base font-semibold text-foreground sm:text-lg">
            {formatNumber(user.followers)}
          </p>
          <p className="truncate text-[10px] uppercase tracking-wide text-foreground-muted sm:text-xs">
            Seguidores
          </p>
        </div>
        <div className="min-w-0">
          <p className="text-base font-semibold text-foreground sm:text-lg">
            {formatNumber(user.following)}
          </p>
          <p className="truncate text-[10px] uppercase tracking-wide text-foreground-muted sm:text-xs">
            Seguindo
          </p>
        </div>
      </div>

      <Link
        to="/"
        className="inline-flex cursor-pointer text-sm text-primary transition-colors duration-200 hover:underline lg:hidden"
      >
        Voltar
      </Link>
    </aside>
  );
};
