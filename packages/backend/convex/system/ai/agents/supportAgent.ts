import { Agent } from "@convex-dev/agent";
import { components } from "../../../_generated/api";
import { SUPPORT_AGENT_PROMPT } from "../constants";
import { groq } from "@ai-sdk/groq";
import { GENERATION_MODEL } from "../../../constants/models";

export const supportAgent = new Agent(components.agent, {
  name: "AgentSupport",
  languageModel: groq(GENERATION_MODEL),
  instructions: SUPPORT_AGENT_PROMPT,
});
