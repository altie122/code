import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ params, request }) => {
  const { id } = params;
  const utResponse = await fetch(`https://kk0uioswvo.ufs.sh/f/${id}`);
  return new Response(utResponse.body, {
    status: utResponse.status,
    headers: utResponse.headers,
  });
}