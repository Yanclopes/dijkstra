import {custoMatriz} from "./custoMatriz";
import {EnumCidades} from "./EnumCidades";

export function dijkstra(matriz: (number | null)[][], origem: number, destino: number): {distancia: number, caminho: string[]} {
    const n = matriz.length;
    const distancias: number[] = Array(n).fill(Infinity);
    const cidades: (number | null)[] = Array(n).fill(null);
    const processado: boolean[] = Array(n).fill(false);
    const heap: [number, number][] = [[0, origem]];

    distancias[origem] = 0;

    while (heap.length > 0) {
        const [dist, u] = heap.shift()!;
        if (processado[u]) continue;
        processado[u] = true;
        for (let v = 0; v < n; v++) {
            if (matriz[u][v] !== null && !processado[v]) {
                const novaDistancia = distancias[u] + matriz[u][v]!;
                if (novaDistancia < distancias[v]) {
                    distancias[v] = novaDistancia;
                    cidades[v] = u;
                    heap.push([novaDistancia, v]);
                    heap.sort((a, b) => a[0] - b[0]);
                }
            }
        }
    }

    const caminho: number[] = [];
    let atual: number | null = destino;
    while (atual !== null && atual !== undefined) {
        caminho.unshift(atual);
        atual = cidades[atual] ;
    }
    return {
        distancia: distancias[destino],
        caminho: caminho.map((cidade)=>{
            return EnumCidades[cidade];
        })
    };
}
