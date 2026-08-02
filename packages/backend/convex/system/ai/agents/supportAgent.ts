// import { google } from "@ai-sdk/google";
import { groq } from "@ai-sdk/groq";
import { Agent } from "@convex-dev/agent";
import { components } from "../../../_generated/api";
import { SUPPORT_AGENT_PROMPT } from "../constants";

export const supportAgent = new Agent(components.agent, {
  name: "AgentSupport",
  languageModel: groq("qwen/qwen3.6-27b"), // google.chat("gemini-2.0-flash")
  instructions: SUPPORT_AGENT_PROMPT,
});
