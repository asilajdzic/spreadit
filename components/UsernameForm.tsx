'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import {
	UsernameRequest,
	UsernameValidator,
} from '@lib/validators/username';
import { User } from '@prisma/client';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from './ui/Card';
import { Label } from './ui/Label';
import { Input } from './ui/Input';
import { Button } from './ui/Button';
import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { toast } from '@hooks/use-toast';
import { useRouter } from 'next/navigation';

interface UsernameFormProps {
	user: Pick<User, 'id' | 'username'>;
}

const UsernameForm: FC<UsernameFormProps> = ({ user }) => {
	const router = useRouter();
	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm<UsernameRequest>({
		resolver: zodResolver(UsernameValidator),
		defaultValues: {
			name: user.username || '',
		},
	});

	const { mutate: updateUsername, isLoading } = useMutation({
		mutationFn: async ({ name }: UsernameRequest) => {
			const payload: UsernameRequest = { name };

			const { data } = await axios.patch('/api/username', payload);
		},
		onError: (err) => {
			if (err instanceof AxiosError) {
				if (err.response?.status === 409)
					return toast({
						title: 'Username already exists',
						description: 'Please choose different username',
						variant: 'destructive',
					});
			}
		},
		onSuccess: () => {
			toast({
				description: 'Your username has been updated',
			});
			router.refresh();
		},
	});

	return (
		<form onSubmit={handleSubmit((name) => updateUsername(name))}>
			<Card>
				<CardHeader>
					<CardTitle>Your username</CardTitle>
					<CardDescription>
						Please enter a display name you are comfortable with
					</CardDescription>
				</CardHeader>
				<CardContent>
					<div className='relative grid gap-1'>
						<div className='absolute left-0 top-0 w-8 h-10 grid place-items-center'>
							<span className='text-sm text-zinc-400'>u/</span>
						</div>
						<Label className='sr-only' htmlFor='name'>
							Name
						</Label>
						<Input
							className='w-[400px] pl-6 '
							id='name'
							size={32}
							{...register('name')}
						/>
						{errors.name && (
							<p className='px-1 text-xs text-red-600'>
								{errors.name.message}
							</p>
						)}
					</div>
				</CardContent>
				<CardFooter>
					<Button type='submit' disabled={isLoading}>
						Change name
					</Button>
				</CardFooter>
			</Card>
		</form>
	);
};

export default UsernameForm;
