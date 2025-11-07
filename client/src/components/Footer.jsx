import { Link } from "react-router-dom";
// Import some social icons
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

const Footer = () => {
  // You can put your real links here
  const socialLinks = [
    {
      href: "https://twitter.com",
      icon: <FaTwitter className="h-5 w-5" />,
      label: "Twitter",
    },
    {
      href: "https://github.com",
      icon: <FaGithub className="h-5 w-5" />,
      label: "GitHub",
    },
    {
      href: "https://linkedin.com",
      icon: <FaLinkedin className="h-5 w-5" />,
      label: "LinkedIn",
    },
  ];

  return (
    
    <footer className="bg-gray-800 text-gray-400 text-center py-6 shadow-inner mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
       
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          
        
          <p className="text-sm text-center md:text-left">
            © {new Date().getFullYear()}{" "}
            
            <Link
              to="/"
              className="font-semibold text-gray-300 hover:text-indigo-400 cursor-pointer transition-colors duration-300"
            >
              www.taskmanagement.com
            </Link>{" "}
            — All rights reserved.
          </p>

          <div className="flex space-x-6">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank" // Open in a new tab
                rel="noopener noreferrer" // Security best practice
                aria-label={link.label} // Good for accessibility
                className="hover:text-indigo-400 transition-colors duration-300"
              >
                {link.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;