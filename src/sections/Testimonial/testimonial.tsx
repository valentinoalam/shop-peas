import { useState, useEffect } from 'react'

import { Card } from "@/components/ui/card"

import TestimonialCard, { TestimonialCardProps } from './card'
interface Testimonial extends TestimonialCardProps {
	id: string;
	createdAt?: string;
}

export default function Testimonials() {
	const [testimonials, setTestimonials] = useState<Testimonial[]>([])
	const [isLoading, setIsLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)
	useEffect(() => {
			const fetchTestimonials = async () => {
					try {
							const response = await fetch('/api/testimonials')
							if (!response.ok) throw new Error('Failed to fetch testimonials')
							const data = await response.json()
							setTestimonials(data)
					} catch (err) {
							setError(err instanceof Error ? err.message : 'Failed to load testimonials')
					} finally {
							setIsLoading(false)
					}
			}

			fetchTestimonials()
	}, [])
	if(isLoading) return (
		<div className="text-center py-10">
			<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500 mx-auto"></div>
		</div>
	)
	if(error) return (
		<div className="text-center py-10 text-red-500">{error}</div>
	)
  return (
		<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 -mx-3 items-start">
				{testimonials.length > 0 ? testimonials.map((testimonial) => (
						<Card key={testimonial.id} className="px-3 md:w-1/3">
								<TestimonialCard {...testimonial} />
						</Card>
				)): (
						<div className="col-span-full text-center py-12">
							<p className="text-muted-foreground">No testimonials yet. Be the first to share your experience!</p>
						</div>
				)}
		</div>
  )
}
