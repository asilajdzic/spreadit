'use client';

import { useRouter } from 'next/navigation';
import { X } from 'lucide-react';
import { Button } from './ui/Button';

const CloseModal = () => {
	const router = useRouter();
	return (
		<Button
			variant='secondary'
			aria-abel='close modal'
			onClick={() => router.back()}
		>
			<X className='h-4 w-4' />
		</Button>
	);
};

export default CloseModal;
