/// <reference types="vite/client" />
import { initToolbar } from "@stagewise/toolbar";

// 2. Define your toolbar configuration
const stagewiseConfig = {
    plugins: [
        {
            name: "example-plugin",
            description: "Adds additional context for your components",
            shortInfoForPrompt: () => {
                return "Context information about the selected element";
            },
            mcp: null,
            actions: [
                {
                    name: "Example Action",
                    description: "Demonstrates a custom action",
                    execute: () => {
                        window.alert("This is a custom action!");
                    },
                },
            ],
        },
    ],
};

if (import.meta.env.DEV) {
    initToolbar(stagewiseConfig);
}
