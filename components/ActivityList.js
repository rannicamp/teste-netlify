export default function ActivityList({ activities }) {
    if (!activities || activities.length === 0) {
        return <p className="text-gray-500 p-4">Nenhuma atividade encontrada para este empreendimento.</p>;
    }

    return (
        <div className="border-t border-gray-200">
            <ul className="divide-y divide-gray-200">
                {activities.map((activity) => (
                    <li key={activity.id} className="p-4 hover:bg-gray-50">
                        <h3 className="text-lg font-semibold text-gray-800">{activity.nome}</h3>
                        <p className="text-sm text-gray-600">Categoria: {activity.tipo_atividade}</p>
                        <div className="flex justify-between items-center mt-2 text-xs text-gray-500">
                            <span>Status: {activity.status}</span>
                            <span>Início: {activity.data_inicio_prevista}</span>
                            <span>Fim: {activity.data_fim_prevista}</span>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}