import { google } from "@ai-sdk/google";
import { Agent } from "@convex-dev/agent";
import { components } from "../../../_generated/api";
import { SUPPORT_AGENT_PROMPT } from "../constants";
import { GEMINI_GENERATION_MODEL } from "../../../constants/models";

export const supportAgent = new Agent(components.agent, {
  name: "AgentSupport",
  languageModel: google.chat(GEMINI_GENERATION_MODEL),
  instructions: SUPPORT_AGENT_PROMPT,
});
