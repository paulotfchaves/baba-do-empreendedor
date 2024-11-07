import { useState } from 'react';
import { Mail, Phone, Globe, Lock, Settings, Camera, User } from 'lucide-react';
import Button from '../components/shared/Button';
import { Input, FormLabel } from '../components/shared/FormStyles';

export default function Profile() {
  const [formData, setFormData] = useState({
    name: 'John Doe',
    jobTitle: 'Entrepreneur & Business Owner',
    email: 'john.doe@example.com',
    phone: '+55 11 98765-4321',
    website: 'www.johndoe.com',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement profile update logic
  };

  return (
      <div className="max-w-2xl mx-auto px-4">

        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="relative h-32 bg-gradient-to-r from-[#FF66B2] to-[#33CCCC]">
            <div className="absolute -bottom-16 left-1/2 -translate-x-1/2">
              <div className="relative">
                <div className="w-32 h-32 rounded-full bg-white p-1">
                  <div className="w-full h-full rounded-full bg-gray-100 flex items-center justify-center">
                    <User className="w-12 h-12 text-gray-400" />
                  </div>
                </div>
                <button className="absolute bottom-0 right-0 p-2 bg-white rounded-full shadow-lg hover:bg-gray-50 transition-colors">
                  <Camera className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>
          </div>

          <div className="pt-20 p-6">
            <div className="text-center mb-8">
              <h2 className="text-xl font-bold text-gray-900">{formData.name}</h2>
              <p className="text-gray-600">{formData.jobTitle}</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <FormLabel htmlFor="name" required>Nome Completo</FormLabel>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
                  leftIcon={<Mail className="w-5 h-5" />}
                  required
                />
              </div>

              <div>
                <FormLabel htmlFor="phone">Telefone</FormLabel>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  leftIcon={<Phone className="w-5 h-5" />}
                />
              </div>

              <div>
                <FormLabel htmlFor="website">Website</FormLabel>
                <Input
                  id="website"
                  type="url"
                  value={formData.website}
                  onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  leftIcon={<Globe className="w-5 h-5" />}
                />
              </div>

              <div className="pt-4 border-t border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Alterar Senha</h3>
                
                <div className="space-y-4">
                  <div>
                    <FormLabel htmlFor="currentPassword">Senha Atual</FormLabel>
                    <Input
                      id="currentPassword"
                      type="password"
                      value={formData.currentPassword}
                      onChange={(e) => setFormData({ ...formData, currentPassword: e.target.value })}
                      leftIcon={<Lock className="w-5 h-5" />}
                    />
                  </div>

                  <div>
                    <FormLabel htmlFor="newPassword">Nova Senha</FormLabel>
                    <Input
                      id="newPassword"
                      type="password"
                      value={formData.newPassword}
                      onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                      leftIcon={<Lock className="w-5 h-5" />}
                    />
                  </div>

                  <div>
                    <FormLabel htmlFor="confirmPassword">Confirmar Nova Senha</FormLabel>
                    <Input
                      id="confirmPassword"
                      type="password"
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                      leftIcon={<Lock className="w-5 h-5" />}
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <Button type="submit">
                  Salvar Alterações
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
  );
}