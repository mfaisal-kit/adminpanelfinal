import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";

import { schemaTypes } from "./schema";

export default defineConfig({
    name:"default",
    title:"studio",
    projectId: <string> process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: <string> process.env.NEXT_PUBLIC_SANITY_DATASET,
    plugins:[structureTool(), visionTool()],
    basePath:"/studio",
    schema:{
        types:schemaTypes
    }
});