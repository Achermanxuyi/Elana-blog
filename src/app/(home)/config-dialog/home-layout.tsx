'use client'

import { motion } from 'motion/react'
import { useConfigStore, type CardStyles } from '../stores/config-store'
import { useLayoutEditStore } from '../stores/layout-edit-store'
import cardStylesDefault from '@/config/card-styles-default.json'

const CARD_LABELS: Record<string, string> = {
	artCard: 'Cover',
	hiCard: 'Center',
	clockCard: 'Clock',
	calendarCard: 'Calendar',
	musicCard: 'Music',
	socialButtons: 'Contact',
	shareCard: 'Share',
	articleCard: 'Article',
	writeButtons: 'Writing',
	navCard: 'Navigation',
	likePosition: 'Like',
	hatCard: 'Hat',
	beianCard: 'ICP Filing'
}

interface HomeLayoutProps {
	cardStylesData: CardStyles
	setCardStylesData: React.Dispatch<React.SetStateAction<CardStyles>>
	onClose?: () => void
}

export function HomeLayout({ cardStylesData, setCardStylesData, onClose }: HomeLayoutProps) {
	const { setCardStyles } = useConfigStore()
	const startEditing = useLayoutEditStore(state => state.startEditing)
	const editing = useLayoutEditStore(state => state.editing)

	const handleStartManualLayout = () => {
		setCardStyles(cardStylesData)
		startEditing()
		onClose?.()
	}

	const handleReset = () => {
		setCardStylesData(cardStylesDefault as unknown as CardStyles)
	}

	return (
		<div className='overflow-x-auto'>
			<div className='flex items-center justify-between'>
					<div className='text-secondary text-sm'>(Offset represents the offset relative to center)</div>
					<div className='flex shrink-0 items-center gap-2 whitespace-nowrap'>
						<button type='button' onClick={handleReset} className='bg-card rounded-xl border px-3 py-1.5 text-xs font-medium'>
							Reset
					</button>
					<button
						type='button'
						onClick={handleStartManualLayout}
						disabled={editing}
						className='bg-card rounded-xl border px-3 py-1.5 text-xs font-medium disabled:cursor-not-allowed disabled:opacity-50'>
							{editing ? 'Homepage is being edited' : 'Enter homepage drag-and-drop layout'}
					</button>
				</div>
			</div>
			<table className='mt-3 w-full border-collapse text-sm whitespace-nowrap'>
				<thead>
					<tr className='border-b text-xs text-gray-500'>
						<th className='px-3 py-2 text-left font-medium'>Card</th>
						<th className='px-3 py-2 text-left font-medium'>Width</th>
						<th className='px-3 py-2 text-left font-medium'>Height</th>
						<th className='px-3 py-2 text-left font-medium'>Order</th>
						<th className='px-3 py-2 text-left font-medium'>X Offset</th>
						<th className='px-3 py-2 text-left font-medium'>Y Offset</th>
						<th className='px-3 py-2 text-left font-medium'>Enabled</th>
					</tr>
				</thead>
				<tbody>
					{Object.entries(cardStylesData).map(([key, cardStyle]: [string, any]) => (
						<tr key={key} className='border-b last:border-0'>
							<td className='px-3 py-2 align-middle whitespace-nowrap'>{CARD_LABELS[key] ?? key.replace(/([A-Z])/g, ' $1').trim()}</td>

							<td className='px-3 py-2'>
								{cardStyle.width !== undefined ? (
									<input
										type='number'
										value={cardStyle.width}
										onChange={e =>
											setCardStylesData(prev => ({
												...prev,
												[key]: {
													...prev[key as keyof CardStyles],
													width: parseInt(e.target.value) || 0
												}
											}))
										}
										className='no-spinner bg-secondary/10 w-full rounded-lg border px-3 py-1.5 text-xs'
									/>
								) : (
									<span className='text-xs text-gray-400'>-</span>
								)}
							</td>
							<td className='px-3 py-2'>
								{cardStyle.height !== undefined ? (
									<input
										type='number'
										value={cardStyle.height}
										onChange={e =>
											setCardStylesData(prev => ({
												...prev,
												[key]: {
													...prev[key as keyof CardStyles],
													height: parseInt(e.target.value) || 0
												}
											}))
										}
										className='no-spinner bg-secondary/10 w-full rounded-lg border px-3 py-1.5 text-xs'
									/>
								) : (
									<span className='text-xs text-gray-400'>-</span>
								)}
							</td>
							<td className='px-3 py-2'>
								<input
									type='number'
									value={cardStyle.order}
									onChange={e =>
										setCardStylesData(prev => ({
											...prev,
											[key]: {
												...prev[key as keyof CardStyles],
												order: parseInt(e.target.value) || 0
											}
										}))
									}
									className='bg-secondary/10 w-full rounded-lg border px-3 py-1.5 text-xs'
								/>
							</td>
							<td className='px-3 py-2'>
								<input
									type='number'
									value={cardStyle.offsetX ?? ''}
									placeholder='null'
									onChange={e => {
										const value = e.target.value === '' ? null : parseInt(e.target.value) || 0
										setCardStylesData(prev => ({
											...prev,
											[key]: {
												...prev[key as keyof CardStyles],
												offsetX: value
											}
										}))
									}}
									className='no-spinner bg-secondary/10 w-full rounded-lg border px-3 py-1.5 text-xs'
								/>
							</td>
							<td className='px-3 py-2'>
								<input
									type='number'
									value={cardStyle.offsetY ?? ''}
									placeholder='null'
									onChange={e => {
										const value = e.target.value === '' ? null : parseInt(e.target.value) || 0
										setCardStylesData(prev => ({
											...prev,
											[key]: {
												...prev[key as keyof CardStyles],
												offsetY: value
											}
										}))
									}}
									className='no-spinner bg-secondary/10 w-full rounded-lg border px-3 py-1.5 text-xs'
								/>
							</td>
							<td className='px-3 py-2'>
								<input
									type='checkbox'
									checked={cardStyle.enabled ?? true}
									onChange={e =>
										setCardStylesData(prev => ({
											...prev,
											[key]: {
												...prev[key as keyof CardStyles],
												enabled: e.target.checked
											}
										}))
									}
									className='accent-brand h-4 w-4 rounded border-gray-300'
								/>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	)
}
