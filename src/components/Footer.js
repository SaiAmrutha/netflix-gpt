const Footer = () => {
  return (
    <footer className="pt-5 pb-5 bg-black bg-opacity-90 text-white font-extrabold text-sm text-center">
      Made with ❤ by Amrutha <br />
      Powered by TMDB + Gemini
      <div>
        <a
          className="p-2"
          href="https://github.com/SaiAmrutha"
          target="_blank"
          rel="noreferrer"
        >
          GitHub
        </a>
        <a href="mailto:nsamrutha30@gmail.com">Contact</a>
      </div>
      <p className="mt-2 mb-1 opacity-70">
        © {new Date().getFullYear()} SmartFlix. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
