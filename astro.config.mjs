import starlight from "@astrojs/starlight";
import { defineConfig } from "astro/config";

export default defineConfig({
  site: "http://localhost:4321",
  integrations: [
    starlight({
      title: "M2O Documentation Preview",
      description: "Local preview of the public, maintainer-authored M2O documentation.",
      customCss: ["./src/styles/custom.css"],
      social: [{ icon: "github", label: "M2O documentation on GitHub", href: "https://github.com/mafia2online/docs" }],
      sidebar: [
        { label: "Shared guides", items: [{ autogenerate: { directory: "guides/maintainer" } }] },
        { label: "Server guides", items: [{ autogenerate: { directory: "guides/server/maintainer" } }] },
      ],
    }),
  ],
});
