import Footer from "@/components/Footer";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {  
  return (
    <>
      <div className="
        text-foreground w-full min-h-[calc(100dvh-4rem)]
        xs:px-10
        px-4 pb-4 pt-10">
        {children}
      </div>
      <Footer/>
    </>
  );
}
