import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

const LandingPage = () => {
  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.auth
  );

  return (
    <div className='min-h-screen bg-gray-50'>
      {/* Navbar */}
      <nav className='bg-white shadow-sm'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex justify-between h-16'>
            <div className='flex'>
              <Link
                to='/'
                className='flex items-center px-2 text-xl font-bold text-indigo-600'
                aria-label='Home'
                tabIndex={0}
              >
                MikroUrl
              </Link>
            </div>

            <div className='flex items-center space-x-4'>
              {isAuthenticated ? (
                <>
                  <span className='text-gray-700 text-sm font-medium'>
                    Welcome, {user?.name || 'User'}
                  </span>
                  <Link
                    to='/dashboard'
                    className='inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-600 bg-indigo-50 hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                    aria-label='Dashboard'
                    tabIndex={0}
                  >
                    Dashboard
                  </Link>
                  <Link
                    to='/profile'
                    className='inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                    aria-label='View Profile'
                    tabIndex={0}
                  >
                    Profile
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to='/login'
                    className='inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-600 bg-indigo-50 hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                    aria-label='Sign in'
                    tabIndex={0}
                  >
                    Sign in
                  </Link>
                  <Link
                    to='/signup'
                    className='inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                    aria-label='Sign up'
                    tabIndex={0}
                  >
                    Sign up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className='relative bg-white overflow-hidden'>
        <div className='max-w-7xl mx-auto'>
          <div className='relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32'>
            <main className='mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28'>
              <div className='sm:text-center lg:text-left'>
                <h1 className='text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl'>
                  <span className='block'>Shorten URLs.</span>
                  <span className='block text-indigo-600'>
                    Track Performance.
                  </span>
                </h1>
                <p className='mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0'>
                  MikroUrl transforms long URLs into short, memorable links that
                  are easy to share and track. Get powerful analytics and
                  insights on every click.
                </p>
                <div className='mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start'>
                  <div className='rounded-md shadow'>
                    <Link
                      to={isAuthenticated ? '/dashboard' : '/signup'}
                      className='w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                      aria-label={
                        isAuthenticated ? 'Go to dashboard' : 'Get started'
                      }
                      tabIndex={0}
                    >
                      {isAuthenticated ? 'Go to Dashboard' : 'Get Started Free'}
                    </Link>
                  </div>
                  <div className='mt-3 sm:mt-0 sm:ml-3'>
                    <a
                      href='#features'
                      className='w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 md:py-4 md:text-lg md:px-10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                      aria-label='Learn more about features'
                      tabIndex={0}
                    >
                      Learn More
                    </a>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
        <div className='lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2'>
          <img
            className='h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full'
            src='https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80'
            alt='Analytics dashboard'
          />
        </div>
      </div>

      {/* Features Section */}
      <div id='features' className='py-12 bg-white'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='lg:text-center'>
            <h2 className='text-base text-indigo-600 font-semibold tracking-wide uppercase'>
              Features
            </h2>
            <p className='mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl'>
              Everything you need in a URL shortener
            </p>
            <p className='mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto'>
              MikroUrl provides powerful tools to create, manage and analyze
              your shortened links.
            </p>
          </div>

          <div className='mt-10'>
            <div className='space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10'>
              <div className='relative'>
                <div className='absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-6 w-6'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101'
                    />
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M14.828 14.828a4 4 0 015.656 0l4 4a4 4 0 01-5.656 5.656l-1.102-1.101'
                    />
                  </svg>
                </div>
                <div className='ml-16'>
                  <h3 className='text-lg leading-6 font-medium text-gray-900'>
                    URL Shortening
                  </h3>
                  <p className='mt-2 text-base text-gray-500'>
                    Transform long URLs into short, memorable links that are
                    easy to share and track.
                  </p>
                </div>
              </div>

              <div className='relative'>
                <div className='absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-6 w-6'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z'
                    />
                  </svg>
                </div>
                <div className='ml-16'>
                  <h3 className='text-lg leading-6 font-medium text-gray-900'>
                    Advanced Analytics
                  </h3>
                  <p className='mt-2 text-base text-gray-500'>
                    Get detailed insights on clicks, geographic location,
                    devices, referrers and more.
                  </p>
                </div>
              </div>

              <div className='relative'>
                <div className='absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-6 w-6'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4'
                    />
                  </svg>
                </div>
                <div className='ml-16'>
                  <h3 className='text-lg leading-6 font-medium text-gray-900'>
                    Customization
                  </h3>
                  <p className='mt-2 text-base text-gray-500'>
                    Create custom branded links with your own domain and
                    customize link aliases.
                  </p>
                </div>
              </div>

              <div className='relative'>
                <div className='absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-6 w-6'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z'
                    />
                  </svg>
                </div>
                <div className='ml-16'>
                  <h3 className='text-lg leading-6 font-medium text-gray-900'>
                    Security & Privacy
                  </h3>
                  <p className='mt-2 text-base text-gray-500'>
                    Set password protection, expiration dates, and control who
                    can access your links.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className='bg-indigo-700'>
        <div className='max-w-2xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8'>
          <h2 className='text-3xl font-extrabold text-white sm:text-4xl'>
            <span className='block'>Boost your link performance.</span>
            <span className='block'>Start using MikroUrl today.</span>
          </h2>
          <p className='mt-4 text-lg leading-6 text-indigo-100'>
            Join thousands of marketers, content creators, and businesses who
            use MikroUrl to track and optimize their links.
          </p>
          <Link
            to={isAuthenticated ? '/dashboard' : '/signup'}
            className='mt-8 w-full inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50 sm:w-auto focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-700 focus:ring-white'
            aria-label={
              isAuthenticated ? 'Go to dashboard' : 'Sign up for free'
            }
            tabIndex={0}
          >
            {isAuthenticated ? 'Go to Dashboard' : 'Sign up for free'}
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className='bg-white'>
        <div className='max-w-7xl mx-auto py-12 px-4 overflow-hidden sm:px-6 lg:px-8'>
          <nav
            className='-mx-5 -my-2 flex flex-wrap justify-center'
            aria-label='Footer'
          >
            <div className='px-5 py-2'>
              <a
                href='#'
                className='text-base text-gray-500 hover:text-gray-900'
              >
                About
              </a>
            </div>
            <div className='px-5 py-2'>
              <a
                href='#'
                className='text-base text-gray-500 hover:text-gray-900'
              >
                Features
              </a>
            </div>
            <div className='px-5 py-2'>
              <a
                href='#'
                className='text-base text-gray-500 hover:text-gray-900'
              >
                Pricing
              </a>
            </div>
            <div className='px-5 py-2'>
              <a
                href='#'
                className='text-base text-gray-500 hover:text-gray-900'
              >
                API
              </a>
            </div>
            <div className='px-5 py-2'>
              <a
                href='#'
                className='text-base text-gray-500 hover:text-gray-900'
              >
                Support
              </a>
            </div>
          </nav>
          <p className='mt-8 text-center text-base text-gray-400'>
            &copy; 2023 MikroUrl, Inc. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
