import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { api } from "./app/services/api";
import { Action } from "./lib/action";

export async function middleware(request: NextRequest) {
  // Obtém o token dos cookies
  const token = request.cookies.get("token");

  if (token) {
    // Cria uma instância de Action com o token
    const action = new Action(token.value);

    // Verifica a validade do token
    const response = await action.verifyToken();

    if (response) {
      const { role } = response;
      // Se o token for válido e o usuário tentar acessar "/login", redirecione para "/admin"
      if (request.nextUrl.pathname.startsWith("/admin")) {
        if (role.id < 3) {
          if (request.nextUrl.pathname === "/login") {
            return NextResponse.redirect(new URL("/admin", request.url));
          }
          return NextResponse.next();
        } else {
          return NextResponse.redirect(new URL("/", request.url));
        }
      }
      return NextResponse.next();
    }
  }

  // Se o token não estiver presente ou for inválido e o usuário tentar acessar uma rota diferente de "/login", redirecione para "/login"
  if (request.nextUrl.pathname !== "/login") {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Permite a continuação da requisição para "/login"
  return NextResponse.next();
}

// Configuração do matcher para aplicar o middleware em rotas específicas
export const config = {
  matcher: ["/admin/:path*", "/login", "/profile"],
};
