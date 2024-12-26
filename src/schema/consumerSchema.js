import * as Yup from "yup";

export const inviteFriendSchema = Yup.object({
  email: Yup.string()
    .email("Must be a valid email")
    .min(5, "Must be at least 5 characters")
    .max(60, "Must be at most 60 characters")
    .required("Email is required"),
});
