import LogoutButton from './LogoutButton';
import { createClient } from '../utils/supabase/server';

const Header = async () => {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    // Componente fixo no topo, com 65px de altura, fundo branco e sombra
    <header className="bg-white shadow-md h-[65px] fixed top-0 w-full z-10 flex items-center justify-end px-6">
      <div>
        {user ? (
          <div className="flex items-center">
            {/* Rótulo de formulário e texto de botão com text-sm e text-base respectivamente */}
            <span className="text-sm font-medium text-gray-700">{user.email}</span>
            <LogoutButton />
          </div>
        ) : null}
      </div>
    </header>
  );
};

export default Header;