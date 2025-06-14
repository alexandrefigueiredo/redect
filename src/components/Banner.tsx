export function Banner() {
  return (
    <div className="relative bg-[#BE382A]">
      <div className="absolute inset-0">
        <img
          className="w-full h-full object-cover"
          src="https://jornal.usp.br/wp-content/uploads/2022/12/20221205_00_jogos_indigenas_brasil.jpg"
          alt="Banner"
        />
        <div className="absolute inset-0 bg-[#BE382A] mix-blend-multiply" />
      </div>
      <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
          Bem-vindo à Rede CT
        </h1>
        <p className="mt-6 text-xl text-white/90 max-w-3xl">
          Conectando pessoas e ideias para transformar o futuro da tecnologia.
          Junte-se à nossa comunidade de inovadores e desenvolvedores.
        </p>
      </div>
    </div>
  );
} 