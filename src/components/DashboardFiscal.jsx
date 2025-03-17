import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// Função para gerar um número aleatório dentro de uma faixa
const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

// Função para gerar dados de arrecadação aleatórios realistas
const generateArrecadacaoData = () => [
  { tributo: 'ISS', meta: 258196651, realizado: getRandomNumber(180000000, 260000000), percentual: 0 },
  { tributo: 'IPTU', meta: 40976191, realizado: getRandomNumber(30000000, 42000000), percentual: 0 },
  { tributo: 'ITBI', meta: 24882600, realizado: getRandomNumber(17000000, 25000000), percentual: 0 },
  { tributo: 'TRSD', meta: 35760432, realizado: getRandomNumber(20000000, 36000000), percentual: 0 },
  { tributo: 'ITR', meta: 3395740, realizado: getRandomNumber(1900000, 3400000), percentual: 0 },
].map(item => ({
  ...item,
  percentual: Math.round((item.realizado / item.meta) * 100 * 10) / 10
}));

// Função para gerar dados de ações fiscais aleatórios realistas
const generateAcoesFiscaisData = () => [
  { status: 'Concluídas', quantidade: getRandomNumber(25, 40) },
  { status: 'Em andamento', quantidade: getRandomNumber(50, 70) },
  { status: 'Atrasadas', quantidade: getRandomNumber(10, 25) },
  { status: 'Não iniciadas', quantidade: getRandomNumber(20, 30) },
];

// Função para gerar dados de tributos prioritários aleatórios realistas
const generateTributosPrioritarios = () => [
  { 
    tributo: 'IPTU Usinas Rio Madeira', 
    potencial: 'R$ 40 milhões/ano', 
    status: 'Em análise',
    progresso: getRandomNumber(20, 40) 
  },
  { 
    tributo: 'Taxa Fiscalização (4.516 contrib.)', 
    potencial: 'R$ 0,5 milhão/ano', 
    status: 'Em execução',
    progresso: getRandomNumber(40, 60) 
  },
  { 
    tributo: 'ITBI (Observatório Imobiliário)', 
    potencial: 'R$ 5 milhões/ano', 
    status: 'Em desenvolvimento',
    progresso: getRandomNumber(10, 30) 
  },
];

const DashboardFiscal = () => {
  // Estados para os dados dinâmicos
  const [arrecadacaoData, setArrecadacaoData] = useState(generateArrecadacaoData());
  const [acoesFiscaisData, setAcoesFiscaisData] = useState(generateAcoesFiscaisData());
  const [tributosPrioritarios, setTributosPrioritarios] = useState(generateTributosPrioritarios());

  // Simulação de atualização de dados a cada 5 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setArrecadacaoData(generateArrecadacaoData());
      setAcoesFiscaisData(generateAcoesFiscaisData());
      setTributosPrioritarios(generateTributosPrioritarios());
    }, 5000); // 5000 ms = 5 segundos

    // Limpeza do intervalo ao desmontar o componente
    return () => clearInterval(interval);
  }, []);

  // Formatar valores em reais
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  // Determinar a cor baseada no percentual
  const getColorByPercentage = (percentage) => {
    if (percentage < 65) return 'bg-red-500';
    if (percentage < 80) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Cabeçalho */}
      <header className="bg-blue-800 text-white p-4">
        <div className="container mx-auto">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold">Sistema de Gestão Fiscal - Porto Velho</h1>
              <p className="text-sm">Departamento de Fiscalização (DEF) - 2025</p>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm">Última atualização: {new Date().toLocaleString('pt-BR')}</span>
              <button className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-sm">
                Atualizar dados
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Conteúdo principal */}
      <main className="container mx-auto p-4 flex-grow">
        {/* Cards com resumo */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <motion.div
            className="bg-white p-4 rounded shadow"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-gray-500 text-sm">Arrecadação Total</h3>
            <p className="text-2xl font-bold">
              {formatCurrency(arrecadacaoData.reduce((sum, item) => sum + item.realizado, 0))}
            </p>
            <div className="flex items-center mt-2">
              <span className="text-sm text-gray-500">
                Meta: {formatCurrency(arrecadacaoData.reduce((sum, item) => sum + item.meta, 0))}
              </span>
              <span className="ml-2 text-sm text-yellow-600">
                {Math.round((arrecadacaoData.reduce((sum, item) => sum + item.realizado, 0) / arrecadacaoData.reduce((sum, item) => sum + item.meta, 0)) * 100)}%
              </span>
            </div>
          </motion.div>

          <motion.div
            className="bg-white p-4 rounded shadow"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="text-gray-500 text-sm">Ações Fiscais</h3>
            <p className="text-2xl font-bold">
              {acoesFiscaisData.reduce((sum, item) => sum + item.quantidade, 0)}
            </p>
            <div className="flex items-center mt-2">
              <span className="text-sm text-green-600">
                {acoesFiscaisData[0].quantidade} concluídas
              </span>
              <span className="ml-2 text-sm text-red-600">
                {acoesFiscaisData[2].quantidade} atrasadas
              </span>
            </div>
          </motion.div>

          <motion.div
            className="bg-white p-4 rounded shadow"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-gray-500 text-sm">Processos de Impugnação</h3>
            <p className="text-2xl font-bold">217</p>
            <div className="flex items-center mt-2">
              <span className="text-sm text-green-600">154 resolvidos</span>
              <span className="ml-2 text-sm text-yellow-600">63 pendentes</span>
            </div>
          </motion.div>

          <motion.div
            className="bg-white p-4 rounded shadow"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 className="text-gray-500 text-sm">Potencial Adicional</h3>
            <p className="text-2xl font-bold">R$ 45,5 milhões</p>
            <div className="flex items-center mt-2">
              <span className="text-sm text-blue-600">Usinas + Taxas não cobradas</span>
            </div>
          </motion.div>
        </div>

        {/* Gráficos e tabelas */}
        <div className="grid grid-cols-2 gap-6 mb-6">
          {/* Arrecadação por tributo */}
          <motion.div
            className="bg-white p-4 rounded shadow"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-lg font-semibold mb-4">Arrecadação por Tributo</h2>
            <div className="space-y-4">
              {arrecadacaoData.map((item) => (
                <motion.div
                  key={item.tributo}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex justify-between mb-1">
                    <span className="font-medium">{item.tributo}</span>
                    <span>{item.percentual}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded h-4">
                    <motion.div
                      className={`h-4 rounded ${getColorByPercentage(item.percentual)}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${item.percentual}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>Realizado: {formatCurrency(item.realizado)}</span>
                    <span>Meta: {formatCurrency(item.meta)}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Status das ações fiscais */}
          <motion.div
            className="bg-white p-4 rounded shadow"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-lg font-semibold mb-4">Status das Ações Fiscais</h2>
            <div className="grid grid-cols-2 gap-4">
              {acoesFiscaisData.map((item, index) => (
                <motion.div
                  key={item.status}
                  className={`flex flex-col items-center p-4 rounded ${
                    index === 0 ? 'bg-green-100' :
                    index === 1 ? 'bg-blue-100' :
                    index === 2 ? 'bg-red-100' :
                    'bg-gray-100'
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <span className={`text-3xl font-bold ${
                    index === 0 ? 'text-green-600' :
                    index === 1 ? 'text-blue-600' :
                    index === 2 ? 'text-red-600' :
                    'text-gray-600'
                  }`}>{item.quantidade}</span>
                  <span className={`text-sm ${
                    index === 0 ? 'text-green-800' :
                    index === 1 ? 'text-blue-800' :
                    index === 2 ? 'text-red-800' :
                    'text-gray-800'
                  }`}>{item.status}</span>
                </motion.div>
              ))}
            </div>
            <div className="mt-4 pt-2 border-t">
              <h3 className="font-medium mb-2">Distribuição de Responsáveis</h3>
              <div className="flex items-center justify-between bg-gray-100 p-2 rounded">
                <span className="text-sm">Auditores ativos: 15</span>
                <span className="text-sm">
                  Média: {Math.round(acoesFiscaisData.reduce((sum, item) => sum + item.quantidade, 0) / 15)} ações/auditor
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Ações prioritárias */}
        <motion.div
          className="bg-white p-4 rounded shadow mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-lg font-semibold mb-4">Projetos Estratégicos Prioritários</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-2 text-left">Projeto</th>
                  <th className="p-2 text-left">Potencial de Arrecadação</th>
                  <th className="p-2 text-left">Status</th>
                  <th className="p-2 text-left">Progresso</th>
                </tr>
              </thead>
              <tbody>
                {tributosPrioritarios.map((item, index) => (
                  <motion.tr
                    key={index}
                    className="border-t"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <td className="p-2 font-medium">{item.tributo}</td>
                    <td className="p-2 text-green-700 font-medium">{item.potencial}</td>
                    <td className="p-2">{item.status}</td>
                    <td className="p-2">
                      <div className="w-full bg-gray-200 rounded h-2.5">
                        <motion.div
                          className="h-2.5 rounded bg-blue-600"
                          initial={{ width: 0 }}
                          animate={{ width: `${item.progresso}%` }}
                          transition={{ duration: 0.5 }}
                        />
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Painel de alertas */}
        <motion.div
          className="bg-white p-4 rounded shadow"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Alertas e Notificações</h2>
            <span className="px-2 py-1 bg-red-100 text-red-800 rounded text-sm">4 alertas críticos</span>
          </div>
          <div className="space-y-2">
            <div className="p-3 bg-red-50 border-l-4 border-red-500 rounded">
              <h3 className="font-medium">Arrecadação TRSD abaixo da meta</h3>
              <p className="text-sm text-gray-600">
                Realizado apenas {arrecadacaoData[3].percentual}% da meta anual. Recomenda-se intensificar fiscalização.
              </p>
            </div>
            <div className="p-3 bg-red-50 border-l-4 border-red-500 rounded">
              <h3 className="font-medium">Cobrança IPTU Usinas em risco</h3>
              <p className="text-sm text-gray-600">Processo de avaliação atrasado. Potencial de R$ 40 milhões em risco para 2025.</p>
            </div>
            <div className="p-3 bg-yellow-50 border-l-4 border-yellow-500 rounded">
              <h3 className="font-medium">{acoesFiscaisData[2].quantidade} ações fiscais atrasadas</h3>
              <p className="text-sm text-gray-600">Necessária redistribuição de recursos ou revisão de prazos.</p>
            </div>
            <div className="p-3 bg-yellow-50 border-l-4 border-yellow-500 rounded">
              <h3 className="font-medium">Alto volume de impugnações IPTU</h3>
              <p className="text-sm text-gray-600">63 processos de impugnação pendentes, número crescente.</p>
            </div>
          </div>
        </motion.div>
      </main>

      {/* Rodapé */}
      <footer className="bg-gray-200 p-4 text-center text-gray-600 text-sm">
        <p>Sistema de Gestão Fiscal - Secretaria Municipal de Fazenda</p>
        <p>Departamento de Fiscalização (DEF) - SUREM - 2025</p>
      </footer>
    </div>
  );
};

export default DashboardFiscal;