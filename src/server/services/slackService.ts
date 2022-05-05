import { WebClient } from "@slack/web-api";
import { MetricNames } from "../types";

const { SLACK_TOKEN, DOMAIN } = process.env;

export const findChannel = async (channel: string) => {
  const web = new WebClient(SLACK_TOKEN);

  const channelList = await web.conversations.list();
  const channelId = channelList.channels.find((c) => c.name === channel).id;

  return channelId;
};

export const joinChannel = async (channel: string) => {
  const channelId = await findChannel(channel);
  const web = new WebClient(SLACK_TOKEN);

  const result = await web.conversations.join({
    token: SLACK_TOKEN,
    channel: channelId,
  });

  if (result.warning !== "already_in_channel") {
    postMessage(channel, "Perfanalytics is ready.");
  }
};

export const postMessage = async (channel: string, message: any) => {
  const channelId = await findChannel(channel);
  const web = new WebClient(SLACK_TOKEN);

  await web.chat.postMessage({
    channel: channelId,
    blocks: message,
    text: "Perfanalytics Report",
    unfurl_links: false,
    unfurl_media: false,
  });
};

export const checkMetrics = async (entry: any, metrics: any, entryKey: string) => {
  let shouldPostMessage = false;
  // let slackMessage2 = `${entry.url} Metrics below threshold --> `;

  Object.entries(metrics).forEach(([key, value]) => {
    if (value < entry[`slack_${key}`]) {
      shouldPostMessage = true;
      // slackMessage2 += ` ${key}: ${(value as number).toFixed(0)}`;
    }
  });

  const slackMessage = buildAlertBlocks(entry, metrics, entryKey);

  if (shouldPostMessage) {
    postMessage(entry.slackChannel, slackMessage);
  }
};

export const titleCase = (string) => string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();

export const getNumber = (number) => {
  if (number > 0) {
    return `+${number}`;
  }
  return number.toString();
};

export const buildAlertBlocks = (entry, metrics, entryKey) => {
  const { url, device } = entry;
  const slackAlertFields = [];

  Object.entries(metrics).forEach(([key, value]) => {
    const threshold = entry[`slack_${key}`];
    const status = value >= entry[`slack_${key}`];

    slackAlertFields.push({
      type: "mrkdwn",
      text: `*${status ? ":large_green_circle:" : ":red_circle:"} ${MetricNames[key]}: ${(value as number).toFixed(
        0
      )} / ${threshold}*`,
    });
  });

  const messageBase = [
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: `:alert: :alert: *Alert:* <${url}> ${device === 1 ? ":computer:" : ":iphone:"} :alert-blue: :alert-blue:`,
      },
    },
    {
      type: "divider",
    },
    {
      type: "section",
      fields: slackAlertFields,
    },
    {
      type: "actions",
      elements: [
        {
          type: "button",
          text: {
            type: "plain_text",
            text: "Go to Report",
          },
          url: `${DOMAIN}/report/${entryKey}`,
          style: "primary",
        },
      ],
    },
  ];

  return messageBase;
};

export const buildReportBlocks = (scheduleTime, entry, scores: { name; score; percentDiff }[]) => {
  const { url, device } = entry.Perfanalytics;
  const { id } = entry;

  const slackMetricFields = scores.map((score) => ({
    type: "mrkdwn",
    text: `*${score.percentDiff < 0 ? ":red_circle:" : ":large_green_circle:"} ${score.name}: ${score.score.toFixed(
      1
    )} ${typeof score.percentDiff === "number" ? `/ ${getNumber(score.percentDiff.toFixed(1))}% ` : ""}*`,
  }));

  const messageBase = [
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: `*${titleCase(scheduleTime)} Report:* <${url}> ${device === 1 ? ":computer:" : ":iphone:"}`,
      },
    },
    {
      type: "divider",
    },
    {
      type: "section",
      fields: slackMetricFields,
    },
    {
      type: "actions",
      elements: [
        {
          type: "button",
          text: {
            type: "plain_text",
            text: "Go to Report",
          },
          url: `${DOMAIN}/report/${id}`,
          style: "primary",
        },
      ],
    },
  ];

  return messageBase;
};
