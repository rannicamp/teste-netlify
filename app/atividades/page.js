// Esta página precisa de interatividade, então usamos "use client"
"use client";

import { useState, useEffect, useCallback } from 'react';
import { createClient } from '../../utils/supabase/client';
import AtividadeModal from '../../components/AtividadeModal'; // O modal que vamos criar
import ActivityList from '../../components/ActivityList'; // A lista que vamos criar

export default function AtividadesPage() {
  const supabase = createClient();

  // Estados da página
  const [empreendimentos, setEmpreendimentos] = useState([]);
  const [selectedEmpreendimento, setSelectedEmpreendimento] = useState(null);
  const [activities, setActivities] = useState([]);
  const [funcionarios, setFuncionarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isListCollapsed, setIsListCollapsed] = useState(false);

  // Função para buscar dados
  const fetchData = useCallback(async () => {
    // Busca a lista de todos os empreendimentos para o dropdown
    const { data: empreendimentosData } = await supabase
      .from('empreendimentos')
      .select('id, nome, empresa_proprietaria_id')
      .order('nome');
    setEmpreendimentos(empreendimentosData || []);

    // Busca a lista de todos os funcionários para o dropdown do modal
    const { data: funcionariosData } = await supabase
      .from('funcionarios')
      .select('id, full_name')
      .order('full_name');
    setFuncionarios(funcionariosData || []);

    setLoading(false);
  }, [supabase]);

  // Executa a busca de dados quando a página carrega
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Função para buscar as atividades de um empreendimento específico
  const fetchActivities = useCallback(async (empreendimentoId) => {
    if (!empreendimentoId) {
      setActivities([]);
      return;
    }
    const { data } = await supabase
      .from('activities')
      .select('*')
      .eq('empreendimento_id', empreendimentoId)
      .order('created_at', { ascending: false });
    setActivities(data || []);
  }, [supabase]);
  
  // Lida com a mudança no dropdown de empreendimentos
  const handleEmpreendimentoChange = (e) => {
    const empreendimentoId = e.target.value;
    if (empreendimentoId) {
        const selected = empreendimentos.find(emp => emp.id.toString() === empreendimentoId);
        setSelectedEmpreendimento(selected);
        fetchActivities(empreendimentoId);
    } else {
        setSelectedEmpreendimento(null);
        setActivities([]);
    }
  };

  if (loading) {
    return <p>Carregando dados...</p>;
  }

  return (
    <div className="space-y-6">
      <div className="bg-white p-4 rounded-lg shadow">
        <h1 className="text-3xl font-bold text-gray-900">Painel de Atividades</h1>
        <div className="mt-4 flex items-center gap-4">
          <div className="flex-1">
            <label htmlFor="empreendimento-select" className="block text-sm font-medium text-gray-700">
              Selecione um Empreendimento
            </label>
            <select
              id="empreendimento-select"
              onChange={handleEmpreendimentoChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
            >
              <option value="">-- Escolha um empreendimento --</option>
              {empreendimentos.map((emp) => (
                <option key={emp.id} value={emp.id}>{emp.nome}</option>
              ))}
            </select>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            disabled={!selectedEmpreendimento}
            className="mt-6 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            + Adicionar Atividade
          </button>
        </div>
      </div>

      {selectedEmpreendimento && (
        <div className="bg-white p-4 rounded-lg shadow">
            <button onClick={() => setIsListCollapsed(!isListCollapsed)} className="font-bold text-xl mb-2 w-full text-left">
                Lista de Atividades {isListCollapsed ? '►' : '▼'}
            </button>
            {!isListCollapsed && <ActivityList activities={activities} />}
        </div>
      )}

      {isModalOpen && (
        <AtividadeModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          selectedEmpreendimento={selectedEmpreendimento}
          funcionarios={funcionarios}
          onActivityAdded={() => fetchActivities(selectedEmpreendimento.id)} // Para atualizar a lista após adicionar
        />
      )}
    </div>
  );
}