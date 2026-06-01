import { isCancel, text }from "@clack/prompts"
import chalk from "chalk";

export async function runAgentMode() {

    console.log(chalk.bold('\nAgent Mode\n'));

    const goal = await text({
        message : "What are we doing today?",
        placeholder : "Concentrete task for this codebase."
    })

    if (isCancel(goal) || !goal.trim()) return;

    const config = deafaulAgentConfig()
}