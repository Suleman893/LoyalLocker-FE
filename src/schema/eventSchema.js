import * as Yup from "yup";

export const addEventSchema = Yup.object({
  name: Yup.string().required("Event name is required"),
  status: Yup.string().required("Status is required"),
  description: Yup.string().required("Description is required"),
});

export const addEarningRuleSchema = Yup.object().shape({
  eventId: Yup.number().required("Event selection is required"),
  name: Yup.string().required("Rule name is required"),
  description: Yup.string().required("Rule description is required"),
});

// Define conditional schemas for specific event types
export const scenarioSchema = Yup.object().shape({
  eventId: Yup.number().required("Event selection is required"),
  name: Yup.string().required("Rule name is required"),
  description: Yup.string().required("Rule description is required"),
  points: Yup.number()
    .typeError("Points must be a number")
    .test(
      "is-valid-number",
      "Points must be between 2 and 8 digits",
      (value) => value >= 10 && value <= 99999999
    )
    .required("Points are required"),
  minTransactionValue: Yup.number().required("Minimum transaction is required"),
  status: Yup.string().required("Status is required"),
  pointsType: Yup.string().required("Points type value is required"),
  purchaseType: Yup.string().required("Purchase type value is required"),
  storeId: Yup.array()
    .min(1, "Store selection is required")
    .required("Store selection is required"),
});

export const referralSchema = Yup.object().shape({
  eventId: Yup.number().required("Event selection is required"),
  name: Yup.string().required("Rule name is required"),
  description: Yup.string().required("Rule description is required"),
  points: Yup.number()
    .typeError("Points must be a number")
    .test(
      "is-valid-number",
      "Points must be between 2 and 8 digits",
      (value) => value >= 10 && value <= 99999999
    )
    .required("Points are required"),
  pointsType: Yup.string().required("Points type value is required"),
  status: Yup.string().required("Status is required"),
});

export const generalSchema = Yup.object().shape({
  eventId: Yup.number().required("Event selection is required"),
  name: Yup.string().required("Rule name is required"),
  description: Yup.string().required("Rule description is required"),
  points: Yup.number()
    .typeError("Points must be a number")
    .test(
      "is-valid-number",
      "Points must be between 2 and 8 digits",
      (value) => value >= 10 && value <= 99999999
    )
    .required("Points are required"),
  minTransactionValue: Yup.number().required("Minimum transaction is required"),
  status: Yup.string().required("Status is required"),
  pointsType: Yup.string().required("Points type value is required"),
  purchaseType: Yup.string().required("Purchase type value is required"),
  storeId: Yup.array()
    .min(1, "Store selection is required")
    .required("Store selection is required"),
});

export const geolocationSchema = Yup.object().shape({
  eventId: Yup.number().required("Event selection is required"),
  name: Yup.string().required("Rule name is required"),
  description: Yup.string().required("Rule description is required"),
  points: Yup.number()
    .typeError("Points must be a number")
    .test(
      "is-valid-number",
      "Points must be between 2 and 8 digits",
      (value) => value >= 10 && value <= 99999999
    )
    .required("Points are required"),
  distanceFromStore: Yup.number().required("Distance from store is required "),
  status: Yup.string().required("Status is required"),
  pointsType: Yup.string().required("Points type value is required"),
  purchaseType: Yup.string().required("Purchase type value is required"),
  storeId: Yup.array()
    .min(1, "Store selection is required")
    .required("Store selection is required"),
});

export const multiplySchema = Yup.object().shape({
  eventId: Yup.number().required("Event selection is required"),
  name: Yup.string().required("Rule name is required"),
  description: Yup.string().required("Rule description is required"),
  points: Yup.number()
    .typeError("Points must be a number")
    .test(
      "is-valid-number",
      "Points must be between 2 and 8 digits",
      (value) => value >= 10 && value <= 99999999
    )
    .required("Points are required"),
  multiplier: Yup.number().required("Multiplier of points is required "),
  status: Yup.string().required("Status is required"),
  pointsType: Yup.string().required("Points type value is required"),
  purchaseType: Yup.string().required("Purchase type value is required"),
  productsId: Yup.array()
    .min(1, "Products selection is required")
    .required("Products selection is required"),
  storeId: Yup.array()
    .min(1, "Store selection is required")
    .required("Store selection is required"),
});

export const productSchema = Yup.object().shape({
  eventId: Yup.number().required("Event selection is required"),
  name: Yup.string().required("Rule name is required"),
  description: Yup.string().required("Rule description is required"),
  points: Yup.number()
    .typeError("Points must be a number")
    .test(
      "is-valid-number",
      "Points must be between 2 and 8 digits",
      (value) => value >= 10 && value <= 99999999
    )
    .required("Points are required"),
  status: Yup.string().required("Status is required"),
  pointsType: Yup.string().required("Points type value is required"),
  purchaseType: Yup.string().required("Purchase type value is required"),
  productId: Yup.string().required("Product selection is required"),
  storeId: Yup.array()
    .min(1, "Store selection is required")
    .required("Store selection is required"),
});
