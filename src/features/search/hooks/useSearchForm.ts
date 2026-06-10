import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { getUser } from "@/features/github-user";
import { isNotFoundError } from "@/shared/api";
import {
  searchSchema,
  type SearchFormValues,
} from "../schemas/search.schema";

export const useSearchForm = () => {
  const navigate = useNavigate();

  const form = useForm<SearchFormValues>({
    resolver: zodResolver(searchSchema),
    defaultValues: { username: "" },
    mode: "onSubmit",
    reValidateMode: "onChange",
  });

  const onSubmit = async ({ username }: SearchFormValues) => {
    try {
      await getUser(username);
      navigate(`/user/${username}`);
    } catch (error) {
      if (isNotFoundError(error)) {
        form.setError("username", {
          type: "server",
          message: "Usuário não encontrado.",
        });
      } else {
        form.setError("username", {
          type: "server",
          message: "Não foi possível consultar o GitHub.",
        });
      }
      form.setFocus("username");
    }
  };

  const submitUsername = (username: string) => {
    form.setValue("username", username, { shouldValidate: true });
    void form.handleSubmit(onSubmit)();
  };

  return {
    form,
    onSubmit,
    submitUsername,
    isSubmitting: form.formState.isSubmitting,
  };
};
