import * as Yup from "yup";

export const loginSchema = (t: any) => {
  return Yup.object().shape({
    email: Yup.string().email(t("invalid_email")).required(t("field_required")),
    password: Yup.string().min(8, t("password_short")).max(50, t("password_long")).required(t("field_required")),
  });
};

export const signupSchema = (t: any) => {
  return Yup.object().shape({
    name: Yup.string().required(t("field_required")),
    email: Yup.string().email(t("invalid_email")).required(t("field_required")),
    password: Yup.string().min(8, t("password_short")).max(50, t("password_long")).required(t("field_required")),
    verifyPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], t("password_mismatch"))
      .required(t("field_required")),
  });
};

export const recoverSchema = (t: any) => {
  return Yup.object().shape({
    email: Yup.string().email(t("invalid_email")).required(t("field_required")),
    emailVerify: Yup.string()
      .oneOf([Yup.ref("email"), null], t("email_mismatch"))
      .email(t("invalid_email"))
      .required(t("field_required")),
  });
};

export const resetPasswordSchema = (t: any) => {
  return Yup.object().shape({
    newPassword: Yup.string().min(8, t("password_short")).max(50, t("password_long")).required(t("field_required")),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("newPassword"), null], t("password_mismatch"))
      .required(t("field_required")),
  });
};

export const nameUpdateSchema = (t: any) => {
  return Yup.object().shape({
    name: Yup.string().required(t("field_required")),
    checkedColor: Yup.string(),
  });
};

export const passwordUpdateSchema = (t: any) => {
  return Yup.object().shape({
    oldPassword: Yup.string().required(t("field_required")),
    newPassword: Yup.string().required(t("field_required")).min(8, t("password_short")).max(50, t("password_long")),
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

export const tagSchema = (t: any) => {
  return Yup.object().shape({
    name: Yup.string().required(t("field_required")),
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
    url: Yup.string().required(t("field_required")),
    device: Yup.string().required(t("field_required")),
  });
};

export const updatePageSchema = (t: any) => {
  return Yup.object().shape({
    url: Yup.string().url(t("url_invalid")).required(t("field_required")),
    device: Yup.string().required(t("field_required")),
  });
};
