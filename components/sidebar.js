"use client";

import Link from 'next/link';
// Não precisamos mais importar ícones

const Sidebar = () => {
  const navItems = [
    { href: '/', label: 'Dashboard' },
    { href: '/empresas', label: 'Empresas' },
    { href: '/empreendimentos', label: 'Empreendimentos' },
    { href: '/funcionarios', label: 'Funcionários' },
    { href: '/atividades', label: 'Atividades' },
  ];

  return (
    <aside className="bg-white shadow-lg w-[260px] h-full fixed left-0 top-0 z-20">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-gray-900">Studio 57</h1>
      </div>
      <nav>
        <ul>
          {navItems.map((item) => (
            <li key={item.href}>
              {/* O ícone foi removido, deixamos um padding para alinhar */}
              <Link href={item.href} className="flex items-center p-4 pl-6 text-gray-700 hover:bg-gray-100">
                <span className="text-base font-medium">{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;