import React from 'react'
import { Link } from 'react-router-dom'

export default function UnauthorizedPage() {
	return (
		<div className="min-h-screen flex items-center justify-center bg-linear-to-br from-gray-50 to-white p-6">
			<div className="max-w-xl w-full bg-white shadow-lg rounded-xl p-8 text-center">
				<div className="mx-auto w-24 h-24 rounded-full bg-yellow-50 flex items-center justify-center mb-6">
					<svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 11c1.657 0 3-1.343 3-3V6a3 3 0 10-6 0v2c0 1.657 1.343 3 3 3z" />
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 11h14a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2z" />
					</svg>
				</div>

				<h1 className="text-2xl sm:text-3xl font-semibold mb-2 text-gray-900">Access denied</h1>
				<p className="text-gray-600 mb-6">You don't have permission to view this page. Please sign in with an account that has the required access.</p>

				<div className="flex flex-col sm:flex-row gap-3 justify-center">
					<Link to="/" className="inline-block px-4 py-2 rounded-md border border-gray-200 bg-white text-gray-800 hover:bg-gray-50">Go to Home</Link>
					<Link to="/login" className="inline-block px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700">Sign in</Link>
				</div>

				<p className="mt-4 text-sm text-gray-500">If you believe this is an error, contact <a className="text-blue-600 hover:underline" href="mailto:support@example.com">support@example.com</a>.</p>
			</div>
		</div>
	)
}

