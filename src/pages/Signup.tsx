import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, User, AlertCircle, Check, X } from 'lucide-react';
import Button from '../components/shared/Button';
import { Input, FormLabel, Checkbox } from '../components/shared/FormStyles';

interface ValidationState {
  length: boolean;
  number: boolean;
  symbol: boolean;
  match: boolean;
}

export default function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false
  });
  const [error, setError] = useState('');
  const [showValidation, setShowValidation] = useState(false);
  const [loading, setLoading] = useState(false);

  const validation: ValidationState = {
    length: formData.password.length >= 8,
    number: /\d/.test(formData.password),
    symbol: /[!@#$%^&*(),.?":{}|<>]/.test(formData.password),
    match: formData.password === formData.confirmPassword && formData.password !== ''
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Validation
      if (!formData.fullName || !formData.email || !formData.password || !formData.confirmPassword) {
        setError('Por favor, preencha todos os campos.');
        return;
      }

      if (!formData.acceptTerms) {
        setError('Você precisa aceitar os Termos de Serviço e Política de Privacidade.');
        return;
      }

      if (!validation.length || !validation.number || !validation.symbol) {
        setError('Sua senha não atende aos requisitos mínimos.');
        return;
      }

      if (!validation.match) {
        setError('As senhas não coincidem.');
        return;
      }

      // Mock signup - replace with actual authentication
      navigate('/');
    } catch (err) {
      setError('Ocorreu um erro ao tentar criar sua conta.');
    } finally {
      setLoading(false);
    }
  };

  const ValidationItem = ({ checked, text }: { checked: boolean; text: string }) => (
    <div className="flex items-center space-x-2">
      {checked ? (
        <Check className="w-4 h-4 text-green-500" />
      ) : (
        <X className="w-4 h-4 text-red-500" />
      )}
      <span className={`text-sm ${checked ? 'text-green-700' : 'text-red-700'}`}>
        {text}
      </span>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FF66B2] to-[#33CCCC] flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Crie sua Conta</h1>
          <p className="text-gray-600">
            Entre para o Babá do Empreendedor e comece a gerenciar suas metas!
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start space-x-3">
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          <div>
            <FormLabel htmlFor="fullName" required>Nome Completo</FormLabel>
            <Input
              id="fullName"
              type="text"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              placeholder="Digite seu nome completo"
              leftIcon={<User className="w-5 h-5" />}
              required
            />
          </div>

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
            <FormLabel htmlFor="password" required>Senha</FormLabel>
            <Input
              id="password"
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              onFocus={() => setShowValidation(true)}
              placeholder="Crie uma senha"
              leftIcon={<Lock className="w-5 h-5" />}
              required
            />
          </div>

          <div>
            <FormLabel htmlFor="confirmPassword" required>Confirme sua Senha</FormLabel>
            <Input
              id="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              placeholder="Digite a senha novamente"
              leftIcon={<Lock className="w-5 h-5" />}
              required
            />
          </div>

          {showValidation && (
            <div className="bg-gray-50 p-4 rounded-lg space-y-2">
              <ValidationItem
                checked={validation.length}
                text="Mínimo de 8 caracteres"
              />
              <ValidationItem
                checked={validation.number}
                text="Pelo menos um número"
              />
              <ValidationItem
                checked={validation.symbol}
                text="Pelo menos um símbolo especial"
              />
              <ValidationItem
                checked={validation.match}
                text="Senhas coincidem"
              />
            </div>
          )}

<Checkbox
  id="accept-terms"
  label={
    <>
      Eu concordo com os{' '}
      <Link to="/terms" className="text-[#FF66B2] hover:text-[#ff4d9f]">
        Termos de Serviço
      </Link>{' '}
      e{' '}
      <Link to="/privacy" className="text-[#FF66B2] hover:text-[#ff4d9f]">
        Política de Privacidade
      </Link>
    </>
  }
  checked={formData.acceptTerms}
  onChange={(e) => setFormData({ ...formData, acceptTerms: e.target.checked })}
  error={error && !formData.acceptTerms ? 'Você precisa aceitar os termos' : undefined}
/>


          <Button
            type="submit"
            fullWidth
            size="lg"
            loading={loading}
          >
            Criar Conta
          </Button>

          <p className="text-center text-sm text-gray-600">
            Já tem uma conta?{' '}
            <Link to="/login" className="text-[#FF66B2] hover:text-[#ff4d9f] font-medium">
              Entre aqui
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}