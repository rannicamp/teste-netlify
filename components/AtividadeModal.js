"use client";

import { useState, useEffect } from 'react';
import { createClient } from '../utils/supabase/client';

export default function AtividadeModal({ isOpen, onClose, selectedEmpreendimento, funcionarios, onActivityAdded }) {
  const supabase = createClient();
  const [formData, setFormData] = useState({
    nome: '', tipo_atividade: '', etapa: '', descricao: '',
    data_inicio_prevista: '', data_fim_prevista: '', status: 'Não iniciado',
    funcionario_id: null,
  });
  const [message, setMessage] = useState('');

  // Reseta o formulário quando o modal é aberto
  useEffect(() => {
    if (isOpen) {
      setMessage('');
      setFormData({
        nome: '', tipo_atividade: '', etapa: '', descricao: '',
        data_inicio_prevista: '', data_fim_prevista: '', status: 'Não iniciado',
        funcionario_id: null,
      });
    }
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value === '' ? null : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('Salvando...');

    const dadosParaSalvar = {
      ...formData,
      empreendimento_id: selectedEmpreendimento.id,
      empresa_id: selectedEmpreendimento.empresa_proprietaria_id,
      criado_por_usuario_id: 1, // Placeholder - PRECISAMOS AJUSTAR NO FUTURO
    };

    const { error } = await supabase.from('activities').insert([dadosParaSalvar]);

    if (error) {
      setMessage(`Erro: ${error.message}`);
    } else {
      setMessage('Atividade salva com sucesso!');
      onActivityAdded(); // Chama a função para atualizar a lista na página principal
      setTimeout(() => {
          onClose(); // Fecha o modal após 1.5 segundos
      }, 1500);
    }
  };

  if (!isOpen) return null;

  return (
    // Fundo escuro do modal
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      {/* Janela do modal */}
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-2xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Adicionar Nova Atividade</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800">&times;</button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* O formulário de verdade vai aqui, seguindo o padrão que já conhecemos */}
          <div>
            <label htmlFor="nome" className="block text-sm font-medium text-gray-700">Nome da Atividade</label>
            <input type="text" name="nome" id="nome" value={formData.nome} onChange={handleChange} required className="mt-1 block w-full p-2 border border-gray-300 rounded-md"/>
          </div>
          <div>
            <label htmlFor="descricao" className="block text-sm font-medium text-gray-700">Descrição</label>
            <textarea name="descricao" id="descricao" value={formData.descricao} onChange={handleChange} rows="3" className="mt-1 block w-full p-2 border border-gray-300 rounded-md"></textarea>
          </div>
          <div>
            <label htmlFor="funcionario_id" className="block text-sm font-medium text-gray-700">Funcionário Responsável (Opcional)</label>
            <select name="funcionario_id" id="funcionario_id" value={formData.funcionario_id || ''} onChange={handleChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md">
              <option value="">Nenhum</option>
              {funcionarios?.map(f => <option key={f.id} value={f.id}>{f.full_name}</option>)}
            </select>
          </div>
          {/* ... outros campos podem ser adicionados aqui ... */}
          <div className="flex justify-end gap-4 mt-6">
            <button type="button" onClick={onClose} className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300">Cancelar</button>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Salvar</button>
          </div>
          {message && <p className="text-center mt-4">{message}</p>}
        </form>
      </div>
    </div>
  );
}