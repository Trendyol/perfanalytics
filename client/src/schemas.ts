import * as Yup from "yup";

export const loginSchema = (t: any) => {
  return Yup.object().shape({
    email: Yup.string().email(t("invalid_email")).required(t("field_required")),
    password: Yup.string()
      .min(8, t("password_short"))
      .max(50, t("password_long"))
      .required(t("field_required")),
  });
};

export const registerSchema = (t: any) => {
  return Yup.object().shape({
    name: Yup.string().required(t("field_required")),
    email: Yup.string().email(t("invalid_email")).required(t("field_required")),
    password: Yup.string()
      .min(8, t("password_short"))
      .max(50, t("password_long"))
      .required(t("field_required")),
  });
};

export const nameUpdateSchema = (t: any) => {
  return Yup.object().shape({
    name: Yup.string().required(t("field_required")),
  });
};
