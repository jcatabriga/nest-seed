export const appConfig = {
  PORT: Number(process.env.PORT) || 3000,
  TIMEOUT: Number(process.env.TIMEOUT) || 8000,
  SWAGGER: {
    title: 'Shoulders',
    description: `**The Shoulders API** <br>
    Here you can access and run all application endpoints. <br>
    If you are a developer, look at the default to always keep it.
    `,
    version: '1.0',
  },
  RATE_LIMITERS: {
    ttl: Number(process.env.RATE_LIMITERS_TTL) || 60,
    limit: Number(process.env.RATE_LIMITERS_LIMIT) || 100,
  },
};
