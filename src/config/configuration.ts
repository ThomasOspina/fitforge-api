export default () => ({
  app: {
    port: process.env.PORT ? parseInt(process.env.PORT, 10) : 3000,
  },
  database: {
    url: process.env.DATABASE_URL,
  },
});
