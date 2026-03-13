import mongoose from "mongoose";

// ─────────────────────────────────────────
// FRAMEWORKS
// ─────────────────────────────────────────
const frameworkSchema = new mongoose.Schema({
  slug: { type: String, required: true, unique: true },
  category: {
    type: String,
    required: true,
    enum: [
      "copywriting",
      "advertising",
      "storytelling",
      "product-marketing",
      "case-documentation",
      "technical-docs",
      "email",
      "product-launch",
    ],
  },
  name: { type: String, required: true },
  description: { type: String, required: true },
  author: { type: String },
  contentTypes: [
    {
      type: String,
      enum: [
        "newsletter",
        "blog-post",
        "social-media",
        "sales-page",
        "case-study",
        "email",
        "video-script",
        "product-launch",
        "homepage",
        "whitepaper",
      ],
    },
  ],
  books: [
    {
      title: { type: String },
      author: { type: String },
    },
  ],
  claudeSkill: { type: String },
  steps: [
    {
      order: { type: Number },
      title: { type: String },
      description: { type: String },
      placeholder: { type: String },
      defaultPromptId: { type: mongoose.Schema.Types.ObjectId, ref: "Prompt" },
    },
  ],
  languages: {
    en: { name: String, description: String },
    it: { name: String, description: String },
  },
});

// ─────────────────────────────────────────
// PROMPTS
// ─────────────────────────────────────────
const promptSchema = new mongoose.Schema({
  userId: { type: String, default: null }, // null = system default
  frameworkSlug: { type: String, required: true },
  stepOrder: { type: Number, required: true },
  instructionText: { type: String, required: true },
  tone: { type: String },
  audience: { type: String },
  language: { type: String, enum: ["en", "it"], default: "en" },
  referenceFiles: [
    {
      fileName: { type: String },
      fileUrl: { type: String },
      fileType: { type: String },
    },
  ],
  specialInstructions: { type: String },
  isDefault: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

// ─────────────────────────────────────────
// PAGES
// ─────────────────────────────────────────
const pageSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  title: { type: String, required: true },
  category: {
    type: String,
    required: true,
    enum: [
      "copywriting",
      "advertising",
      "storytelling",
      "product-marketing",
      "case-documentation",
      "technical-docs",
      "email",
      "product-launch",
    ],
  },
  frameworkSlug: { type: String, required: true },
  audience: { type: String },
  tone: { type: String },
  language: { type: String, enum: ["en", "it"], default: "en" },
  steps: [
    {
      order: { type: Number },
      userInput: { type: String },
      aiGenerated: { type: String },
      customPromptId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Prompt",
        default: null,
      },
      approved: { type: Boolean, default: false },
    },
  ],
  status: {
    type: String,
    enum: ["draft", "complete"],
    default: "draft",
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// ─────────────────────────────────────────
// ACCESS CODES
// ─────────────────────────────────────────
const accessCodeSchema = new mongoose.Schema({
  licenseKey: { type: String, required: true, unique: true },
  email: { type: String, required: true },
  orderId: { type: String },
  purchasedAt: { type: Date, default: Date.now },
  clerkUserId: { type: String, default: null },
  status: {
    type: String,
    enum: ["purchased", "active"],
    default: "purchased",
  },
});

// ─────────────────────────────────────────
// USER PROFILE
// ─────────────────────────────────────────
const userProfileSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  apiKeys: {
    claude: { type: String, default: null },
    openai: { type: String, default: null },
  },
  preferences: {
    defaultTone: { type: String, default: null },
    defaultLanguage: { type: String, enum: ["en", "it"], default: "en" },
    defaultAudience: { type: String, default: null },
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// ─────────────────────────────────────────
// EXPORTS
// ─────────────────────────────────────────
export const Framework =
  mongoose.models.Framework || mongoose.model("Framework", frameworkSchema);

export const Prompt =
  mongoose.models.Prompt || mongoose.model("Prompt", promptSchema);

export const Page = mongoose.models.Page || mongoose.model("Page", pageSchema);

export const AccessCode =
  mongoose.models.AccessCode || mongoose.model("AccessCode", accessCodeSchema);

export const UserProfile =
  mongoose.models.UserProfile ||
  mongoose.model("UserProfile", userProfileSchema);
