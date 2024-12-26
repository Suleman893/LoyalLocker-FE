import * as Yup from "yup";

export const shopifyCredSchema = Yup.object({
  shopifyShopName: Yup.string().required("Shop name is required"),
  shopifyApiKey: Yup.string().required("API Key is required"),
  shopifyPassword: Yup.string().required("Password is required"),
});

export const mailChimpCredSchema = Yup.object({
  mailchimpApiKey: Yup.string().required("Mailchimp API Key is required"),
  mailchimpServerPrefix: Yup.string().required(
    "Mailchimp Server Prefix is required"
  ),
});
