import Select from "@components/shared/Form/Select";
import TextField from "@components/shared/Form/TextField";
import { DeviceOptions } from "@constants";
import useTags from "@hooks/useTag";
import useWebhookToken from "@hooks/useWebhookToken";
import { getFullUrlWithPath } from "@utils/common";
import { FormikProps } from "formik";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import { FC } from "react";
import { PathSettings } from "src/interfaces";

interface GeneralFormProps {
  formik: FormikProps<PathSettings>;
}

const GeneralForm: FC<GeneralFormProps> = ({ formik }) => {
  const router = useRouter();
  const { pageId, domainId } = router.query;
  const { tags } = useTags(domainId as string);
  const { webhookToken } = useWebhookToken(pageId as string);
  const { t } = useTranslation("path");

  const webhookUrl = getFullUrlWithPath(`/report/run/token/${webhookToken}?name=ReportPointName&link=ReportPointRedirectUrl`);

  const copyToClipboard = (text: any) => {
    if (text) {
      navigator.clipboard.writeText(text);
    }
  };

  return (
    <form className="section w-full flex flex-col gap-3" onSubmit={formik.handleSubmit}>
      <div className="flex flex-col gap-2">
        <h5 className="text-[14px] font-medium text-gray-500">{t("webhook_title")}</h5>
        <TextField
          disabled
          name="url"
          value={webhookUrl}
          rightIcon="clipboard"
          rightIconClassName="text-gray-500 w-5 h-5 cursor-pointer hover:text-green-700 hover:fill-black hover:stroke-white"
          onRightIconClick={() => copyToClipboard(webhookUrl)}
        />
      </div>
      <div className="flex flex-col gap-2">
        <h5 className="text-[14px] font-medium text-gray-500">{t("path_url")}</h5>
        <TextField
          name="url"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.url}
          error={formik.touched.url && formik.errors.url}
        />
      </div>
      <div className="flex flex-col gap-2">
        <h5 className="text-[14px] font-medium text-gray-500">{t("device")}</h5>
        <Select
          name="device"
          defaultText="Select device type"
          options={DeviceOptions}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.device}
          error={formik.touched.device && formik.errors.device}
          labelProperty="label"
          valueProperty="value"
        />
      </div>
      <div className="flex flex-col gap-2">
        <h5 className="text-[14px] font-medium text-gray-500">{t("tagId")}</h5>
        <Select
          name="tagId"
          defaultText="Select tag"
          options={tags}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.tagId}
          error={formik.touched.tagId && formik.errors.tagId}
          labelProperty="name"
          valueProperty="id"
        />
      </div>
    </form>
  );
};

export default GeneralForm;
