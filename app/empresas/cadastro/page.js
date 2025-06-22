import Link from 'next/link';
// Importando do novo local
import { createClient } from '../utils/supabase/server'; 
import LogoutButton from '../components/LogoutButton'; // Vamos criar este

export default async function HomePage() {
  const supabase = createClient();
  const { data: lembretes } = await supabase.from('lembretes').select('*');
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <main style={{ fontFamily: 'sans-serif', textAlign: 'center', marginTop: '50px' }}>
      <div style={{ position: 'absolute', top: '10px', right: '10px' }}>
        {user.email} <LogoutButton />
      </div>
      <h1>Minisistema com Supabase</h1>
      {/* ... resto do seu código ... */}
      <div style={{ border: '1px solid #ccc', padding: '10px', display: 'inline-block', minWidth: '200px', marginBottom: '20px' }}>
        <h2>Lembretes:</h2>
        {lembretes && lembretes.length > 0 ? (
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {lembretes.map((lembrete) => (<li key={lembrete.id}>{lembrete.titulo}</li>))}
          </ul>
        ) : (<p>Nenhum lembrete encontrado.</p>)}
      </div>
      <div>
        <Link href="/empresas/cadastro" style={{ color: 'white', backgroundColor: '#28a745', padding: '10px 20px', borderRadius: '5px', textDecoration: 'none' }}>
          Cadastrar Nova Empresa
        </Link>
      </div>
    </main>
  );
}