#!/usr/bin/env bun

import { Command } from "commander";
import { runWakeup } from "./tui/wakeup.ts";

const program = new Command();

program.name("unitcode").description("UnitCode is a lightweight, terminal-based code editor and collaboration tool that lets developers create, edit, and share code directly from the CLI.").version("0.0.1");

program.command("wakeup").description("This command shows the banner and give option to pick CLI or Telegram mode.").action(
    async() => {
        await runWakeup()
    }
);

    await program.parseAsync(process.argv);