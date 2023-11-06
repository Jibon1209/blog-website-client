import { Footer } from "flowbite-react";

const FooterN = () => {
  return (
    <Footer container className="mt-20 bg-[#f4f8f7]">
      <div className="w-full text-center">
        <div className="w-full justify-between sm:flex sm:items-center sm:justify-between">
          <Footer.Title
            title="BLOGTREKKER"
            className="self-center text-accent whitespace-nowrap text-xl font-extrabold dark:text-white"
          ></Footer.Title>
          <Footer.LinkGroup className="text-black gap-1 font-bold">
            <Footer.Link href="#">About</Footer.Link>
            <Footer.Link href="#">Privacy Policy</Footer.Link>
            <Footer.Link href="#">Licensing</Footer.Link>
            <Footer.Link href="#">Contact</Footer.Link>
          </Footer.LinkGroup>
        </div>
        <Footer.Divider />
        <Footer.Copyright
          className="text-accent font-semibold"
          href="/"
          by="BLOGTREKKER"
          year={2023}
        />
      </div>
    </Footer>
  );
};

export default FooterN;
