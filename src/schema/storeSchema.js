import * as Yup from "yup";

export const addStore = Yup.object().shape({
  name: Yup.string()
    .trim()
    .min(2, "Must be at least 2 characters")
    .max(100, "Must be at most 100 characters")
    .required("Store name is required"),
  identifier: Yup.string()
    .trim()
    .min(2, "Must be at least 2 characters")
    .max(100, "Must be at most 100 characters")
    .required("Identifier is required"),
  phoneNo: Yup.string()
    .matches(/^[0-9]+$/, "Phone number must contain only digits")
    .required("Phone no is required"),
  status: Yup.string()
    .trim()
    .oneOf(["ACTIVE", "INACTIVE"], "Must be either ACTIVE or INACTIVE")
    .required("Status is required"),
  description: Yup.string()
    .max(1000, "Must be at most 1000 characters")
    .optional(),
  country: Yup.string()
    .trim()
    .min(6, "Must be at least 6 characters")
    .max(100, "Must be at most 100 characters")
    .required("Country is required"),
  city: Yup.string()
    .trim()
    .min(6, "Must be at least 6 characters")
    .max(100, "Must be at most 100 characters")
    .required("City is required"),
  address: Yup.string()
    .trim()
    .min(6, "Must be at least 6 characters")
    .max(500, "Must be at most 500 characters")
    .required("Address is required"),
  state: Yup.string().max(100, "Must be at most 100 characters").optional(),
  postalCode: Yup.string()
    .trim()
    .min(4, "Must be at least 4 characters")
    .max(10, "Must be at most 10 characters")
    .required("Postal Code is required"),
  // Uncomment and adjust locationGeoPoint validation if needed in the future
  // locationGeoPoint: Yup.object().shape({
  //   latitude: Yup.number().required("Latitude is required"),
  //   longitude: Yup.number().required("Longitude is required"),
  // }).nullable().optional(),
});
