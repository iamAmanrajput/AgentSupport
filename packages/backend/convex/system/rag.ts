import { RAG } from "@convex-dev/rag";
import { components } from "../_generated/api";
import { GEMINI_EMBEDDING_MODEL } from "../constants/models";
import { google } from "@ai-sdk/google";

const rag = new RAG(components.rag, {
  textEmbeddingModel: google.embedding(GEMINI_EMBEDDING_MODEL),
  embeddingDimension: 3072,
});

export default rag;
