import { Navbar } from '@store/components/Navbar';
import { NextPage } from 'next';
import Link from 'next/link';
import { ChangeEvent, useState } from 'react';

type TagBrowser = 'extension' | 'web';
type TagMobile = 'android' | 'ios';
type TagNative = 'cli' | 'linux' | 'macos' | 'windows';
type Tag = TagBrowser | TagMobile | TagNative;

type MiniApp = { id: string; href: string; github: string; image: string; name: string; tags: Tag[] };

const HomePage: NextPage = () => {
	const [{ query = '' }, setState] = useState<{ query: string }>({ query: '' });

	const miniApps: MiniApp[] = [
		{
			id: 'chess',
			href: 'https://hieudoanm.github.io/chess',
			github: 'https://github.com/hieudoanm/chess',
			image: 'https://raw.githubusercontent.com/hieudoanm/chess/refs/heads/master/images/cover.png',
			name: 'Chess',
			tags: ['cli', 'extension', 'web'],
		},
		{
			id: 'editor',
			href: 'https://hieudoanm.github.io/editor',
			github: 'https://github.com/hieudoanm/editor',
			image: 'https://raw.githubusercontent.com/hieudoanm/editor/refs/heads/master/images/cover.png',
			name: 'editor',
			tags: ['cli', 'macos', 'web'],
		},
		{
			id: 'gas',
			href: 'https://gaslit.vercel.app/',
			github: 'https://github.com/hieudoanm/gas',
			image: 'https://raw.githubusercontent.com/hieudoanm/gas/refs/heads/master/images/cover.png',
			name: 'GAS',
			tags: ['cli', 'web'],
		},
		{
			id: 'gh',
			href: 'https://hieudoanm.github.io/gh',
			github: 'https://github.com/hieudoanm/gh',
			image: 'https://raw.githubusercontent.com/hieudoanm/gh/refs/heads/master/images/cover.png',
			name: 'gh',
			tags: ['cli', 'extension', 'web'],
		},
		{
			id: 'images',
			href: 'https://hieudoanm.github.io/images',
			github: 'https://github.com/hieudoanm/images',
			image: 'https://raw.githubusercontent.com/hieudoanm/images/refs/heads/master/images/cover.png',
			name: 'Images',
			tags: ['cli', 'web'],
		},
		{
			id: 'reverse-proxy',
			href: 'https://hieudoanm-reverse-proxy.vercel.app/',
			github: 'https://github.com/hieudoanm/reverse-proxy',
			image: 'https://raw.githubusercontent.com/hieudoanm/reverse-proxy/refs/heads/master/images/cover.png',
			name: 'Reverse Proxy',
			tags: ['web'],
		},
	];

	const filteredMiniApps: MiniApp[] = miniApps.filter(({ name = '', tags = [] }) => {
		return (
			name.toLowerCase().includes(query.toLowerCase()) ||
			tags.some((tag) => tag.toLowerCase().includes(query.toLowerCase()))
		);
	});

	return (
		<div className="min-h-screen">
			<Navbar />
			<div className="container mx-auto p-4 md:p-8">
				<div className="flex flex-col gap-y-4 md:gap-y-8">
					<input
						id="filter"
						name="filter"
						placeholder="Filter"
						className="w-full rounded-full border border-neutral-800 px-4 py-2 focus:outline-none"
						value={query}
						onChange={(event: ChangeEvent<HTMLInputElement>) => {
							setState((previous) => ({ ...previous, query: event.target.value }));
						}}
					/>
					<div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
						{filteredMiniApps.map(({ id = '', href = '', image = '', name = '', github = '', tags = [] }) => {
							return (
								<div
									key={id}
									className="overflow-hidden rounded-2xl border border-neutral-800 shadow-none shadow-neutral-100/10 transition-all hover:shadow-2xl">
									<Link href={href} target="_blank">
										<div
											className="aspect-video bg-contain bg-center bg-no-repeat"
											style={{ backgroundImage: `url(${image})` }}
										/>
									</Link>
									<div className="flex flex-col gap-y-2 border-t border-neutral-800 py-4">
										<div className="flex items-center justify-between gap-x-2 px-4">
											<h5 className="truncate text-base font-medium whitespace-nowrap md:text-lg">{name}</h5>
											<Link href={github} className="text-sm underline underline-offset-4" target="_blank">
												<p>GitHub</p>
											</Link>
										</div>
										<div className="flex items-center gap-x-2 px-4">
											{tags.map((tag: Tag) => {
												return (
													<span
														key={tag}
														className="block rounded-sm bg-neutral-100 px-1 py-0.5 text-xs font-black text-neutral-900">
														{tag}
													</span>
												);
											})}
										</div>
									</div>
								</div>
							);
						})}
					</div>
				</div>
			</div>
		</div>
	);
};

export default HomePage;
