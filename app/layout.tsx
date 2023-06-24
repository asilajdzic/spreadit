import '@styles/globals.css';

import { Inter } from 'next/font/google';
import { cn } from '@lib/utils';

import { Toaster } from '@components/ui/Toaster';

import Navbar from '@components/Navbar';
import Providers from '@components/Providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
	title: 'Spreadit',
	description: 'A Reddit clone built with Next.js and TypeScript.',
};

const RootLayout = ({
	children,
	authModal,
}: {
	children: React.ReactNode;
	authModal: React.ReactNode;
}) => {
	return (
		<html
			lang='en'
			className={cn(
				'bg-white text-slate-900 antialiased',
				inter.className
			)}
		>
			<body className='min-h-screen pt-12 bg-slate-50'>
				<Providers>
					<Navbar />
					{authModal}
					<div className='container max-w-7xl mx-auto h-full pt-12'>
						{children}
					</div>
					<Toaster />
				</Providers>
			</body>
		</html>
	);
};

export default RootLayout;
