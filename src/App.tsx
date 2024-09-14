import React, { useState } from 'react';
import { EnumCidades } from "./service/EnumCidades";
import { dijkstra } from "./service/dijkstra";
import { custoMatriz } from "./service/custoMatriz";
import { Graph } from "./Graph";

const getCidadeOptions = () => {
    return Object.keys(EnumCidades)
        .filter(key => isNaN(Number(key)))
        .map(key => ({
            name: key,
            index: EnumCidades[key as keyof typeof EnumCidades] as number
        }));
};

export const App = () => {
    const [inicio, setInicio] = useState<number | undefined>();
    const [destino, setDestino] = useState<number | undefined>();
    const [resultado, setResultado] = useState<{
        distancia: number;
        caminho: string[];
    }>();

    const handleDestinoChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setDestino(Number(event.target.value));
    };

    const handleInicioChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setInicio(Number(event.target.value));
    };

    const calculateDijkstra = () => {
        if (inicio === undefined || destino === undefined) {
            window.alert('Por favor, selecione as duas cidades');
            return;
        }
        if (inicio === destino) {
            window.alert('Selecione cidades diferentes');
            return;
        }
        setResultado(dijkstra(custoMatriz, inicio, destino));
    };

    const cidadeOptions = getCidadeOptions();

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
            <div className="bg-white flex shadow-md rounded-lg min-h-full p-6 w-full">
                <div className="mb-8 w-full h-96">
                    <Graph/>
                </div>
                <div>
                    <h1 className="text-2xl font-bold mb-4 text-center text-gray-800">
                        Calculadora de Distâncias (Dijkstra)
                    </h1>
                    <div className="mb-4">
                        <label htmlFor="inicio" className="block text-sm font-medium text-gray-700">
                            Selecione a origem:
                        </label>
                        <select
                            id="inicio"
                            value={inicio !== undefined ? inicio : ""}
                            onChange={handleInicioChange}
                            className="mt-1 block w-full p-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        >
                            <option value="" disabled>Escolha uma cidade</option>
                            {cidadeOptions.map(({name, index}) => (
                                <option key={name} value={index}>{name}</option>
                            ))}
                        </select>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="destino" className="block text-sm font-medium text-gray-700">
                            Selecione o destino:
                        </label>
                        <select
                            id="destino"
                            value={destino !== undefined ? destino : ""}
                            onChange={handleDestinoChange}
                            className="mt-1 block w-full p-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        >
                            <option value="" disabled>Escolha uma cidade</option>
                            {cidadeOptions.map(({name, index}) => (
                                <option key={name} value={index}>{name}</option>
                            ))}
                        </select>
                    </div>

                    <button
                        onClick={calculateDijkstra}
                        className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        Calcular
                    </button>

                    {resultado && inicio !== undefined && destino !== undefined && (
                        <div className="mt-6 p-4 bg-gray-50 rounded-md shadow-md">
                            <p className="text-lg font-semibold text-gray-800 mb-2">
                                Distância mínima de {EnumCidades[inicio]} a {EnumCidades[destino]}:
                            </p>
                            <p className="text-gray-700">
                                <strong>Distância:</strong> {resultado.distancia}
                            </p>
                            <p className="text-gray-700">
                                <strong>Caminho mais curto:</strong> {resultado.caminho.join(' -> ')}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
