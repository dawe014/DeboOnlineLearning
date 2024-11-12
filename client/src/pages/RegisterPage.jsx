import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import axios from 'axios';
import { Alert } from 'flowbite-react'; // Import Flowbite's Alert component

export default function RegisterPage() {
  return (
    <div>
      <Header />
      <Register />
    </div>
  );
}

function Register() {
  const [name, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    console.log(password, confirmPassword)
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setSuccess('');
      return;
    }

    // Clear previous errors
    setError('');

    // Create the registration data object
    const registrationData = {
      name,
      email,
      password,
    };

    try {
      // Make API call to register user
      const response = await axios.post(
        'http://localhost:3000/api/v1/users/register',
        registrationData,
      );

      if (response.status === 201) {
        // Display success message and redirect to login page after a delay
        setSuccess('Registration successful! Redirecting to login...');
        setTimeout(() => {
          navigate('/login');
        }, 3000); // Redirect after 3 seconds
      }
    } catch (error) {
      // Handle errors (e.g., user already exists)
      console.error('Error registering:', error.response);
      setError(`Registration failed. ${error.response.data.message}`);
      setSuccess('');
    }
  };

  return (
    <section className="bg-white font-poppins">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="relative flex items-end px-4 pb-10 pt-60 sm:pb-16 md:justify-center lg:pb-24 bg-gray-50 sm:px-6 lg:px-8">
          <div className="absolute inset-0">
            <img
              className="object-cover w-full h-full"
              src="/girl.jpg"
              alt=""
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
          <div className="relative lg:-top-10">
            <div className="w-full max-w-xl xl:w-full xl:mx-auto xl:my-auto xl:pr-24 xl:max-w-xl">
              <h3 className="text-4xl font-bold text-white mb-4">
                Unlock Your Potential.
              </h3>
              <span className="text-lg font-medium text-white">
                Join thousands of learners and take the next step in your
                educational journey today!
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center px-4 py-10 bg-white sm:px-6 lg:px-8 sm:py-16 lg:py-24">
          <div className="xl:w-full xl:max-w-sm 2xl:max-w-md xl:mx-auto">
            <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl">
              Sign up
            </h2>
            <p className="mt-2 text-base text-gray-600">
              Already have an account?{' '}
              <NavLink
                to="/login"
                className="font-medium text-blue-600 transition-all duration-200 hover:text-blue-700 focus:text-blue-700 hover:underline"
              >
                Login
              </NavLink>
            </p>

            {/* Display error alert if there's an error */}
            {error && (
              <Alert
                color="failure"
                onDismiss={() => setError('')}
                className="my-4"
              >
                {error}
              </Alert>
            )}

            {/* Display success alert if registration is successful */}
            {success && (
              <Alert
                color="success"
                onDismiss={() => setSuccess('')}
                className="my-4"
              >
                {success}
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="mt-8">
              <div className="space-y-5">
                <div>
                  <label className="text-base font-medium text-gray-900">
                    Full name
                  </label>
                  <div className="mt-2.5">
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Enter your full name"
                      className="block w-full py-4 pl-4 pr-4 text-black placeholder-gray-500 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-blue-600 focus:bg-white"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="text-base font-medium text-gray-900">
                    Email address
                  </label>
                  <div className="mt-2.5">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="block w-full py-4 pl-4 pr-4 text-black placeholder-gray-500 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-blue-600 focus:bg-white"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="text-base font-medium text-gray-900">
                    Password
                  </label>
                  <div className="mt-2.5">
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      className="block w-full py-4 pl-4 pr-4 text-black placeholder-gray-500 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-blue-600 focus:bg-white"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="text-base font-medium text-gray-900">
                    Confirm Password
                  </label>
                  <div className="mt-2.5">
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm your password"
                      className="block w-full py-4 pl-4 pr-4 text-black placeholder-gray-500 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-blue-600 focus:bg-white"
                      required
                    />
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center w-full px-4 py-4 text-base font-semibold text-white bg-gradient-to-r from-fuchsia-600 to-blue-600 border border-transparent rounded-md focus:outline-none hover:opacity-80 focus:opacity-80"
                  >
                    Sign up
                  </button>
                </div>
              </div>
            </form>

            <div className="mt-3 space-y-3">
              <button
                type="button"
                className="relative inline-flex items-center justify-center w-full px-4 py-4 text-base font-semibold text-gray-700 bg-white border-2 border-gray-200 rounded-md hover:bg-gray-100 focus:bg-gray-100 hover:text-black focus:text-black focus:outline-none"
              >
                <svg
                  className="w-6 h-6 text-rose-500 absolute left-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M20.283 10.356h-8.327v3.451h4.792c-.446 2.193-2.313 3.453-4.792 3.453a5.27 5.27 0 0 1-5.279-5.28 5.27 5.27 0 0 1 5.279-5.279c1.259 0 2.397.447 3.29 1.178l2.6-2.599c-1.584-1.381-3.615-2.233-5.89-2.233a8.908 8.908 0 0 0-8.934 8.934 8.907 8.907 0 0 0 8.934 8.934c4.45 0 8.759-3.207 8.759-8.934 0-.607-.065-1.197-.186-1.763z"></path>
                </svg>
                Sign up with Google
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
