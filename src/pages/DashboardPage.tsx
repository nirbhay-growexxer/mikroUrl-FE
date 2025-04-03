import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

// Sample data for the dashboard
const sampleData = {
  totalLinks: 156,
  totalClicks: 2847,
  activeLinks: 143,
  conversionRate: 68.5,
  recentLinks: [
    {
      id: 1,
      originalUrl: 'https://example.com/very/long/url/that/needs/shortening',
      shortUrl: 'mikro.url/abc123',
      clicks: 145,
      createdAt: '2023-12-20',
    },
    {
      id: 2,
      originalUrl: 'https://another-example.com/blog/post/12345',
      shortUrl: 'mikro.url/def456',
      clicks: 89,
      createdAt: '2023-12-19',
    },
    {
      id: 3,
      originalUrl: 'https://yet-another-example.com/products',
      shortUrl: 'mikro.url/ghi789',
      clicks: 234,
      createdAt: '2023-12-18',
    },
  ],
  clicksOverTime: [
    { date: '2023-12-14', clicks: 156 },
    { date: '2023-12-15', clicks: 235 },
    { date: '2023-12-16', clicks: 187 },
    { date: '2023-12-17', clicks: 298 },
    { date: '2023-12-18', clicks: 345 },
    { date: '2023-12-19', clicks: 289 },
    { date: '2023-12-20', clicks: 376 },
  ],
};

const DashboardPage = () => {
  const { user } = useSelector((state: RootState) => state.auth);

  return (
    <div className='min-h-screen bg-gray-50'>
      {/* Navigation */}
      <nav className='bg-white shadow-sm'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex justify-between h-16'>
            <div className='flex'>
              <Link
                to='/'
                className='flex items-center px-2 text-xl font-bold text-indigo-600'
              >
                MikroUrl
              </Link>
            </div>
            <div className='flex items-center space-x-4'>
              <span className='text-gray-700'>Welcome, {user?.name}</span>
              <Link
                to='/profile'
                className='text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium'
              >
                Profile
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Dashboard Content */}
      <main className='max-w-7xl mx-auto py-6 sm:px-6 lg:px-8'>
        {/* Stats Overview */}
        <div className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4'>
          {/* Total Links */}
          <div className='bg-white overflow-hidden shadow rounded-lg'>
            <div className='p-5'>
              <div className='flex items-center'>
                <div className='flex-shrink-0'>
                  <svg
                    className='h-6 w-6 text-gray-400'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1'
                    />
                  </svg>
                </div>
                <div className='ml-5 w-0 flex-1'>
                  <dl>
                    <dt className='text-sm font-medium text-gray-500 truncate'>
                      Total Links
                    </dt>
                    <dd className='flex items-baseline'>
                      <div className='text-2xl font-semibold text-gray-900'>
                        {sampleData.totalLinks}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          {/* Total Clicks */}
          <div className='bg-white overflow-hidden shadow rounded-lg'>
            <div className='p-5'>
              <div className='flex items-center'>
                <div className='flex-shrink-0'>
                  <svg
                    className='h-6 w-6 text-gray-400'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122'
                    />
                  </svg>
                </div>
                <div className='ml-5 w-0 flex-1'>
                  <dl>
                    <dt className='text-sm font-medium text-gray-500 truncate'>
                      Total Clicks
                    </dt>
                    <dd className='flex items-baseline'>
                      <div className='text-2xl font-semibold text-gray-900'>
                        {sampleData.totalClicks}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          {/* Active Links */}
          <div className='bg-white overflow-hidden shadow rounded-lg'>
            <div className='p-5'>
              <div className='flex items-center'>
                <div className='flex-shrink-0'>
                  <svg
                    className='h-6 w-6 text-gray-400'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
                    />
                  </svg>
                </div>
                <div className='ml-5 w-0 flex-1'>
                  <dl>
                    <dt className='text-sm font-medium text-gray-500 truncate'>
                      Active Links
                    </dt>
                    <dd className='flex items-baseline'>
                      <div className='text-2xl font-semibold text-gray-900'>
                        {sampleData.activeLinks}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          {/* Conversion Rate */}
          <div className='bg-white overflow-hidden shadow rounded-lg'>
            <div className='p-5'>
              <div className='flex items-center'>
                <div className='flex-shrink-0'>
                  <svg
                    className='h-6 w-6 text-gray-400'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='M13 7h8m0 0v8m0-8l-8 8-4-4-6 6'
                    />
                  </svg>
                </div>
                <div className='ml-5 w-0 flex-1'>
                  <dl>
                    <dt className='text-sm font-medium text-gray-500 truncate'>
                      Conversion Rate
                    </dt>
                    <dd className='flex items-baseline'>
                      <div className='text-2xl font-semibold text-gray-900'>
                        {sampleData.conversionRate}%
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Links Table */}
        <div className='mt-8'>
          <div className='bg-white shadow rounded-lg'>
            <div className='px-4 py-5 sm:px-6'>
              <h2 className='text-lg font-medium text-gray-900'>
                Recent Links
              </h2>
            </div>
            <div className='flex flex-col'>
              <div className='-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
                <div className='py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8'>
                  <div className='overflow-hidden'>
                    <table className='min-w-full divide-y divide-gray-200'>
                      <thead className='bg-gray-50'>
                        <tr>
                          <th
                            scope='col'
                            className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                          >
                            Original URL
                          </th>
                          <th
                            scope='col'
                            className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                          >
                            Short URL
                          </th>
                          <th
                            scope='col'
                            className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                          >
                            Clicks
                          </th>
                          <th
                            scope='col'
                            className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                          >
                            Created
                          </th>
                        </tr>
                      </thead>
                      <tbody className='bg-white divide-y divide-gray-200'>
                        {sampleData.recentLinks.map((link) => (
                          <tr key={link.id}>
                            <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                              <div className='truncate max-w-xs'>
                                {link.originalUrl}
                              </div>
                            </td>
                            <td className='px-6 py-4 whitespace-nowrap text-sm text-indigo-600'>
                              {link.shortUrl}
                            </td>
                            <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                              {link.clicks}
                            </td>
                            <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                              {link.createdAt}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
