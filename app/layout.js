import './globals.css';
// Não precisamos mais importar fontes do Google

export const metadata = {
  title: 'Studio 57',
  description: 'Sistema de Gestão de Obras',
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      {/* O Tailwind usará automaticamente a fonte padrão do sistema */}
      <body className="bg-gray-50"> 
        {/* O restante do seu layout que criamos continua aqui dentro */}
        {children}
      </body>
    </html>
  );
}