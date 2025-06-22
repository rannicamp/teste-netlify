"use client";

import { useState } from 'react';
import Link from 'next/link';
import { createClient } from '../../utils/supabase/client';

export default function UploadPage() {
  const supabase = createClient();
  
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState('');

  // Função que lida com a seleção do arquivo
  const handleFileChange = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  };

  // Função chamada quando o formulário é enviado
  const handleSubmit = async (event) => {
    event.preventDefault(); // Impede o recarregamento da página

    if (!file) {
      setMessage('Por favor, selecione um arquivo para enviar.');
      return;
    }

    setMessage('Enviando arquivo...');

    // 1. Envia o arquivo para o Supabase Storage
    const { data: fileData, error: fileError } = await supabase.storage
      .from('marca') // Nome do seu bucket
      .upload(`public/${file.name}`, file, {
        cacheControl: '3600',
        upsert: false, // Não substitui o arquivo se já existir
      });

    if (fileError) {
      setMessage(`Erro no upload do arquivo: ${fileError.message}`);
      console.error(fileError);
      return;
    }

    // 2. Se o upload do arquivo deu certo, salva a descrição no banco de dados
    const { error: dbError } = await supabase
      .from('marcas_uploads') // Nome da nossa tabela de rastreamento
      .insert([
        {
          descricao: description,
          caminho_arquivo: fileData.path, // Salva o caminho do arquivo retornado pelo Storage
        },
      ]);
    
    if (dbError) {
        setMessage(`Arquivo enviado, mas erro ao salvar descrição: ${dbError.message}`);
        console.error(dbError);
    } else {
        setMessage('Upload e cadastro realizados com sucesso!');
        setFile(null);
        setDescription('');
        // Limpa o input de arquivo
        document.getElementById('file-input').value = "";
    }
  };

  const inputStyle = { display: 'block', width: '300px', padding: '8px', marginBottom: '10px', border: '1px solid #ccc', borderRadius: '4px' };
  const labelStyle = { display: 'block', marginBottom: '5px', fontWeight: 'bold' };

  return (
    <main style={{ fontFamily: 'sans-serif', padding: '20px' }}>
      <Link href="/" style={{ color: 'blue' }}>&larr; Voltar para a página inicial</Link>
      <h1 style={{ textAlign: 'center' }}>Upload de Arquivo de Marca</h1>
      <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: '0 auto' }}>
        
        <label htmlFor="description" style={labelStyle}>Descrição</label>
        <input id="description" type="text" value={description} onChange={(e) => setDescription(e.target.value)} required style={inputStyle} />
        
        <label htmlFor="file-input" style={labelStyle}>Arquivo</label>
        <input id="file-input" type="file" onChange={handleFileChange} accept="image/*" style={inputStyle} />

        <button type="submit" style={{ ...inputStyle, backgroundColor: '#0070f3', color: 'white', fontWeight: 'bold', cursor: 'pointer' }}>
          Enviar Arquivo
        </button>

        {message && <p style={{ marginTop: '15px', textAlign: 'center', fontWeight: 'bold' }}>{message}</p>}
      </form>
    </main>
  );
}