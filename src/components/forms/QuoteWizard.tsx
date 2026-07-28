"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, CheckCircle2, ChevronRight, ChevronLeft, Building2, MapPin, Ruler, FileText, Camera } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface FormData {
  name: string; email: string; phone: string; cep: string; location: string;
  area_size: string; geometry: string; accessibility: string; infrastructure: string;
  surface_type: string; condition: string; thickness: string; purpose: string; exposure: string;
  details: string; lgpd_consent: boolean;
}

const INITIAL_DATA: FormData = {
  name: "", email: "", phone: "", cep: "", location: "",
  area_size: "", geometry: "", accessibility: "", infrastructure: "",
  surface_type: "", condition: "", thickness: "", purpose: "", exposure: "",
  details: "", lgpd_consent: false,
};

export function QuoteWizard() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(INITIAL_DATA);
  const [photos, setPhotos] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const totalSteps = 4;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      setFormData(prev => ({ ...prev, [name]: (e.target as HTMLInputElement).checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleCepChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");
    
    // Mask CEP
    let formattedCep = value;
    if (value.length > 5) {
      formattedCep = value.replace(/^(\d{5})(\d)/, "$1-$2");
    }
    
    setFormData(prev => ({ ...prev, cep: formattedCep }));

    if (value.length === 8) {
      try {
        const response = await fetch(`https://viacep.com.br/ws/${value}/json/`);
        const data = await response.json();
        if (!data.erro) {
          setFormData(prev => ({
            ...prev,
            location: `${data.logradouro}, Número, ${data.bairro}, ${data.localidade} - ${data.uf}`
          }));
        }
      } catch (error) {
        console.error("Erro ao buscar CEP", error);
      }
    }
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setPhotos(Array.from(e.target.files));
    }
  };

  const nextStep = () => setStep(prev => Math.min(prev + 1, totalSteps));
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step < totalSteps) {
      nextStep();
      return;
    }

    setIsSubmitting(true);

    const payload = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      payload.append(key, value);
    });

    photos.forEach((photo) => {
      payload.append('photos[]', photo);
    });

    try {
      const response = await fetch("http://localhost:8000/api/quotes", {
        method: "POST",
        body: payload,
      });

      if (response.ok) {
        setIsSuccess(true);
      } else {
        alert("Ocorreu um erro ao enviar o orçamento. Tente novamente.");
      }
    } catch (error) {
      console.error(error);
      alert("Falha na comunicação com o servidor.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="bg-white rounded-2xl shadow-xl p-12 text-center max-w-2xl mx-auto border border-stone-100">
        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <h3 className="text-3xl font-black text-ink mb-4">Orçamento Solicitado!</h3>
        <p className="text-stone-500 mb-8 leading-relaxed">
          Nossa equipe de engenharia recebeu todos os detalhes técnicos do seu projeto. 
          Analisaremos as fotos e informações e entraremos em contato o mais rápido possível com uma proposta.
        </p>
        <Button variant="solid" onClick={() => window.location.reload()}>
          Concluir
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-2xl border border-stone-100 max-w-4xl mx-auto overflow-hidden">
      {/* Header/Progress */}
      <div className="bg-stone-50 border-b border-stone-100 p-6 md:p-8 flex items-center justify-between">
        <div>
          <h3 className="font-heading font-bold text-xl md:text-2xl text-ink">Solicitar Orçamento Técnico</h3>
          <p className="text-sm text-stone-500 mt-1">Passo {step} de {totalSteps}</p>
        </div>
        <div className="flex gap-2">
          {[1, 2, 3, 4].map(s => (
            <div key={s} className={`h-2 w-12 md:w-16 rounded-full transition-colors duration-300 ${s <= step ? 'bg-red' : 'bg-stone-200'}`} />
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-6 md:p-10">
        <AnimatePresence mode="wait">
          
          {/* PASSO 1: CONTATO */}
          {step === 1 && (
            <motion.div 
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="flex items-center gap-3 mb-6 text-red">
                <MapPin className="w-6 h-6" />
                <h4 className="text-lg font-bold text-ink">Dados Pessoais e Logística</h4>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-ink mb-2">Nome Completo *</label>
                  <input required name="name" value={formData.name} onChange={handleChange} className="w-full bg-stone-50 border border-stone-200 rounded-lg px-4 py-3 focus:outline-none focus:border-red focus:ring-1 focus:ring-red transition-all" placeholder="Seu nome ou empresa" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-ink mb-2">Telefone / WhatsApp *</label>
                  <input required name="phone" value={formData.phone} onChange={handleChange} className="w-full bg-stone-50 border border-stone-200 rounded-lg px-4 py-3 focus:outline-none focus:border-red focus:ring-1 focus:ring-red transition-all" placeholder="(00) 00000-0000" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-ink mb-2">E-mail *</label>
                  <input required type="email" name="email" value={formData.email} onChange={handleChange} className="w-full bg-stone-50 border border-stone-200 rounded-lg px-4 py-3 focus:outline-none focus:border-red focus:ring-1 focus:ring-red transition-all" placeholder="email@empresa.com" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-ink mb-2">CEP *</label>
                  <input required name="cep" value={formData.cep} onChange={handleCepChange} maxLength={9} className="w-full bg-stone-50 border border-stone-200 rounded-lg px-4 py-3 focus:outline-none focus:border-red focus:ring-1 focus:ring-red transition-all" placeholder="00000-000" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-ink mb-2">Endereço Completo (Local da Obra) *</label>
                  <input required name="location" value={formData.location} onChange={handleChange} className="w-full bg-stone-50 border border-stone-200 rounded-lg px-4 py-3 focus:outline-none focus:border-red focus:ring-1 focus:ring-red transition-all" placeholder="Rua, Número, Bairro, Cidade - UF" />
                </div>
              </div>
            </motion.div>
          )}

          {/* PASSO 2: DETALHES DO LOCAL */}
          {step === 2 && (
            <motion.div 
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="flex items-center gap-3 mb-6 text-red">
                <Ruler className="w-6 h-6" />
                <h4 className="text-lg font-bold text-ink">Dimensões e Geometria</h4>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-ink mb-2">Metragem Quadrada Aproximada (m²)</label>
                  <input name="area_size" value={formData.area_size} onChange={handleChange} className="w-full bg-stone-50 border border-stone-200 rounded-lg px-4 py-3 focus:outline-none focus:border-red focus:ring-1 focus:ring-red transition-all" placeholder="Ex: 500m²" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-ink mb-2">Geometria do Local</label>
                  <select name="geometry" value={formData.geometry} onChange={handleChange} className="w-full bg-stone-50 border border-stone-200 rounded-lg px-4 py-3 focus:outline-none focus:border-red focus:ring-1 focus:ring-red transition-all text-stone-600">
                    <option value="">Selecione...</option>
                    <option value="Laje plana">Laje plana</option>
                    <option value="Reservatório/Tanque">Reservatório / Tanque</option>
                    <option value="Talude">Talude</option>
                    <option value="Telhado/Cobertura">Telhado / Cobertura</option>
                    <option value="Piscina">Piscina</option>
                    <option value="Outro">Outro</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-ink mb-2">Acessibilidade ao local</label>
                  <select name="accessibility" value={formData.accessibility} onChange={handleChange} className="w-full bg-stone-50 border border-stone-200 rounded-lg px-4 py-3 focus:outline-none focus:border-red focus:ring-1 focus:ring-red transition-all text-stone-600">
                    <option value="">Selecione...</option>
                    <option value="Fácil (Térreo, amplo)">Fácil (Térreo, amplo)</option>
                    <option value="Restrito (Escadas, portas estreitas)">Restrito (Escadas, portas estreitas)</option>
                    <option value="Trabalho em Altura / Içamento">Trabalho em Altura / Içamento</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-ink mb-2">Infraestrutura no canteiro</label>
                  <input name="infrastructure" value={formData.infrastructure} onChange={handleChange} className="w-full bg-stone-50 border border-stone-200 rounded-lg px-4 py-3 focus:outline-none focus:border-red focus:ring-1 focus:ring-red transition-all" placeholder="Ex: Tem água e energia 220v" />
                </div>
              </div>
            </motion.div>
          )}

          {/* PASSO 3: CONDIÇÕES E ESPECIFICAÇÕES */}
          {step === 3 && (
            <motion.div 
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="flex items-center gap-3 mb-6 text-red">
                <Building2 className="w-6 h-6" />
                <h4 className="text-lg font-bold text-ink">Condições Técnicas</h4>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-ink mb-2">Tipo de Superfície Atual</label>
                  <input name="surface_type" value={formData.surface_type} onChange={handleChange} className="w-full bg-stone-50 border border-stone-200 rounded-lg px-4 py-3 focus:outline-none focus:border-red focus:ring-1 focus:ring-red transition-all" placeholder="Ex: Concreto bruto, Terra compactada..." />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-ink mb-2">Finalidade / Uso do Local</label>
                  <input name="purpose" value={formData.purpose} onChange={handleChange} className="w-full bg-stone-50 border border-stone-200 rounded-lg px-4 py-3 focus:outline-none focus:border-red focus:ring-1 focus:ring-red transition-all" placeholder="Ex: Água potável, efluentes químicos..." />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-ink mb-2">Estado de Conservação (Buracos, trincas, infiltrações?)</label>
                  <textarea name="condition" value={formData.condition} onChange={handleChange} rows={3} className="w-full bg-stone-50 border border-stone-200 rounded-lg px-4 py-3 focus:outline-none focus:border-red focus:ring-1 focus:ring-red transition-all resize-none" placeholder="Descreva brevemente o estado atual da área..." />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-ink mb-2">Detalhes Construtivos (Pilares, ralos, cantos vivos?)</label>
                  <input name="details" value={formData.details} onChange={handleChange} className="w-full bg-stone-50 border border-stone-200 rounded-lg px-4 py-3 focus:outline-none focus:border-red focus:ring-1 focus:ring-red transition-all" placeholder="A área possui interferências?" />
                </div>
              </div>
            </motion.div>
          )}

          {/* PASSO 4: FOTOS E ENVIO */}
          {step === 4 && (
            <motion.div 
              key="step4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="flex items-center gap-3 mb-6 text-red">
                <Camera className="w-6 h-6" />
                <h4 className="text-lg font-bold text-ink">Anexar Fotos e Enviar</h4>
              </div>
              <div className="bg-stone-50 border-2 border-dashed border-stone-300 rounded-xl p-10 text-center hover:bg-stone-100 transition-colors cursor-pointer relative">
                <input 
                  type="file" 
                  multiple 
                  accept="image/*"
                  onChange={handlePhotoChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
                />
                <Upload className="w-10 h-10 text-stone-400 mx-auto mb-4" />
                <h5 className="font-bold text-ink mb-1">Clique para fazer upload de fotos</h5>
                <p className="text-sm text-stone-500">Ou arraste e solte as imagens aqui. Envie fotos da área para melhor avaliação.</p>
                
                {photos.length > 0 && (
                  <div className="mt-6 flex flex-wrap gap-3 justify-center">
                    {photos.map((photo, i) => (
                      <span key={i} className="bg-white border border-stone-200 text-xs px-3 py-1 rounded-full text-stone-600 flex items-center gap-2">
                        <FileText className="w-3 h-3" />
                        {photo.name}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Consentimento LGPD */}
              <div className="mt-8 bg-stone-50 border border-stone-200 rounded-lg p-4 flex items-start gap-3">
                <input 
                  type="checkbox" 
                  name="lgpd_consent" 
                  id="lgpd_consent"
                  checked={formData.lgpd_consent}
                  onChange={handleChange}
                  required
                  className="mt-1 w-5 h-5 text-red rounded border-stone-300 focus:ring-red cursor-pointer shrink-0" 
                />
                <label htmlFor="lgpd_consent" className="text-sm text-stone-600 leading-relaxed cursor-pointer">
                  Li e concordo com a <a href="/politica-privacidade" target="_blank" className="text-red font-semibold hover:underline">Política de Privacidade</a> e autorizo o tratamento dos meus dados pessoais para fins de envio de orçamentos e contato comercial, em conformidade com a Lei Geral de Proteção de Dados (LGPD).
                </label>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Rodapé do Formulário / Navegação */}
        <div className="mt-10 pt-6 border-t border-stone-100 flex items-center justify-between">
          <button 
            type="button" 
            onClick={prevStep}
            className={`font-semibold text-stone-500 hover:text-ink transition-colors flex items-center gap-2 ${step === 1 ? 'opacity-0 pointer-events-none' : ''}`}
          >
            <ChevronLeft className="w-5 h-5" /> Voltar
          </button>
          
          <Button 
            type="submit" 
            variant="solid"
            className="flex items-center gap-2"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Enviando..." : (step === totalSteps ? "Enviar Orçamento" : "Próximo Passo")}
            {!isSubmitting && step < totalSteps && <ChevronRight className="w-4 h-4" />}
          </Button>
        </div>
      </form>
    </div>
  );
}
