
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FeedbackButton from "@/components/FeedbackButton";
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow py-8">
        {children}
      </main>
      <Footer />
      <FeedbackButton />
    </div>
  );
};

export default Layout;
