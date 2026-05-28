import React from "react";
// importando ícones
import { Pencil, Trash2 } from 'lucide-react';

export default function Usuarios() {
  // Lista de dados simulando uma resposta de API ou estado
  const listaUsuarios = [
    {
      id: 1,
      nome: "Regis Nogueira",
      email: "regisnogueira@example.com",
      cargo: "Admin",
      permissao: "Admin",
    },
    {
      id: 1,
      nome: "Matheus Taveira",
      email: "mateustaveira@example.com",
      cargo: "Supervisor",
      permissao: "Supervisor",
    }
  ];

  return (
    <div className="overflow-x-auto px-4">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          {/* colunas */}
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Nome
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              CARGO
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Permissão
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Email
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {listaUsuarios.map((usuario) => (
            // linhas
            <tr key={usuario.id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">
                      {usuario.nome}
                    </div>
                    <div className="text-sm text-gray-500">
                      {usuario.email}
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{usuario.cargo}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <select className="px-1 py-1 border-0">
                    <options value="">Selecione...</options>
                    <options value="admin">Admin</options>
                    <option value="supervisor">Supervisor</option>
                </select>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {usuario.email}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button className="mr-5 hover:text-indigo-700">
                    <Pencil className="size-4"/>
                </button>
                <button className="hover:text-red-700">
                    <Trash2 className="size-4"/>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}