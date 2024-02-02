import Navbar from "./_components/navbar";
import OrgSidebar from "./_components/org-siderbar";
import SideBar from "./_components/sidebar";

interface DashboardLayoutProps {
    children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
    return (
        <main className="h-full lg:h-screen">
            <SideBar />
            <div className="pl-[60px] h-full">
                <div className='flex gap-3 h-full'>
                    <OrgSidebar />
                    <div className="flex-1 h-full">
                        <Navbar/>
                        {children}
                    </div>
                </div>
                
            </div>
            
        </main>
    )
}