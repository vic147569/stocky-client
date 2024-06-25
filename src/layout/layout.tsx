import AppFooter from '@/Components/AppFooter';
import AppHeader from '@/Components/AppHeader';

const Layout = ({ children }: { children: React.ReactNode }) => (
  <div className=" flex flex-col min-h-screen">
    <AppHeader />
    <main className=" container mx-auto flex-1 py-10 flex my-auto">{children}</main>
    <AppFooter />
  </div>
);

export default Layout;
