import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, AlertCircle } from 'lucide-react';
import Button from '../components/shared/Button';
import { Input, FormLabel, Checkbox } from '../components/shared/FormStyles';

interface LoginProps {
  onLogin: () => void;
}

export default function Login({ onLogin }: LoginProps) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Basic validation
    if (!formData.email || !formData.password) {
      setError('Por favor, preencha todos os campos.');
      setLoading(false);
      return;
    }

    try {
      // Mock login - replace with actual authentication
      if (formData.email === 'demo@example.com' && formData.password === 'password') {
        onLogin();
        navigate('/');
      } else {
        setError('Email ou senha inválidos.');
      }
    } catch (err) {
      setError('Ocorreu um erro ao tentar fazer login.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FF66B2] to-[#33CCCC] flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Bem-vindo de volta!</h1>
          <p className="text-gray-600">Entre para continuar no Babá do Empreendedor</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start space-x-3">
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          <div>
            <FormLabel htmlFor="email" required>Email</FormLabel>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="Digite seu email"
              leftIcon={<Mail className="w-5 h-5" />}
              required
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <FormLabel htmlFor="password" required>Senha</FormLabel>
              <Link to="/forgot-password" className="text-sm text-[#FF66B2] hover:text-[#ff4d9f]">
                Esqueceu a senha?
              </Link>
            </div>
            <Input
              id="password"
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              placeholder="Digite sua senha"
              leftIcon={<Lock className="w-5 h-5" />}
              required
            />
          </div>

          <Checkbox
            id="remember-me"
            label="Lembrar-me"
            checked={formData.rememberMe}
            onChange={(e) => setFormData({ ...formData, rememberMe: e.target.checked })}
          />

          <Button
            type="submit"
            fullWidth
            size="lg"
            loading={loading}
          >
            Entrar
          </Button>

          <p className="text-center text-sm text-gray-600">
            Não tem uma conta?{' '}
            <Link to="/signup" className="text-[#FF66B2] hover:text-[#ff4d9f] font-medium">
              Cadastre-se
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}