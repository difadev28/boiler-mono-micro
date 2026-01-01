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
declare const UserCard: React.FC<UserCardProps>;
export default UserCard;
