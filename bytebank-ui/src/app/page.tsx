import { redirect } from "next/navigation";

export default function RootPage() {
  // TODO: Verificar se o usuário está autenticado
  redirect("/login");
}
