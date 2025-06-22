import './globals.css';
import Sidebar from '../components/sidebar';
import Header from '../components/Header';

export const metadata = {
  title: 'Studio 57',
  description: 'Sistema de Gestão de Obras',
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body className="bg-gray-50">
        <div className="flex">
          {/* Renderiza o menu lateral que já existe */}
          <Sidebar />
          
          <div className="flex-1">
            {/* Renderiza o cabeçalho que acabamos de criar */}
            <Header />
            
            {/* Área de conteúdo principal com margens para não sobrepor o menu e o cabeçalho, e com padding */}
            <main className="ml-[260px] mt-[65px] p-6">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}