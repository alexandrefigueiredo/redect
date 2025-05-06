export function Banner() {
  return (
    <div className="relative bg-indigo-800">
      <div className="absolute inset-0">
        <img
          className="w-full h-full object-cover"
          src="https://images.unsplash.com/photo-1522071820081-009f0129c71c"
          alt="Banner"
        />
        <div className="absolute inset-0 bg-indigo-800 mix-blend-multiply" />
      </div>
      <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
          Bem-vindo à Rede CT
        </h1>
        <p className="mt-6 text-xl text-indigo-100 max-w-3xl">
          Conectando pessoas e ideias para transformar o futuro da tecnologia.
          Junte-se à nossa comunidade de inovadores e desenvolvedores.
        </p>
      </div>
    </div>
  );
} 