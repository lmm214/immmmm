import { defineConfig } from "tinacms";

// Your hosting provider likely exposes this as an environment variable
const branch = process.env.HEAD || process.env.VERCEL_GIT_COMMIT_REF || "main";

export default defineConfig({
  branch,
  clientId: "", // Get this from tina.io
  token: "", // Get this from tina.io

  build: {
    outputFolder: "tina",
    publicFolder: "static",
  },
  media: {
    tina: {
      mediaRoot: "",
      publicFolder: "static",
    },
  },
  schema: {
    collections: [
      {
        name: "chat",
        label: "词穷",
        path: "content/posts/chat",
        defaultItem: () => {
          return {
            title: new Date().toISOString(),
            date: new Date().toISOString(),
            tags: '[词穷]'
          }
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "date",
            label: "Date"
          },
          {
            label: "Tags",
            name: "tags",
            type: "string",
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
          },
        ],
      },
      {
        name: "daily",
        label: "日常",
        path: "content/posts/daily",
        defaultItem: () => {
          return {
            title: new Date().toISOString(),
            date: new Date().toISOString(),
            tags: '[日常]'
          }
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "date",
            label: "Date"
          },
          {
            label: "Tags",
            name: "tags",
            type: "string",
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
          },
        ],
      },
      {
        name: "coding",
        label: "折腾",
        path: "content/posts/coding",
        defaultItem: () => {
          return {
            title: new Date().toISOString(),
            date: new Date().toISOString(),
            tags: '[折腾]'
          }
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "date",
            label: "Date"
          },
          {
            label: "Tags",
            name: "tags",
            type: "string",
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
          },
        ],
      },
      {
        name: "reading",
        label: "育人",
        path: "content/posts/reading",
        defaultItem: () => {
          return {
            title: new Date().toISOString(),
            date: new Date().toISOString(),
            tags: '[育人]'
          }
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "date",
            label: "Date"
          },
          {
            label: "Tags",
            name: "tags",
            type: "string",
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
          },
        ],
      },
    ],
  },
});