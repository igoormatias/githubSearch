import { Link } from "react-router-dom";
import {
  FiBriefcase,
  FiExternalLink,
  FiGlobe,
  FiMail,
  FiMapPin,
} from "react-icons/fi";
import { Col, Row, Stack } from "react-bootstrap";
import type { GitHubUser } from "../types/user";
import { formatNumber } from "@/shared/lib";

type UserProfileProps = {
  user: GitHubUser;
};

export const UserProfile = ({ user }: UserProfileProps) => {
  const website = user.blog?.trim() || null;

  return (
    <aside className="user-sidebar text-center text-lg-start">
      <img
        src={user.avatar_url}
        alt={`Avatar de ${user.login}`}
        className="user-avatar mb-3 mx-auto mx-lg-0"
      />

      <Stack gap={1} className="mb-3">
        <h1 className="h4 fw-bold mb-0">{user.name ?? user.login}</h1>
        <p className="text-secondary mb-0">@{user.login}</p>
      </Stack>

      {user.bio && <p className="user-bio mb-3">{user.bio}</p>}

      <ul className="list-unstyled user-meta mb-0">
        {user.company && (
          <li className="d-flex align-items-center justify-content-center justify-content-lg-start gap-2 text-secondary small py-1">
            <FiBriefcase className="flex-shrink-0" aria-hidden="true" />
            <span>{user.company}</span>
          </li>
        )}
        {user.location && (
          <li className="d-flex align-items-center justify-content-center justify-content-lg-start gap-2 text-secondary small py-1">
            <FiMapPin className="flex-shrink-0" aria-hidden="true" />
            <span>{user.location}</span>
          </li>
        )}
        <li className="d-flex align-items-center justify-content-center justify-content-lg-start gap-2 text-secondary small py-1">
          <FiMail className="flex-shrink-0" aria-hidden="true" />
          {user.email ? (
            <a href={`mailto:${user.email}`} className="text-primary">
              {user.email}
            </a>
          ) : (
            <span>Email não público</span>
          )}
        </li>
        {website && (
          <li className="d-flex align-items-center justify-content-center justify-content-lg-start gap-2 text-secondary small py-1">
            <FiGlobe className="flex-shrink-0" aria-hidden="true" />
            <a
              href={website.startsWith("http") ? website : `https://${website}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary text-truncate"
            >
              {website}
            </a>
          </li>
        )}
        <li className="d-flex align-items-center justify-content-center justify-content-lg-start gap-2 text-secondary small py-1">
          <FiExternalLink className="flex-shrink-0" aria-hidden="true" />
          <a
            href={user.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary"
          >
            Abrir no GitHub
          </a>
        </li>
      </ul>

      <Row className="user-profile-stats g-2 text-center">
        <Col xs={4} className="min-w-0">
          <p className="user-stat-value mb-0">
            {formatNumber(user.public_repos)}
          </p>
          <p className="user-stat-label mb-0">Repositórios</p>
        </Col>
        <Col xs={4} className="min-w-0">
          <p className="user-stat-value mb-0">
            {formatNumber(user.followers)}
          </p>
          <p className="user-stat-label mb-0">Seguidores</p>
        </Col>
        <Col xs={4} className="min-w-0">
          <p className="user-stat-value mb-0">
            {formatNumber(user.following)}
          </p>
          <p className="user-stat-label mb-0">Seguindo</p>
        </Col>
      </Row>

      <Link
        to="/"
        className="d-lg-none small text-primary mt-3 d-inline-block"
      >
        Voltar
      </Link>
    </aside>
  );
};
