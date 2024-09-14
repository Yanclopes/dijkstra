import React from 'react';
import ReactFlow, { MiniMap, Controls, Background, useEdgesState, useNodesState } from 'reactflow';
import 'reactflow/dist/style.css';
import { EnumCidades } from "./service/EnumCidades";
import { custoMatriz } from "./service/custoMatriz";

const generateGraphData = () => {
    const nodes = Object.keys(EnumCidades)
        .filter(key => isNaN(Number(key)))
        .map((key, index) => ({
            id: index.toString(),
            type: 'default',
            position: { x: Math.random() * 600, y: Math.random() * 400 },
            data: { label: key }
        }));

    const edges = [];
    const edgeSet = new Set();

    for (let i = 0; i < custoMatriz.length; i++) {
        for (let j = i + 1; j < custoMatriz[i].length; j++) {
            if (custoMatriz[i][j] !== null) {
                const edgeId = `${Math.min(i, j)}-${Math.max(i, j)}`;
                if (!edgeSet.has(edgeId)) {
                    edges.push({
                        id: edgeId,
                        source: i.toString(),
                        target: j.toString(),
                        label: custoMatriz[i][j]!.toString(),
                        animated: true,
                        arrowHeadType: 'arrow',
                    });
                    edgeSet.add(edgeId);
                }
            }
        }
    }

    return { nodes, edges };
};

const { nodes: initialNodes, edges: initialEdges } = generateGraphData();

export const Graph = () => {
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

    return (
        <div className="w-full h-96">
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                fitView
            >
                <MiniMap />
                <Controls />
                <Background />
            </ReactFlow>
        </div>
    );
};
