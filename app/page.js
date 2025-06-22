import Link from 'next/link';

export default function HomePage() {
  const horaAtual = new Date().toLocaleTimeString('pt-BR');

  return (
    <main style={{ fontFamily: 'sans-serif', textAlign: 'center', marginTop: '50px' }}>
      <h1>Minha Página Inicial</h1>
      <p>Este é um teste de deploy na Netlify.</p>
      <p>Hora atual: {horaAtual}</p>
      <Link href="/sobre" style={{ color: 'blue' }}>
        Ir para a página Sobre
      </Link>
    </main>
  );
}