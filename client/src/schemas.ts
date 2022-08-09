import * as Yup from "yup";

export const loginSchema = (t: any) => {
  return Yup.object().shape({
    email: Yup.string().email(t("invalid_email")).required(t("field_required")),
    password: Yup.string().min(8, t("password_short")).max(50, t("password_long")).required(t("field_required")),
  });
};

export const registerSchema = (t: any) => {
  return Yup.object().shape({
    name: Yup.string().required(t("field_required")),
    email: Yup.string().email(t("invalid_email")).required(t("field_required")),
    password: Yup.string().min(8, t("password_short")).max(50, t("password_long")).required(t("field_required")),
  });
};

export const nameUpdateSchema = (t: any) => {
  return Yup.object().shape({
    name: Yup.string().required(t("field_required")),
  });
};

export const passwordUpdateSchema = (t: any) => {
  return Yup.object().shape({
    oldPassword: Yup.string().required(t("field_required")),
    newPassword: Yup.string().required(t("field_required")),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("newPassword"), null], t("password_mismatch"))
      .required(t("field_required")),
  });
};

export const addDomainSchema = (t: any) => {
  return Yup.object().shape({
    name: Yup.string().required(t("field_required")),
    url: Yup.string().url(t("url_invalid")).required(t("field_required")),
  });
};

export const updateDomainSchema = (t: any) => {
  return Yup.object().shape({
    name: Yup.string().required(t("field_required")),
    url: Yup.string().url(t("url_invalid")).required(t("field_required")),
  });
};

export const addPageSchema = (t: any) => {
  return Yup.object().shape({
    url: Yup.string().url(t("url_invalid")).required(t("field_required")),
    device: Yup.string().required(t("field_required")),
  });
};

export const updatePageSchema = (t: any) => {
  return Yup.object().shape({
    url: Yup.string().url(t("url_invalid")).required(t("field_required")),
    device: Yup.string().required(t("field_required")),
  });
};
