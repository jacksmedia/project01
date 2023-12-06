import { AuthRedirectWrapper, PageWrapper } from 'wrappers';
import { Transaction } from './Transaction';
import { Button } from 'components/Button';
import { MxLink } from 'components/MxLink';
import { environment } from 'config';
import { logout } from 'helpers';
import { useGetIsLoggedIn } from 'hooks';
import { RouteNamesEnum } from 'localConstants';

export const Home = () => {
  const isLoggedIn = useGetIsLoggedIn();

  const handleLogout = () => {
    sessionStorage.clear();
    logout(`${window.location.origin}/unlock`, undefined, false);
  };

  return (
    <AuthRedirectWrapper requireAuth={false}>
      <PageWrapper>
        <div className='flex flex-col-reverse sm:flex-row items-center h-full w-full'>
          <div className='flex items-start sm:items-center h-full sm:w-1/2 sm:bg-center'>
            <div className='flex flex-col gap-2 max-w-[70sch] text-center sm:text-left text-xl font-medium md:text-2xl lg:text-3xl'>
              <div>
                <h1 className='font-bold'>embraly</h1>
                <p className='text-gray-400'>
                  The wallet download dapp for{' '}
                  <a
                    href='https://multiversx.com/'
                    target='_blank'
                    className='text-gray-400 underline decoration-dotted hover:decoration-solid'
                  >
                    MultiversX
                  </a>{' '}
                  <br className='hidden xl:block' />
                  from{' '}
                  <a
                    href='https://multiconomy.com/'
                    target='_blank'
                    className='text-gray-400 underline decoration-dotted hover:decoration-solid'
                  >
                    Multiconomy
                  </a>{' '}
                  .
                </p>
              </div>
              {/* dummied out for now
              <Transaction />
              adding identical Button that appears in Header.tsx instead
              */}
              <div>
                {isLoggedIn ? (
                  <Button
                    onClick={handleLogout}
                    className='inline-block bg-black rounded-lg px-3 py-2 text-center hover:no-underline my-0 text-gray-600 hover:bg-slate-100 mx-0'
                  >
                    Close
                  </Button>
                ) : (
                  <MxLink to={RouteNamesEnum.unlock}>Connect</MxLink>
                )}
              </div>
            </div>
          </div>
          <div className='h-4/6 bg-mvx-white bg-contain bg-no-repeat w-1/2 bg-center' />
        </div>
      </PageWrapper>
    </AuthRedirectWrapper>
  );
};
