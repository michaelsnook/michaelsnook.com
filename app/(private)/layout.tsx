import { LoginChallenge } from '@/components/login-form'

export default function Layout({ children }) {
	return (
		<>
			<LoginChallenge />
			{children}
		</>
	)
}
