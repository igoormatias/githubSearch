import { z } from "zod";

export const GITHUB_USERNAME_REGEX =
  /^[a-zA-Z0-9](?:[a-zA-Z0-9]|-(?=[a-zA-Z0-9])){0,38}$/;

export const SEARCH_MESSAGES = {
  required: "Digite um usuário GitHub.",
  invalidFormat: "Digite apenas letras, números e hífens.",
} as const;

export const searchSchema = z.object({
  username: z
    .string()
    .trim()
    .min(1, SEARCH_MESSAGES.required)
    .max(39, SEARCH_MESSAGES.invalidFormat)
    .regex(GITHUB_USERNAME_REGEX, SEARCH_MESSAGES.invalidFormat),
});

export type SearchFormValues = z.infer<typeof searchSchema>;
