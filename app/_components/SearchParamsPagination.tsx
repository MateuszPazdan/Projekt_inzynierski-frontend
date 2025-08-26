'use client';

import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6';
import React from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

interface PaginationProps {
	currPage?: number;
	pages?: number;
	size?: 'lg' | 'sm';
}

export default function SearchParamsPagination({
	currPage = 1,
	pages = 1,
	size = 'lg',
}: PaginationProps) {
	const searchParams = useSearchParams();
	const pathname = usePathname();
	const router = useRouter();
	const currentPage = searchParams.get('page') ?? 1;

	function handleChangePage(pageNumber: number) {
		const params = new URLSearchParams(searchParams);
		params.set('page', String(pageNumber));
		router.replace(`${pathname}?${params.toString()}`, { scroll: true });
	}

	if (pages < 1) return null;

	if (Number(currentPage) > pages) handleChangePage(pages);

	if (pages <= 1) return null;

	return (
		<div
			className={`relative flex justify-center items-center gap-2 py-3 self-end ${
				size === 'lg' && 'text-lg'
			} ${size === 'sm' && 'text-sm'} w-fit mx-auto`}
		>
			<button
				disabled={currPage <= 1}
				onClick={() => handleChangePage(currPage - 1)}
				className={`absolute -left-12 ${
					currPage <= 1 && ' hidden '
				} text-black hover:text-second hover:bg-graySecond rounded-lg p-2 cursor-pointer transition-colors duration-300`}
			>
				<FaAngleLeft />
			</button>
			<span>{currPage}</span>
			<span>z</span>
			<span>{pages}</span>
			<button
				disabled={currPage >= pages}
				onClick={() => handleChangePage(Number(currPage) + 1)}
				className={`absolute -right-12 ${
					currPage >= pages && ' hidden '
				} text-black hover:text-second hover:bg-graySecond rounded-lg p-2 cursor-pointer transition-colors duration-300`}
			>
				<FaAngleRight />
			</button>
		</div>
	);
}
