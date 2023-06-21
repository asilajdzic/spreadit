'use client';

import { FC, useState } from 'react';

import { cn } from '@lib/utils';
import { signIn } from 'next-auth/react';

import { Button } from './ui/Button';
import { Loader2 } from 'lucide-react';
import { Icons } from './Icons';
import { useToast } from '@hooks/use-toast';

interface UserAuthFormProps
	extends React.HTMLAttributes<HTMLDivElement> {}

const UserAuthForm: FC<UserAuthFormProps> = ({
	className,
	...props
}) => {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const { toast } = useToast();

	const loginWithGoogle = async () => {
		setIsLoading(true);

		try {
			await signIn('google');
		} catch (error) {
			toast({
				title: 'Error',
				description: 'There was an error logging in with Google',
				variant: 'destructive',
			});
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className={cn('flex justify-center', className)} {...props}>
			<Button
				disabled={isLoading}
				size='sm'
				type='button'
				className='w-full'
				onClick={loginWithGoogle}
			>
				{isLoading ? (
					<>
						<Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please
						wait
					</>
				) : (
					<>
						<Icons.google className='h-4 w-4 mr-2' />
						Google
					</>
				)}
			</Button>
		</div>
	);
};

export default UserAuthForm;
