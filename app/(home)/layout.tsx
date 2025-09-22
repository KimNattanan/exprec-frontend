import NavigateBar from "@/components/NavigateBar";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {  
  return (
    <>
      <NavigateBar/>
      {children}
    </>
  );
}
