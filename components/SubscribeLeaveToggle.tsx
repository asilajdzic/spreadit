'use client';

import { FC, startTransition } from 'react';
import { useMutation } from '@tanstack/react-query';
import { SubscribeToSubredditPayload } from '@lib/validators/subreddit';
import { useCustomToast } from '@hooks/use-custom-toast';
import { useToast } from '@hooks/use-toast';
import { useRouter } from 'next/navigation';

import { Button } from './ui/Button';
import axios, { AxiosError } from 'axios';

interface SubscribeLeaveToggleProps {
	isSubscribed: boolean;
	subredditId: string;
	subredditName: string;
}

const SubscribeLeaveToggle: FC<SubscribeLeaveToggleProps> = ({
	isSubscribed,
	subredditId,
	subredditName,
}) => {
	const router = useRouter();
	const { toast } = useToast();
	const { loginToast } = useCustomToast();
	const { mutate: subscribe, isLoading: isSubLoading } = useMutation({
		mutationFn: async () => {
			const payload: SubscribeToSubredditPayload = {
				subredditId,
			};
			const { data } = await axios.post(
				'/api/subreddit/subscribe',
				payload
			);
			return data as string;
		},
		onError: (err) => {
			if (err instanceof AxiosError) {
				if (err.response?.status === 401) return loginToast();
			}
			return toast({
				title: 'There was an error',
				description: 'Something went wrong, please try again',
				variant: 'destructive',
			});
		},
		onSuccess: () => {
			startTransition(() => {
				router.refresh();
			});
			return toast({
				title: 'Subscribed',
				description: `You are now subscribed to r/${subredditName}`,
			});
		},
	});
	const { mutate: unsubscribe, isLoading: isUnsbubLoading } =
		useMutation({
			mutationFn: async () => {
				const payload: SubscribeToSubredditPayload = {
					subredditId,
				};
				const { data } = await axios.post(
					'/api/subreddit/unsubscribe',
					payload
				);
				return data as string;
			},
			onError: (err) => {
				if (err instanceof AxiosError) {
					if (err.response?.status === 401) return loginToast();
				}
				return toast({
					title: 'There was an error',
					description: 'Something went wrong, please try again',
					variant: 'destructive',
				});
			},
			onSuccess: () => {
				startTransition(() => {
					router.refresh();
				});
				return toast({
					title: 'Unsubscribed',
					description: `You are now unsubscribed from r/${subredditName}`,
				});
			},
		});
	return isSubscribed ? (
		<Button
			onClick={() => unsubscribe()}
			disabled={isUnsbubLoading}
			className='w-full mt-1 mb-4'
		>
			Leave community
		</Button>
	) : (
		<Button
			disabled={isSubLoading}
			onClick={() => subscribe()}
			className='w-full mt-1 mb-4'
		>
			Join to post
		</Button>
	);
};

export default SubscribeLeaveToggle;
