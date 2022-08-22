import server from "@/server";

server.listen({ port: 9000 }, function (err, address) {
  if (err) {
    server.log.error(err);
    process.exit(1);
  }
});
