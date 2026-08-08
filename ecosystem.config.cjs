module.exports = {
  apps: [
    {
      name: "cleenzo-website",
      cwd: __dirname,
      script: "scripts/serve-production.cjs",
      instances: 1,
      exec_mode: "fork",
      env: {
        NODE_ENV: "production",
        PORT: "3003",
        WEBSITE_PORT: "3003",
      },
    },
  ],
};
