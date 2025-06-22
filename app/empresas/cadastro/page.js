"use client";

import { useState } from 'react';
import Link from 'next/link';
import { createClient } from '../../../utils/supabase/client';

export default function CadastroEmpresaPage() {
  const supabase = createClient();
  
  // Usamos um único estado para guardar todos os dados do formulário
  const [formData, setFormData] = useState({
    cnpj: '',
    razao_social: '',
    nome_fantasia: '',
    inscricao_estadual: '',
    inscricao_municipal: '',
    address_street: '',
    address_number: '',
    address_complement: '',
    cep: '',
    city: '',
    state: '',
    neighborhood: '',
    telefone: '',
    email: '',
    responsavel_legal: ''
  });
  
  const [message, setMessage] = useState('');

  // Função única para lidar com a mudança em qualquer campo do formulário
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // Função para enviar os dados para o Supabase
  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage('Enviando...');
    
    // Insere o objeto 'formData' diretamente no banco de dados
    const { error } = await supabase.from('cadastro_empresa').insert([formData]);

    if (error) {
      setMessage(`Erro ao cadastrar empresa: ${error.message}`);
      console.error(error);
    } else {
      setMessage('Empresa cadastrada com sucesso!');
      // Limpa o formulário após o sucesso
      setFormData({
        cnpj: '', razao_social: '', nome_fantasia: '', inscricao_estadual: '',
        inscricao_municipal: '', address_street: '', address_number: '', address_complement: '',
        cep: '', city: '', state: '', neighborhood: '', telefone: '', email: '', responsavel_legal: ''
      });
    }
  };

  return (
    // Container principal da página com o estilo de card
    <div className="bg-white rounded-lg shadow p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-900">Cadastro de Nova Empresa</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Seção de Dados Principais */}
        <div className="border-b border-gray-900/10 pb-6">
          <h2 className="text-xl font-semibold text-gray-800">Dados Principais</h2>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-6">
            <div className="md:col-span-1">
              <label htmlFor="cnpj" className="block text-sm font-medium text-gray-700">CNPJ</label>
              <input type="text" name="cnpj" value={formData.cnpj} onChange={handleChange} required className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none" />
            </div>
            <div className="md:col-span-2">
              <label htmlFor="razao_social" className="block text-sm font-medium text-gray-700">Razão Social</label>
              <input type="text" name="razao_social" value={formData.razao_social} onChange={handleChange} required className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none" />
            </div>
            <div className="md:col-span-1">
              <label htmlFor="nome_fantasia" className="block text-sm font-medium text-gray-700">Nome Fantasia</label>
              <input type="text" name="nome_fantasia" value={formData.nome_fantasia} onChange={handleChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none" />
            </div>
            <div className="md:col-span-1">
              <label htmlFor="inscricao_estadual" className="block text-sm font-medium text-gray-700">Inscrição Estadual</label>
              <input type="text" name="inscricao_estadual" value={formData.inscricao_estadual} onChange={handleChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none" />
            </div>
            <div className="md:col-span-1">
              <label htmlFor="inscricao_municipal" className="block text-sm font-medium text-gray-700">Inscrição Municipal</label>
              <input type="text" name="inscricao_municipal" value={formData.inscricao_municipal} onChange={handleChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none" />
            </div>
          </div>
        </div>

        {/* Seção de Endereço */}
        <div className="border-b border-gray-900/10 pb-6">
          <h2 className="text-xl font-semibold text-gray-800">Endereço</h2>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-6 gap-x-6 gap-y-6">
            <div className="md:col-span-2">
              <label htmlFor="cep" className="block text-sm font-medium text-gray-700">CEP</label>
              <input type="text" name="cep" value={formData.cep} onChange={handleChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none" />
            </div>
            <div className="md:col-span-4">
              <label htmlFor="address_street" className="block text-sm font-medium text-gray-700">Logradouro</label>
              <input type="text" name="address_street" value={formData.address_street} onChange={handleChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none" />
            </div>
            <div className="md:col-span-1">
              <label htmlFor="address_number" className="block text-sm font-medium text-gray-700">Número</label>
              <input type="text" name="address_number" value={formData.address_number} onChange={handleChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none" />
            </div>
            <div className="md:col-span-2">
              <label htmlFor="address_complement" className="block text-sm font-medium text-gray-700">Complemento</label>
              <input type="text" name="address_complement" value={formData.address_complement} onChange={handleChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none" />
            </div>
            <div className="md:col-span-3">
              <label htmlFor="neighborhood" className="block text-sm font-medium text-gray-700">Bairro</label>
              <input type="text" name="neighborhood" value={formData.neighborhood} onChange={handleChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none" />
            </div>
            <div className="md:col-span-4">
              <label htmlFor="city" className="block text-sm font-medium text-gray-700">Cidade</label>
              <input type="text" name="city" value={formData.city} onChange={handleChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none" />
            </div>
            <div className="md:col-span-2">
              <label htmlFor="state" className="block text-sm font-medium text-gray-700">Estado (UF)</label>
              <input type="text" name="state" value={formData.state} onChange={handleChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none" />
            </div>
          </div>
        </div>

        {/* Seção de Contato */}
        <div className="pb-6">
          <h2 className="text-xl font-semibold text-gray-800">Contato e Responsável</h2>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-6">
            <div className="md:col-span-1">
              <label htmlFor="telefone" className="block text-sm font-medium text-gray-700">Telefone</label>
              <input type="text" name="telefone" value={formData.telefone} onChange={handleChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none" />
            </div>
            <div className="md:col-span-1">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none" />
            </div>
            <div className="md:col-span-1">
              <label htmlFor="responsavel_legal" className="block text-sm font-medium text-gray-700">Responsável Legal</label>
              <input type="text" name="responsavel_legal" value={formData.responsavel_legal} onChange={handleChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none" />
            </div>
          </div>
        </div>

        {/* Botões de Ação */}
        <div className="mt-6 flex items-center justify-end gap-x-6">
          <Link href="/" className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300 text-sm font-semibold">
            Cancelar
          </Link>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            Salvar Empresa
          </button>
        </div>
        
        {message && <p className="text-center font-medium mt-4">{message}</p>}
      </form>
    </div>
  );
}