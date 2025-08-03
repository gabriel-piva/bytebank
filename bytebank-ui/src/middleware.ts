import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Log para debug - remover em produção
  if (process.env.NODE_ENV === "development") {
    console.log(`🔄 Middleware: ${pathname}`);
  }

  // Verificar se é uma requisição para a zona Angular
  if (pathname.startsWith("/transfers")) {
    const transfersDomain =
      process.env.TRANSFERS_DOMAIN || "http://localhost:4201";

    // Permitir requisições CORS da zona Angular
    const response = NextResponse.next();
    response.headers.set("Access-Control-Allow-Origin", transfersDomain);
    response.headers.set(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, OPTIONS"
    );
    response.headers.set(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization"
    );

    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
