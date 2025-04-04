import React, {useState} from 'react';
import {useAuthstore} from '../store/useAuthStore';
import {Eye, EyeOff, Loader2, Lock, Mail, Wallet, User} from 'lucide-react';
import {Link, useNavigate} from 'react-router-dom';
import toast from 'react-hot-toast';

const SignupPage = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    profilePic: '',
  });

  const {signup, isSigningUp} = useAuthstore();

  const validateForm = () => {
    if (!formData.fullName.trim())
      return toast.error('Fullname is required', {
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      });

    if (!formData.email.trim())
      return toast.error('email is required', {
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      });

    if (!/\S+@\S+\.\S+/.test(formData.email))
      return toast.error('Invalid email', {
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      });

    if (!formData.password)
      return toast.error('password is required', {
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      });

    if (formData.password.length < 6)
      return toast.error('Password must at least 6 charachters', {
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      });

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const success = validateForm();

    if (success === true) {
      signup(formData)
        .then(() => {
          navigate('/signup/income');
        })
        .catch((err) => {
          console.error('Signup error:', err);
          toast.error('Signup failed. Please try again.');
        });
    }
  };

  return (
    <div className='min-h-screen grid lg:grid-cols-2'>
      {/* left side */}
      <div className='flex flex-col justify-center items-center p-6 sm:p-12'>
        <div className='w-full max-w-md space-y-8'>
          {/* LOGO */}
          <div className='text-center mb-8'>
            <div className='flex flex-col items-center gap-2 group'>
              <div
                className='size-12 rounded-xl bg-primary/10 flex items-center justify-center 
              group-hover:bg-primary/20 transition-colors'
              >
                <Wallet className='size-6 text-primary' />
              </div>
              <h1 className='text-2xl font-bold mt-2'>Create Account</h1>
              <p className='text-base-content/60'>
                Get started with your free account
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className='space-y-6'>
            <div className='form-control'>
              <label className='label'>
                <span className='label-text font-medium'>Full Name</span>
              </label>
              <div className='relative'>
                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                  <User className='size-5 text-base-content/40' />
                </div>
                <input
                  type='text'
                  className={`input input-bordered w-full pl-10`}
                  placeholder='John Doe'
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({...formData, fullName: e.target.value})
                  }
                />
              </div>
            </div>

            <div className='form-control'>
              <label className='label'>
                <span className='label-text font-medium'>Email</span>
              </label>
              <div className='relative'>
                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                  <Mail className='size-5 text-base-content/40' />
                </div>
                <input
                  type='email'
                  className={`input input-bordered w-full pl-10`}
                  placeholder='you@example.com'
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({...formData, email: e.target.value})
                  }
                />
              </div>
            </div>

            <div className='form-control'>
              <label className='label'>
                <span className='label-text font-medium'>Password</span>
              </label>
              <div className='relative'>
                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                  <Lock className='size-5 text-base-content/40' />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  className={`input input-bordered w-full pl-10`}
                  placeholder='••••••••'
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({...formData, password: e.target.value})
                  }
                />
                <button
                  type='button'
                  className='absolute inset-y-0 right-0 pr-3 flex items-center'
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className='size-5 text-base-content/40' />
                  ) : (
                    <Eye className='size-5 text-base-content/40' />
                  )}
                </button>
              </div>
            </div>

            <button
              type='submit'
              className='btn btn-primary w-full'
              disabled={isSigningUp}
            >
              {isSigningUp ? (
                <>
                  <Loader2 className='size-5 animate-spin' />
                  Loading...
                </>
              ) : (
                'Create Account'
              )}
            </button>
          </form>

          <div className='text-center'>
            <p className='text-base-content/60'>
              Already have an account?{' '}
              <Link to='/login' className='link link-primary'>
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* right side */}

      <div className='hidden lg:block relative overflow-hidden bg-gray-900'>
        <img
          src='https://images.unsplash.com/photo-1553729459-efe14ef6055d?auto=format&fit=crop&w=2000&q=80'
          alt='Financial dashboard'
          className='h-full w-full object-cover transition-transform duration-700 hover:scale-105'
        />
        <div className='absolute inset-0 bg-black/40' />
        <div className='absolute bottom-8 left-8 text-white'>
          <h2 className='text-3xl font-bold mb-2'>
            Track Your Financial Journey
          </h2>
          <p className='text-lg text-white/80'>
            Smart decisions begin with clear insights
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
