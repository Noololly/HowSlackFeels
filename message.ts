import { App } from "@slack/bolt";
import cron from "node-cron";
import emotions from "./emotions";
import fs from "fs";

const send = async (app: App) => {
    const text = "hey <!subteam^S0ACGC4NU1J>! how are we feeling today?";
    await app.client.chat.postMessage({
        text,
        channel: "C0ABX4Y49M5",
        username: "How Slack Feels",
        icon_emoji: emotions[Math.floor(Math.random() * emotions.length)].emoji,
        blocks: [
            { type: "section", text: { type: "mrkdwn", text } },
            { type: "actions", elements: emotions.map(x => (
                {
                    type: "button",
                    text: { type: "plain_text", text: `:${x.emoji}: ${x.name}` },
                    action_id: "mood_" + x.name,
                    value: x.name,
                    style: "primary"
                }
            )) }
        ]
    });
    fs.writeFileSync("list.txt", "");
};

export const exec = (app: App) => send(app);
export const reg = (app: App) => {
    cron.schedule("0 0 * * *", () => exec(app));
    cron.schedule("0 6 * * *", () => exec(app));
    cron.schedule("0 12 * * *", () => exec(app));
    cron.schedule("0 18 * * *", () => exec(app));
};