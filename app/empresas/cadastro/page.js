"use client";

import { useState } from 'react';
import Link from 'next/link';
import { createClient } from '../../../utils/supabase/client'; 

export default function CadastroEmpresaPage() {
  const supabase = createClient();
  const [cnpj, setCnpj] = useState('');
  const [razaoSocial, setRazaoSocial] = useState('');
  const [nomeFantasia, setNomeFantasia] = useState('');
  const [telefone, setTelefone] = useState('');
  const [email, setEmail] = useState('');
  const [mensagem, setMensagem] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMensagem('Enviando...');
    const { error } = await supabase
      .from('cadastro_empresa')
      .insert([{ cnpj, razao_social: razaoSocial, nome_fantasia: nomeFantasia, telefone, email }]);

    if (error) {
      setMensagem(`Erro: ${error.message}`);
    } else {
      setMensagem('Empresa cadastrada com sucesso!');
      setCnpj('');
      setRazaoSocial('');
      setNomeFantasia('');
      setTelefone('');
      setEmail('');
    }
  };

  const inputStyle = { display: 'block', width: '300px', padding: '8px', marginBottom: '10px', border: '1px solid #ccc', borderRadius: '4px' };
  const labelStyle = { display: 'block', marginBottom: '5px', fontWeight: 'bold' };

  return (
    <main style={{ fontFamily: 'sans-serif', padding: '20px' }}>
      <Link href="/" style={{ color: 'blue' }}>&larr; Voltar para a página inicial</Link>
      <h1 style={{ textAlign: 'center' }}>Cadastro de Nova Empresa</h1>
      <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: '0 auto' }}>
        <label htmlFor="cnpj" style={labelStyle}>CNPJ</label>
        <input id="cnpj" type="text" value={cnpj} onChange={(e) => setCnpj(e.target.value)} required style={inputStyle} />
        <label htmlFor="razao_social" style={labelStyle}>Razão Social</label>
        <input id="razao_social" type="text" value={razaoSocial} onChange={(e) => setRazaoSocial(e.target.value)} required style={inputStyle} />
        <label htmlFor="nome_fantasia" style={labelStyle}>Nome Fantasia</label>
        <input id="nome_fantasia" type="text" value={nomeFantasia} onChange={(e) => setNomeFantasia(e.target.value)} style={inputStyle} />
        <label htmlFor="telefone" style={labelStyle}>Telefone</label>
        <input id="telefone" type="text" value={telefone} onChange={(e) => setTelefone(e.target.value)} style={inputStyle} />
        <label htmlFor="email" style={labelStyle}>Email</label>
        <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} style={inputStyle} />
        <button type="submit" style={{ ...inputStyle, backgroundColor: '#0070f3', color: 'white', fontWeight: 'bold', cursor: 'pointer' }}>Cadastrar Empresa</button>
        {mensagem && <p style={{ marginTop: '15px', textAlign: 'center', fontWeight: 'bold' }}>{mensagem}</p>}
      </form>
    </main>
  );
}