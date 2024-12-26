import * as Yup from "yup";

export const registerSchema = Yup.object({
  firstName: Yup.string()
    .min(2, "Must be at least 2 characters")
    .max(30, "Must be at most 30 characters")
    .required("First name is required"),
  lastName: Yup.string()
    .min(2, "Must be at least 2 characters")
    .max(30, "Must be at most 30 characters")
    .required("Last name is required"),
  email: Yup.string()
    .email("Must be a valid email")
    .min(5, "Must be at least 5 characters")
    .max(60, "Must be at most 60 characters")
    .required("Email is required"),
  mobile: Yup.string()
    .matches(/^[0-9]+$/, "Mobile number must contain only digits")
    .required("Mobile no is required"),
  gender: Yup.string()
    .matches(/^(M|F|U)$/, "Must be either M, F, or U")
    .required("Gender is required"),
  password: Yup.string()
    .min(8, "Must be at least 8 characters")
    .max(25, "Must be at most 25 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .min(8, "Must be at least 8 characters")
    .max(25, "Must be at most 25 characters")
    .required("Password is required"),
  country: Yup.string()
    .matches(/^US$/, "Must be set to US")
    .required("Country is required"),
  dateOfBirth: Yup.string().required("Date of birth is required"),
  photoUrl: Yup.string().max(1000, "Must be at most 1000 characters"),
});

export const loginSchema = Yup.object({
  username: Yup.string()
    .email("Must be a valid email")
    .min(5, "Must be at least 5 characters")
    .max(60, "Must be at most 60 characters")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Must be at least 8 characters")
    .max(25, "Must be at most 25 characters")
    .required("Password is required"),
});

export const resetPasswordEmail = Yup.object({
  email: Yup.string()
    .email("Must be a valid email")
    .min(5, "Must be at least 5 characters")
    .max(60, "Must be at most 60 characters")
    .required("Email is required"),
});

export const resetPasswordsSchema = Yup.object({
  newPassword: Yup.string()
    .min(8, "Must be at least 8 characters")
    .max(25, "Must be at most 25 characters")
    .required("Password is required"),
  newConfirmPassword: Yup.string()
    .min(8, "Must be at least 8 characters")
    .max(25, "Must be at most 25 characters")
    .required("Confirm password is required"),
});

export const updatePasswordSchema = Yup.object({
  currentPassword: Yup.string()
    .min(8, "Must be at least 8 characters")
    .max(25, "Must be at most 25 characters")
    .required("Password is required"),
  newPassword: Yup.string()
    .min(8, "Must be at least 8 characters")
    .max(25, "Must be at most 25 characters")
    .required("Confirm password is required"),
  confirmPassword: Yup.string()
    .min(8, "Must be at least 8 characters")
    .max(25, "Must be at most 25 characters")
    .required("Confirm password is required"),
});

export const updateProfileSchema = Yup.object({
  firstName: Yup.string()
    .min(2, "Must be at least 2 characters")
    .max(30, "Must be at most 30 characters")
    .required("First name is required"),
  // lastName: Yup.string()
  //   .min(2, "Must be at least 2 characters")
  //   .max(30, "Must be at most 30 characters")
  //   .required("Last name is required"),
  mobile: Yup.string()
    .matches(/^[0-9]+$/, "Mobile number must contain only digits")
    .required("Mobile no is required"),
  gender: Yup.string()
    .matches(/^(M|F|U)$/, "Must be either M, F, or U")
    .required("Gender is required"),
  country: Yup.string()
    .matches(/^US$/, "Must be set to US")
    .required("Country is required"),
  dateOfBirth: Yup.string().required("Date of birth is required"),
  // photoUrl: Yup.string().max(1000, "Must be at most 1000 characters"),
});
