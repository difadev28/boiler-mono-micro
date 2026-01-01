import React from 'react';

export interface User {
    id: string;
    name: string;
    email: string;
    avatar?: string;
    role?: string;
    bio?: string;
}

export interface UserCardProps {
    user: User;
    onEdit?: (user: User) => void;
    onDelete?: (userId: string) => void;
    showActions?: boolean;
}

const UserCard: React.FC<UserCardProps> = ({
    user,
    onEdit,
    onDelete,
    showActions = true
}) => {
    const { id, name, email, avatar, role, bio } = user;

    const initials = name
        .split(' ')
        .map(n => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);

    return (
        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200 border border-gray-200">
            <div className="flex items-start gap-4">
                {/* Avatar */}
                <div className="flex-shrink-0">
                    {avatar ? (
                        <img
                            src={avatar}
                            alt={name}
                            className="w-16 h-16 rounded-full object-cover border-2 border-blue-500"
                        />
                    ) : (
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-xl">
                            {initials}
                        </div>
                    )}
                </div>

                {/* User Info */}
                <div className="flex-1 min-w-0">
                    <h3 className="text-xl font-bold text-gray-900 truncate">{name}</h3>
                    {role && (
                        <p className="text-sm text-blue-600 font-medium mt-1">{role}</p>
                    )}
                    <p className="text-sm text-gray-600 mt-1 truncate">{email}</p>
                    {bio && (
                        <p className="text-sm text-gray-700 mt-2 line-clamp-2">{bio}</p>
                    )}
                </div>
            </div>

            {/* Actions */}
            {showActions && (
                <div className="flex gap-2 mt-4 pt-4 border-t border-gray-200">
                    {onEdit && (
                        <button
                            onClick={() => onEdit(user)}
                            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 font-medium text-sm"
                        >
                            Edit
                        </button>
                    )}
                    {onDelete && (
                        <button
                            onClick={() => onDelete(id)}
                            className="flex-1 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors duration-200 font-medium text-sm"
                        >
                            Delete
                        </button>
                    )}
                </div>
            )}
        </div>
    );
};

export default UserCard;
