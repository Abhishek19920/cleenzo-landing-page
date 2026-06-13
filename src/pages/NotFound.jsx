import { Link } from "react-router-dom";

function NotFound() {
  return (
    <section className="min-h-[70vh] flex items-center justify-center bg-cleenzo-deeper text-white px-6 py-20">
      <div className="max-w-lg text-center">
        <p className="text-8xl font-black text-cleenzo-sky mb-4">404</p>
        <h1 className="text-3xl md:text-4xl font-black mb-4">Page not found</h1>
        <p className="text-cleenzo-pale text-lg mb-8 leading-relaxed">
          This link doesn&apos;t exist or may have moved. Head back home or
          download the Cleenzo app.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="bg-white text-cleenzo font-bold px-8 py-4 rounded-2xl hover:scale-105 transition"
          >
            Go to homepage
          </Link>
          <a
            href="/#download"
            className="bg-[#25D366] text-white font-bold px-8 py-4 rounded-2xl hover:bg-[#1fb855] transition"
          >
            Download the app
          </a>
        </div>
      </div>
    </section>
  );
}

export default NotFound;
