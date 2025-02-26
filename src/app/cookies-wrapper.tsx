import { useRouter } from 'next/navigation';

const CookiesWrapper = () => {
    const router = useRouter();

    return (
        <button
            onClick={() => router.push('/policy/cookies-policy')}
            className="text-gray-600 dark:text-gray-300 hover:text-brand-yellow transition-colors"
        >
            Ver política de cookies
        </button>
    );
};

export default CookiesWrapper; 