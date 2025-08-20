'use client';

import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6';
import React from 'react';

interface PaginationProps {
	currPage: number;
	setCurrPage: (currPage: number) => void;
	pages: number;
	size?: 'lg' | 'sm';
}

export default function Pagination({
	currPage,
	setCurrPage,
	pages,
	size = 'lg',
}: PaginationProps) {
	function handleChangePage(page: number) {
		setCurrPage(page);
	}

	if (pages <= 1) return null;

	return (
		<div
			className={`relative flex justify-center items-center gap-2 self-end ${
				size === 'lg' && 'text-lg'
			} ${size === 'sm' && 'text-sm'} w-fit mx-auto`}
		>
			<button
				disabled={currPage <= 1}
				onClick={() => handleChangePage(currPage - 1)}
				className={`absolute -left-12 ${
					currPage <= 1 && ' hidden '
				} text-black hover:text-second hover:bg-grayOne rounded-lg p-2 cursor-pointer transition-colors duration-300`}
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
				} text-black hover:text-second hover:bg-grayOne rounded-lg p-2 cursor-pointer transition-colors duration-300`}
			>
				<FaAngleRight />
			</button>
		</div>
	);
}
