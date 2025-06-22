"use client";

import { useState } from 'react';
import { createClient } from '../../utils/supabase/client';

// O formulário agora recebe a lista de empresas e empreendimentos
export default function FuncionarioForm({ companies, empreendimentos }) {
  const supabase = createClient();
  
  const [formData, setFormData] = useState({
    empresa_id: '',
    empreendimento_atual_id: '',
    full_name: '',
    cpf: '',
    rg: '',
    birth_date: '',
    phone: '',
    email: '',
    address_street: '',
    address_number: '',
    address_complement: '',
    cep: '',
    city: '',
    state: '',
    neighborhood: '',
    contract_role: '',
    admission_date: '',
    base_salary: '',
    payment_method: '',
    pix_key: '',
    bank_details: '',
    observations: ''
  });
  
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Converte para null se o valor for uma string vazia, para campos opcionais
    const finalValue = value === '' ? null : value;
    setFormData(prevState => ({ ...prevState, [name]: finalValue }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage('Enviando...');
    
    if (!formData.empresa_id) {
      setMessage('Erro: Por favor, selecione uma empresa.');
      return;
    }

    const { error } = await supabase.from('funcionarios').insert([formData]);

    if (error) {
      setMessage(`Erro ao cadastrar funcionário: ${error.message}`);
      console.error(error);
    } else {
      setMessage('Funcionário cadastrado com sucesso!');
      // Aqui você pode limpar o formulário se desejar
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-900">Cadastro de Novo Funcionário</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Seção de Vínculos */}
        <div className="border-b border-gray-900/10 pb-6">
          <h2 className="text-xl font-semibold text-gray-800">Vínculos</h2>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
            <div>
              <label htmlFor="empresa_id" className="block text-sm font-medium text-gray-700">Empresa Contratante</label>
              <select name="empresa_id" id="empresa_id" value={formData.empresa_id || ''} onChange={handleChange} required className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none">
                <option value="">Selecione uma empresa...</option>
                {companies?.map((company) => (
                  <option key={company.id} value={company.id}>{company.razao_social}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="empreendimento_atual_id" className="block text-sm font-medium text-gray-700">Empreendimento Atual (Opcional)</label>
              <select name="empreendimento_atual_id" id="empreendimento_atual_id" value={formData.empreendimento_atual_id || ''} onChange={handleChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none">
                <option value="">Nenhum</option>
                {empreendimentos?.map((emp) => (
                  <option key={emp.id} value={emp.id}>{emp.nome}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Seção de Dados Pessoais */}
        <div className="border-b border-gray-900/10 pb-6">
          <h2 className="text-xl font-semibold text-gray-800">Dados Pessoais</h2>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-6">
            <div className="md:col-span-2"><label htmlFor="full_name" className="block text-sm font-medium text-gray-700">Nome Completo</label><input type="text" name="full_name" value={formData.full_name} onChange={handleChange} required className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none" /></div>
            <div><label htmlFor="cpf" className="block text-sm font-medium text-gray-700">CPF</label><input type="text" name="cpf" value={formData.cpf} onChange={handleChange} required className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none" /></div>
            <div><label htmlFor="rg" className="block text-sm font-medium text-gray-700">RG</label><input type="text" name="rg" value={formData.rg} onChange={handleChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none" /></div>
            <div><label htmlFor="birth_date" className="block text-sm font-medium text-gray-700">Data de Nascimento</label><input type="date" name="birth_date" value={formData.birth_date} onChange={handleChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none" /></div>
            <div><label htmlFor="phone" className="block text-sm font-medium text-gray-700">Telefone</label><input type="text" name="phone" value={formData.phone} onChange={handleChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none" /></div>
            <div className="md:col-span-3"><label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label><input type="email" name="email" value={formData.email} onChange={handleChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none" /></div>
          </div>
        </div>

        {/* Adicione outras seções para Endereço, Dados Contratuais, etc. se desejar, seguindo o mesmo padrão */}

        {/* Botões de Ação */}
        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            Salvar Funcionário
          </button>
        </div>
        
        {message && <p className="text-center font-medium mt-4">{message}</p>}
      </form>
    </div>
  );
}