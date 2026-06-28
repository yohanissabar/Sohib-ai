export default {
  async fetch(request) {
    const url = new URL(request.url);

    if (url.pathname === "/api/ping") {
      return Response.json({
        app: "SOHIB-AI",
        version: "1.0.0",
        status: "online"
      });
    }

    return new Response("SOHIB-AI Cloudflare Worker");
  }
}
