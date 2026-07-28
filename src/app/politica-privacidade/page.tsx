import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export default function PoliticaPrivacidade() {
  return (
    <main className="bg-stone-50 min-h-screen">
      <Header />
      
      {/* Dark Hero Area for Header Contrast */}
      <div className="bg-ink pt-40 pb-24 px-6">
        <div className="container-custom max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-black text-paper uppercase tracking-tighter mb-4">
            Política de Privacidade
          </h1>
          <p className="text-paper/60 text-sm tracking-widest uppercase">
            Última atualização: Julho de 2026
          </p>
        </div>
      </div>

      <div className="container-custom pb-20 max-w-4xl mx-auto px-6">
        <div className="space-y-10 text-stone-600 leading-relaxed font-sans text-base md:text-lg bg-white p-8 md:p-12 rounded-2xl shadow-xl -mt-12 relative z-10 border border-stone-100">
          
          <section>
            <h2 className="text-2xl font-bold text-ink mb-4">1. Coleta de Dados</h2>
            <p>
              A Única Impermeabilização e Pisos Especiais coleta informações pessoais fornecidas por você através do nosso formulário de contato e orçamentos, como nome, e-mail, telefone e informações sobre sua obra, para responder às suas solicitações e prestar nossos serviços.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-ink mb-4">2. Uso das Informações</h2>
            <p>
              As informações coletadas são utilizadas exclusivamente para fins de atendimento comercial, elaboração de propostas técnicas e orçamentos. Não compartilhamos, vendemos ou alugamos seus dados para terceiros.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-ink mb-4">3. Proteção de Dados (LGPD)</h2>
            <p>
              Em conformidade com a Lei Geral de Proteção de Dados (Lei nº 13.709/2018), garantimos a segurança dos seus dados armazenados em nosso sistema. Você tem o direito de solicitar a exclusão, portabilidade ou modificação dos seus dados a qualquer momento entrando em contato conosco.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-ink mb-4">4. Cookies</h2>
            <p>
              Nosso site utiliza cookies básicos apenas para análise de tráfego e melhoria da experiência do usuário, sem rastrear informações confidenciais ou sensíveis. Ao continuar navegando, você consente com o uso destes cookies essenciais.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-ink mb-4">5. Contato</h2>
            <p>
              Caso tenha dúvidas sobre nossa política de privacidade, entre em contato através do e-mail oficial (contato@unicaimper.com.br) ou pelo nosso WhatsApp disponibilizado no site.
            </p>
          </section>

        </div>
      </div>

      <Footer />
    </main>
  );
}
