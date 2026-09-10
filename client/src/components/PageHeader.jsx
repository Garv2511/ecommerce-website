function PageHeader({ title, subtitle, children }) {
  return (
    <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
          <div>
            <h1 className="text-4xl font-bold">
              {title}
            </h1>

            {subtitle && (
              <p className="mt-2 text-white/80">
                {subtitle}
              </p>
            )}
          </div>

          {children}
        </div>
      </div>
    </section>
  );
}

export default PageHeader;