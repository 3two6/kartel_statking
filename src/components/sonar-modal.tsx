import React from 'react'
import { Dialog, DialogContent } from './ui/dialog'
import { X } from 'lucide-react'

type Props = {
	open: boolean,
	setOpen: (open: boolean) => void,
	close?: () => void,
	children: React.ReactNode
}

const Modal = (props: Props) => {
	return (
		<Dialog open={props.open} onOpenChange={props.close ? props.close : () => props.setOpen(false)}>
			<DialogContent className="flex max-w-[560px]">
				<div className='flex flex-row w-full gap-5'>
					{props.children}
				</div>
				<X className='h-4 w-4 absolute right-4 top-4 cursor-pointer text-2xl' onClick={() => props.setOpen(false)} />
			</DialogContent>
		</Dialog>
	)
}

export default Modal