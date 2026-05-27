import React from 'react';

export default function DadosPessoais() {
  return (
    <div>
      <div className="relative overflow-x-auto bg-neutral-primary-soft shadow-xs rounded-lg border border-slate-200">
        <table className="w-full text-sm text-center rtl:text-right text-body">
         {/* adicionando colunas */}
          <thead className="text-sm text-body bg-neutral-secondary-soft">
            <tr>
              <th scope="col" className="px-6 py-3 font-medium">
                Nome
              </th>
              <th scope="col" className="px-6 py-3 font-medium">
                Idade
              </th>
              <th scope="col" className="px-6 py-3 font-medium">
                Sexo
              </th>
              <th scope="col" className="px-6 py-3 font-medium">
                Escolaridade
              </th>
            </tr>
          </thead>
          {/* adicionando as linhas com os campos */}
          <tbody>
            <tr className="bg-white">
              {/* nome */}
              <td className="px-6 py-4">
                <input 
                  type="text" 
                  name="nome"
                  placeholder="Ex: Regis Nogueira" 
                  className="w-full bg-transparent border border-gray-300 rounded px-2 py-1 focus:outline-none focus:border-blue-500"
                />
              </td>

              {/* idade */}
              <td className="px-6 py-4">
                <input 
                  type="number" 
                  name="idade"
                  placeholder="21" 
                  className="w-full bg-transparent border border-gray-300 rounded px-2 py-1 focus:outline-none focus:border-blue-500"
                />
              </td>

              {/* sexo */}
              <td className="px-6 py-4">
                <select 
                  name="sexo"
                  className="w-full bg-transparent border border-gray-300 rounded px-2 py-1 focus:outline-none focus:border-blue-500"
                >
                  <option value="">Selecione...</option>
                  <option value="masculino">Masculino</option>
                  <option value="feminino">Feminino</option>
                  <option value="outro">Outro</option>
                </select>
              </td>

              {/* escolaridade */}
              <td className="px-6 py-4">
                <select 
                  name="escolaridade"
                  className="w-full bg-transparent border border-gray-300 rounded px-2 py-1 focus:outline-none focus:border-blue-500"
                >
                  <option value="">Selecione...</option>
                  <option value="fundamental_completo">Ensino Fundamental Completo</option>
                  <option value="fundamental_incompleto">Ensino Fundamental Incompleto</option>
                  <option value="medio_completo">Ensino Médio Completo</option>
                  <option value="medio_incompleto">Ensino Médio Incompleto</option>
                  <option value="superior_completo">Ensino Superior Completo</option>
                  <option value="superior_incompleto">Ensino Superior Incompleto</option>
                </select>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
