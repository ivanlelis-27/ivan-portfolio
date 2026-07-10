import { FaLinkedin, FaGithub, FaBehance } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-black py-10 border-t border-white/10 text-center">
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between">
        <p className="text-gray-500 text-sm">
          © {new Date().getFullYear()} Ezekiel Ivan T. Lelis. All rights reserved.
        </p>
        <div className="flex items-center gap-6 mt-4 md:mt-0">
          <a href="https://www.linkedin.com/in/ezekiel-ivan-l-bb792532b" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-transform hover:-translate-y-1 interactive" title="LinkedIn">
            <FaLinkedin className="w-5 h-5" />
          </a>
          <a href="https://github.com/ivanlelis-27" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-transform hover:-translate-y-1 interactive" title="GitHub">
            <FaGithub className="w-5 h-5" />
          </a>
          <a href="https://www.behance.net/ezekielivanlelis" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-transform hover:-translate-y-1 interactive" title="Behance">
            <FaBehance className="w-6 h-6" />
          </a>
        </div>
      </div>
    </footer>
  );
}
