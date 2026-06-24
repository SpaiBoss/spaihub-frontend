import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { CheckCircle, XCircle, Loader } from 'lucide-react';
import api from '../../services/api';
import AuthLayout from '../../components/AuthLayout';

export default function VerifyEmail() {
  const [params] = useSearchParams();
  const [status, setStatus] = useState('loading');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const token = params.get('token');
    if (!token) {
      setStatus('error');
      setMessage('No verification token provided');
      return;
    }

    api
      .get(`/api/auth/verify-email?token=${token}`)
      .then((res) => {
        setStatus('success');
        setMessage(res.data.message);
      })
      .catch((err) => {
        setStatus('error');
        setMessage(err.response?.data?.error || 'Verification failed');
      });
  }, [params]);

  return (
    <AuthLayout title="Email Verification">
      <div className="text-center py-4">
        {status === 'loading' && <Loader className="w-12 h-12 text-brand animate-spin mx-auto" />}
        {status === 'success' && <CheckCircle className="w-12 h-12 text-green-500 mx-auto" />}
        {status === 'error' && <XCircle className="w-12 h-12 text-red-500 mx-auto" />}
        <p className="mt-4 text-gray-600">{message}</p>
        {status !== 'loading' && (
          <Link to="/login" className="inline-block mt-6 text-brand hover:text-brand/80 font-medium">
            Go to login
          </Link>
        )}
      </div>
    </AuthLayout>
  );
}
