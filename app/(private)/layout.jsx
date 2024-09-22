import { LoginChallenge } from '@/components/LoginForm'

export default function Layout({ children }) {
	return (
		<>
			<LoginChallenge />
			{children}
		</>
	)
}
