import { defineConfig } from "vitest/config";

export default defineConfig({
    test: {
        include: ["test/**/*.ts"],
        globals: true,
        environment: "node",
        coverage: {
            provider: "v8",
            include: ["src/**/*.ts"],
            reporter: ["text", "html", "lcov"]
        }
    }
});