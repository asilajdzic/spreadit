import { FC } from 'react';
import { User } from 'next-auth';
import { AvatarProps } from '@radix-ui/react-avatar';
import { Avatar, AvatarFallback } from './ui/Avatar';
import { Icons } from './Icons';

import Image from 'next/image';

interface UserAvatarProps extends AvatarProps {
	user: Pick<User, 'name' | 'image'>;
}

const UserAvatar: FC<UserAvatarProps> = ({ user, ...props }) => {
	return (
		<Avatar>
			{user.image ? (
				<div className='relative aspect-square h-full w-full'>
					<Image
						fill
						src={user.image}
						alt='profile picture'
						referrerPolicy='no-referrer'
					/>
				</div>
			) : (
				<AvatarFallback>
					<span>{user?.name}</span>
					<Icons.user className='h-4 w-4' />
				</AvatarFallback>
			)}
		</Avatar>
	);
};

export default UserAvatar;
