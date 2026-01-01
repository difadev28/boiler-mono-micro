import React, { useState } from 'react';
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragEndEvent,
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
    useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface Task {
    id: string;
    content: string;
    status: 'todo' | 'in-progress' | 'done';
}

interface SortableItemProps {
    id: string;
    children: React.ReactNode;
}

const SortableItem: React.FC<SortableItemProps> = ({ id, children }) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({ id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners} className="mb-2 p-3 bg-white dark:bg-gray-700 rounded shadow-sm cursor-grab active:cursor-grabbing border border-gray-200 dark:border-gray-600">
            {children}
        </div>
    );
};

export const KanbanBoard: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([
        { id: '1', content: 'Design System Implementation', status: 'todo' },
        { id: '2', content: 'Authentication Flow', status: 'in-progress' },
        { id: '3', content: 'Microfrontend Setup', status: 'done' },
        { id: '4', content: 'Setup Docker', status: 'todo' },
    ]);

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (active.id !== over?.id) {
            setTasks((items) => {
                const oldIndex = items.findIndex((item) => item.id === active.id);
                const newIndex = items.findIndex((item) => item.id === over?.id);
                return arrayMove(items, oldIndex, newIndex);
            });
        }
    };

    return (
        <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-xl shadow-inner min-h-[400px]">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100 flex items-center">
                <span className="mr-2">📋</span> Feature Board
            </h2>
            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
            >
                <div className="bg-gray-100 dark:bg-gray-900 p-4 rounded-lg">
                    <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">
                        Priority Tasks (Sortable)
                    </h3>
                    <SortableContext
                        items={tasks.map(t => t.id)}
                        strategy={verticalListSortingStrategy}
                    >
                        {tasks.map((task) => (
                            <SortableItem key={task.id} id={task.id}>
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-700 dark:text-gray-200">{task.content}</span>
                                    <span className={`text-xs px-2 py-1 rounded-full ${task.status === 'done' ? 'bg-green-100 text-green-800' :
                                            task.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                                                'bg-gray-200 text-gray-800'
                                        }`}>
                                        {task.status}
                                    </span>
                                </div>
                            </SortableItem>
                        ))}
                    </SortableContext>
                </div>
            </DndContext>
        </div>
    );
};

export default KanbanBoard;
