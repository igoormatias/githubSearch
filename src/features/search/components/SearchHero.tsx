import { Stack } from "react-bootstrap";

export const SearchHero = () => {
  return (
    <Stack gap={2} className="text-center">
      <h1 className="display-6 fw-bold mb-0">Buscar Usuário GitHub</h1>
      <p className="text-secondary mx-auto mb-0">
        Pesquise qualquer usuário do GitHub para explorar o perfil e os
        repositórios mais populares.
      </p>
    </Stack>
  );
};
