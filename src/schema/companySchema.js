import * as Yup from "yup";

export const addCompany = Yup.object().shape({
  brandName: Yup.string()
    .min(2, "Must be at least 2 characters")
    .required("Brand name is required"),
  firstName: Yup.string()
    .min(2, "Must be at least 2 characters")
    .max(30, "Must be at most 30 characters")
    .required("First name is required"),
  lastName: Yup.string()
    .min(2, "Must be at least 2 characters")
    .max(30, "Must be at most 30 characters")
    .optional(),
  mobile: Yup.string()
    .matches(/^[0-9]+$/, "Mobile number must contain only digits")
    .required("Mobile no is required"),
  currency: Yup.string().required("Currency is required"),
  email: Yup.string()
    .email("Must be a valid email")
    .min(5, "Must be at least 5 characters")
    .max(60, "Must be at most 60 characters")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Must be at least 8 characters")
    .max(25, "Must be at most 25 characters")
    .required("Password is required"),
});

export const editCompany = Yup.object().shape({
  brandName: Yup.string()
    .min(2, "Must be at least 2 characters")
    .required("Brand name is required"),
  firstName: Yup.string()
    .min(2, "Must be at least 2 characters")
    .max(30, "Must be at most 30 characters")
    .required("First name is required"),
  lastName: Yup.string()
    .min(2, "Must be at least 2 characters")
    .max(30, "Must be at most 30 characters")
    .optional(),
  mobile: Yup.string()
    .matches(/^[0-9]+$/, "Mobile number must contain only digits")
    .required("Mobile no is required"),
  currency: Yup.string().required("Currency is required"),
  email: Yup.string()
    .email("Must be a valid email")
    .min(5, "Must be at least 5 characters")
    .max(60, "Must be at most 60 characters")
    .required("Email is required"),
});

export const inviteMemberSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, "Must be at least 2 characters")
    .max(30, "Must be at most 30 characters")
    .required("First name is required"),
  lastName: Yup.string()
    .min(2, "Must be at least 2 characters")
    .max(30, "Must be at most 30 characters")
    
    .nullable(),
  email: Yup.string()
    .email("Must be a valid email")
    .min(5, "Must be at least 5 characters")
    .max(60, "Must be at most 60 characters")
    .required("Email is required"),
  storeId: Yup.number().required("Store selection is required"),
});

export const rewardSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Must be at least 2 characters")
    .max(80, "Must be at most 80 characters")
    .required("Name is required"),
  rewardPoints: Yup.number()
    .typeError("Points must be a number")
    .test(
      "is-valid-number",
      "Points must be between 2 and 8 digits",
      (value) => value >= 10 && value <= 99999999
    )
    .required("Reward points are required"),
  expirationDate: Yup.string().required("Expiry date of reward is required"),
  productId: Yup.number().required("Product selection is required"),
  photoUrl: Yup.string().required("Photo is required"),
  claimInstruction: Yup.string()
    .min(5, "Must be at least 5 characters")
    .max(1000, "Must be at most 1000 characters")
    .required("Description are required"),
});

export const offerSchema = Yup.object().shape({
  storeId: Yup.array()
    .min(1, "Store selection is required")
    .required("Store selection is required"),
  expiryDate: Yup.string().required("Expiry date of reward is required"),
  discountPercentage: Yup.string().required("Discount percentage is required"),
  discountedPrice: Yup.string().required("Discounted price is required"),
  claimInstruction: Yup.string()
    .min(5, "Must be at least 5 characters")
    .max(1000, "Must be at most 1000 characters")
    .required("Description are required"),
  productId: Yup.number().required("Product is required"),
});
