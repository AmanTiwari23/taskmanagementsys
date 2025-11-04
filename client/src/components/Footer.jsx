const Footer = () => {
  return (
    <>
      <footer className="bg-linear-to-r from-indigo-600 via-indigo-700 to-indigo-800 text-white text-center py-5 shadow-inner border-t border-indigo-500/30">
        <p className="text-sm md:text-base font-medium tracking-wide opacity-90 hover:opacity-100 transition-opacity duration-300">
          © {new Date().getFullYear()}{" "}
          <span className="font-semibold text-white hover:text-indigo-200 cursor-pointer transition-colors duration-300">
            www.taskmanagement.com
          </span>{" "}
          — All rights reserved.
        </p>
      </footer>
    </>
  );
};

export default Footer;
