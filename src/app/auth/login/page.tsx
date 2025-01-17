'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/Button';
import { PulseAnimation } from '@/components/ui/PulseAnimation';
import Cookies from 'js-cookie';
import { FiHeart } from 'react-icons/fi';

interface FormData {
  username: string;
  password: string;
  rememberMe: boolean;
}

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    username: '',
    password: '',
    rememberMe: false
  });
  const [error, setError] = useState('');

  useEffect(() => {
    // Aktif oturum kontrolü
    const authToken = Cookies.get('auth_token') || localStorage.getItem('auth_token');
    if (authToken === 'logged_in') {
      router.push('/dashboard');
      router.refresh();
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Login tablosundan kullanıcı kontrolü
      const { data: loginData, error: loginError } = await supabase
        .from('login')
        .select('*')
        .eq('username', formData.username)
        .eq('password', formData.password)
        .single();

      if (loginError || !loginData) {
        setError('Geçersiz kullanıcı adı veya şifre');
        setIsLoading(false);
        return;
      }

      // Beni hatırla
      if (formData.rememberMe) {
        localStorage.setItem('rememberedUser', formData.username);
      } else {
        localStorage.removeItem('rememberedUser');
      }

      // Oturum bilgilerini kaydet
      Cookies.set('auth_token', 'logged_in', { expires: 7 }); // 7 gün geçerli
      localStorage.setItem('auth_token', 'logged_in');
      localStorage.setItem('user', JSON.stringify({
        username: loginData.username,
        isLoggedIn: true,
        loginTime: new Date().toISOString()
      }));

      toast.success('Giriş başarılı');
      
      // Yönlendirme
      router.push('/dashboard');
      router.refresh();

    } catch (error) {
      console.error('Giriş hatası:', error);
      setError('Giriş yapılırken bir hata oluştu');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900">
      <PulseAnimation />

      <div className="bg-white/10 backdrop-blur-lg p-8 rounded-lg shadow-lg w-full max-w-md relative z-10">
        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-blue-400 mb-2 tracking-wider text-center flex items-center justify-center">
          <FiHeart className="mr-2 text-blue-400 animate-pulse" />
          Pulse<span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text">ERP</span>
        </h1>
        <p className="text-gray-400 text-center mb-8">Kurumsal Kaynak Planlama Sistemi</p>

        {error && (
          <div className="mb-4 p-3 rounded bg-red-500/20 text-red-100 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-white">
              Kullanıcı Adı
            </label>
            <input
              type="text"
              id="username"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              className="mt-1 block w-full rounded-md bg-white/5 border border-white/10 text-white shadow-sm focus:border-white/30 focus:ring focus:ring-white/20"
              required
              disabled={isLoading}
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-white">
              Şifre
            </label>
            <input
              type="password"
              id="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="mt-1 block w-full rounded-md bg-white/5 border border-white/10 text-white shadow-sm focus:border-white/30 focus:ring focus:ring-white/20"
              required
              disabled={isLoading}
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="rememberMe"
              checked={formData.rememberMe}
              onChange={(e) => setFormData({ ...formData, rememberMe: e.target.checked })}
              className="h-4 w-4 rounded border-white/10 bg-white/5 text-blue-500 focus:ring-white/20"
              disabled={isLoading}
            />
            <label htmlFor="rememberMe" className="ml-2 block text-sm text-white">
              Beni Hatırla
            </label>
          </div>

          <Button 
            type="submit" 
            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
            disabled={isLoading}
          >
            {isLoading ? 'Giriş yapılıyor...' : 'Giriş Yap'}
          </Button>
        </form>
      </div>
    </div>
  );
}