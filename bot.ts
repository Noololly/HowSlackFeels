import "dotenv/config";
process.env.TZ = "America/New_York"; // because americans matter the most apparently

import { App } from "@slack/bolt";

const app = new App({
    token: process.env.SLACK_BOT_TOKEN,
    appToken: process.env.SLACK_APP_TOKEN!,
    socketMode: true
});

(async () => await app.start(5050))();

import * as msg from "./message";
import * as cb from "./cb";
msg.reg(app);
msg.exec(app);
cb.reg(app);