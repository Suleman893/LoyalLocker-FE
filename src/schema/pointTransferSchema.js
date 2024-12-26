import * as Yup from "yup";

export const pointTransfer = Yup.object({
  transferType: Yup.string().required("Transfer Type is required"),
  consumerId: Yup.string().required("Member selection is required"),
  status: Yup.string().required("Status is required"),
  pointsExpiry: Yup.string().when("status", {
    is: "ACTIVE",
    then: () =>
      Yup.date().required("Point Expiry is required when status Active"),
  }),
  points: Yup.number()
    .typeError("Points must be a number")
    .test(
      "is-valid-number",
      "Points must be between 2 and 8 digits",
      (value) => value >= 10 && value <= 99999999
    )
    .required("Points to transfer is required"),
  description: Yup.string()
    .min(8, "Must be at least 8 characters")
    .max(1000, "Must be at most 1000 characters")
    .required("Description of transfer is required"),
});

export const couponPointsTransfer = Yup.object({
  transferType: Yup.string().required("Transfer Type is required"),
  consumerId: Yup.string().required("Member selection is required"),
  description: Yup.string()
    .min(8, "Must be at least 8 characters")
    .max(1000, "Must be at most 1000 characters")
    .required("Description of transfer is required"),
});
