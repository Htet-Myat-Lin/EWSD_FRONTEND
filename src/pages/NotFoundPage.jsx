import React from 'react'
import { Link } from 'react-router-dom'

export default function NotFoundPage() {
	return (
		<div className="min-h-screen flex items-center justify-center bg-linear-to-br from-indigo-50 to-white p-6">
			<div className="max-w-2xl w-full bg-white shadow-xl rounded-xl p-8 text-center">
				<div className="flex items-center justify-center mb-6">
					<div className="w-28 h-28 rounded-full bg-indigo-100 flex items-center justify-center">
						<svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-indigo-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16h-1v-4h-1" />
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.29 3.86L1.82 12.33a2 2 0 000 2.83l8.47 8.47a2 2 0 002.83 0l8.47-8.47a2 2 0 000-2.83L13.12 3.86a2 2 0 00-2.83 0z" />
						</svg>
					</div>
				</div>

				<h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-2">404</h1>
				<p className="text-xl text-gray-700 mb-4">Page not found</p>
				<p className="text-gray-600 mb-6">Sorry — we couldn't find the page you're looking for. It may have been moved or deleted.</p>

				<div className="flex justify-center">
					<Link to="/" className="px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700">Return Home</Link>
				</div>

				<p className="mt-6 text-sm text-gray-500">If you think this is a bug, please <a href="mailto:devteam@example.com" className="text-indigo-600 hover:underline">report it</a>.</p>
			</div>
		</div>
	)
}

