export default function ActivityList({ activities }) {
    if (activities.length === 0) {
        return <p className="text-gray-500">Nenhuma atividade encontrada para este empreendimento.</p>;
    }

    return (
        <div className="border-t border-gray-200">
            <ul className="divide-y divide-gray-200">
                {activities.map((activity) => (
                    <li key={activity.id} className="p-4 hover:bg-gray-50">
                        <h3 className="text-lg font-semibold text-gray-800">{activity.nome}</h3>
                        <p className="text-sm text-gray-600">{activity.descricao || 'Sem descrição.'}</p>
                        <div className="flex justify-between items-center mt-2 text-xs text-gray-500">
                            <span>Status: {activity.status}</span>
                            <span>Tipo: {activity.tipo_atividade}</span>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}