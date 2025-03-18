export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    let path = url.pathname;
    
    // If path is / or empty, serve index.html
    if (path === "/" || path === "") {
      path = "/index.html";
    }
    
    // Try to fetch the requested asset
    try {
      return await env.ASSETS.fetch(new Request(new URL(path, request.url), request));
    } catch (e) {
      // If asset not found, return 404
      return new Response("Not Found", { status: 404 });
    }
  }
};