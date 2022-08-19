export default {
  routePrefix: "/docs",
  swagger: {
    info: {
      title: "Submit Forum REST API",
      description: "API documentation for Submit Forum REST API",
      version: "1.0",
    },
    servers: [
      {
        url: "http://localhost:9000",
      },
    ],
    hideUntagged: false,
  },
  exposeRoute: true,
};
