import PasswordResetForm from '@/component/auth/PasswordResetForm';
import BreadcrumbSection from '@/component/breadcrumb/BreadcrumbSection';
import Layout from '@/component/layout/Layout';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Reset Password | Cooking confessions',
	description:
		'Cooking confessions delivers the best African/Kenyan meals in Slovakia',
};

export default function ResetPasswordConfirmation() {
	return (
		<Layout>
			<BreadcrumbSection title='Set password' />
			<PasswordResetForm />
		</Layout>
	);
}
