import { useState } from "react";
import { Skeleton } from "@/shared/ui";

type UserAvatarProps = {
  src: string;
  alt: string;
  login: string;
};

const getInitials = (login: string): string => {
  return login.slice(0, 2).toUpperCase();
};

export const UserAvatar = ({ src, alt, login }: UserAvatarProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        className="user-avatar user-avatar-fallback mb-3 mx-auto mx-lg-0 d-flex align-items-center justify-content-center"
        role="img"
        aria-label={alt}
      >
        <span className="user-avatar-initials" aria-hidden="true">
          {getInitials(login)}
        </span>
      </div>
    );
  }

  return (
    <div className="user-avatar-wrapper mb-3 mx-auto mx-lg-0">
      {!isLoaded && (
        <Skeleton className="sk-avatar user-avatar" aria-hidden="true" />
      )}
      <img
        src={src}
        alt={alt}
        className="user-avatar"
        loading="eager"
        width={280}
        height={280}
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        style={{ display: isLoaded ? "block" : "none" }}
      />
    </div>
  );
};
