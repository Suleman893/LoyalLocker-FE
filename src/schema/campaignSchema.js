import * as Yup from "yup";

export const addCampaignSchema = Yup.object({
  campaignName: Yup.string()
    .min(5, "Must be at least 5 characters")
    .max(100, "Must be at most 100 characters")
    .required("Campaign name is required"),
  emailSubject: Yup.string().required("Sender subject is required"),
  senderEmail: Yup.string()
    .email("Must be a valid email")
    .min(5, "Must be at least 5 characters")
    .max(100, "Must be at most 100 characters")
    .required("Sender email is required"),
  senderName: Yup.string().required("Sender name is required"),
  emailTemplateId: Yup.number().required("Email template id is required"),
  segmentId: Yup.number().required("Segment id is required"),
  mailChimpSegmentId: Yup.string().required("Mailchimp segment id is required"),
});

export const addTemplateSchema = Yup.object({
  templateName: Yup.string()
    .min(5, "Must be at least 5 characters")
    .max(100, "Must be at most 100 characters")
    .required("Template name is required"),
  templateDescription: Yup.string()
    .min(30, "Must be at least 30 characters")
    .required("Template description is required"),
});

export const addJourneySchema = Yup.object({
  name: Yup.string()
    .min(5, "Must be at least 5 characters")
    .required("Journey name is required"),
  description: Yup.string()
    .min(30, "Must be at least 30 characters")
    .required("Journey description is required"),
  segmentId: Yup.number().required("Segment is required"),
  segments: Yup.array()
    .min(1, "Segment is required")
    .max(1, "Segment is required")
    .required("Segment is required"),
  journeySteps: Yup.array()
    .min(1, "At least one journey step is required")
    .required("Journey step is required"),
});

export const addSegmentSchema = Yup.object({
  segmentName: Yup.string()
    .min(5, "Must be at least 5 characters")
    .required("Segment name is required"),
});
