import { App } from "@slack/bolt";
import emotions from "./emotions";
import fs from "fs";

export const reg = (app: App) => {
    for(const emotion of emotions) {
        // @ts-ignore
        app.action("mood_" + emotion.name, async ({ ack, client, body }) => {
            await ack();
            
            const list = fs.readFileSync("list.txt", "utf-8");
            if(list.includes(body.user.id + "\n"))
                return await client.chat.postEphemeral({
                    text: "you've recorded your emotion already!",
                    user: body.user.id,
                    channel: body.channel?.id!
                });

            await client.chat.postMessage({
                text: `<@${body.user.id}> is feeling ${emotion.name}!`,
                channel: body.channel?.id!,
                username: `How Slack Feels`,
                icon_emoji: emotion.emoji,
            });
            fs.appendFileSync("list.txt", body.user.id + "\n");
        });
    }
};