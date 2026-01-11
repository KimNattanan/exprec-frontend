import NavigateBar from "./_components/NavigateBar";

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
