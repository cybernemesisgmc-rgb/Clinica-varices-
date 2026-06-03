import { useState, useRef, useEffect } from "react";
import React from "react";
import { MessageCircle, X, Send } from "lucide-react";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

interface ChatBotProps {
  selectedTreatment?: string;
}

export default function ChatBot({ selectedTreatment = "" }: ChatBotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "¡Hola! Bienvenido a Centro de Varices. ¿Cómo podemos ayudarte hoy?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Send initial message about treatment if selected
  React.useEffect(() => {
    if (selectedTreatment && isOpen) {
      const treatmentMessage: Message = {
        id: Date.now().toString(),
        text: `Quisiera información sobre ${selectedTreatment}`,
        sender: "user",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, treatmentMessage]);
    }
  }, [selectedTreatment, isOpen]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: text,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    // Simulate bot response delay
    setTimeout(() => {
      let botResponse = "";

      const lowerText = text.toLowerCase();

      if (
        lowerText.includes("cita") ||
        lowerText.includes("apartar") ||
        lowerText.includes("agendar") ||
        lowerText.includes("consulta")
      ) {
        botResponse =
          "¡Excelente! Me encantaría ayudarte a apartar una cita. Para conectarte con uno de nuestros asesores, puedes:\n\n📞 Llamar al: 313 573 5276\n📧 Enviar un email a: citas.admision@centrodevaricesmonteria.com\n\n¿O prefieres que te conecte directamente con un asesor ahora?";
      } else if (
        lowerText.includes("asesor") ||
        lowerText.includes("hablar") ||
        lowerText.includes("contacto")
      ) {
        botResponse =
          "Perfecto, voy a conectarte con uno de nuestros asesores especializados. Ellos podrán ayudarte con cualquier pregunta sobre nuestros tratamientos y disponibilidad.\n\n¿Cuál es tu nombre y número de teléfono para que el asesor se comunique contigo?";
      } else if (
        lowerText.includes("horario") ||
        lowerText.includes("abierto") ||
        lowerText.includes("atención")
      ) {
        botResponse =
          "Nuestro horario de atención es:\n\n📅 Lunes a Viernes: 7:00 AM - 5:00 PM\n📅 Sábados: 8:00 AM - 3:00 PM\n📅 Domingos: Cerrado\n\n¿Hay algo más en lo que podamos ayudarte?";
      } else if (
        lowerText.includes("ubicación") ||
        lowerText.includes("dirección") ||
        lowerText.includes("dónde")
      ) {
        botResponse =
          "Nos encontramos en:\n\n📍 Carrera 2 # 21 77\nMontería, Colombia\n\n¿Necesitas indicaciones o más información?";
      } else if (
        lowerText.includes("tratamiento") ||
        lowerText.includes("servicio") ||
        lowerText.includes("procedimiento")
      ) {
        botResponse =
          "Ofrecemos varios tratamientos especializados:\n\n✓ Técnica EVLT (Ablación con Láser)\n✓ Escleroterapia\n✓ Oclusión Venosa\n✓ Técnica TAPIRS\n✓ Drenaje Linfático\n✓ Ecografía Doppler\n\n¿Te gustaría conocer más detalles sobre alguno de estos tratamientos?";
      } else if (lowerText.includes("precio") || lowerText.includes("costo")) {
        botResponse =
          "Para información sobre precios y planes de pago, por favor contacta directamente con nuestro equipo:\n\n📞 313 573 5276\n📧 citas.admision@centrodevaricesmonteria.com\n\nNuestros asesores estarán encantados de brindarte una cotización personalizada.";
      } else if (lowerText.includes("hola") || lowerText.includes("buenos")) {
        botResponse =
          "¡Hola! 👋 Bienvenido a Centro de Varices. ¿En qué podemos ayudarte hoy? ¿Deseas apartar una cita o tienes preguntas sobre nuestros tratamientos?";
      } else {
        botResponse =
          "Gracias por tu pregunta. Para obtener una respuesta más detallada, te recomendamos que hables directamente con uno de nuestros asesores especializados.\n\n📞 Llama al: 313 573 5276\n📧 Email: citas.admision@centrodevaricesmonteria.com\n\n¿Deseas apartar una cita o hay algo más en lo que pueda ayudarte?";
      }

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        sender: "bot",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
      setIsLoading(false);
    }, 500);
  };

  const quickOptions = [
    "Apartar una cita",
    "Hablar con un asesor",
    "Horario de atención",
    "Ubicación",
  ];

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-40 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 p-4 text-white"
        style={{ backgroundColor: "#45bfc5" }}
        aria-label="Abrir chat"
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <MessageCircle className="w-6 h-6" />
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div
          className="fixed bottom-24 right-6 z-40 w-96 max-w-full rounded-lg shadow-2xl flex flex-col"
          style={{ backgroundColor: "#ffffff", height: "600px" }}
        >
          {/* Header */}
          <div
            className="p-4 rounded-t-lg text-white"
            style={{ backgroundColor: "#6b4d9f" }}
          >
            <h3 className="font-bold text-lg">Centro de Varices</h3>
            <p className="text-sm opacity-90">Estamos aquí para ayudarte</p>
          </div>

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-xs px-4 py-2 rounded-lg text-sm leading-relaxed ${
                    message.sender === "user"
                      ? "text-white"
                      : "border"
                  }`}
                  style={{
                    backgroundColor:
                      message.sender === "user" ? "#45bfc5" : "#f5f3f8",
                    color: message.sender === "user" ? "#ffffff" : "#6b4d9f",
                    borderColor:
                      message.sender === "bot" ? "#e0d5f0" : "transparent",
                  }}
                >
                  {message.text.split("\n").map((line, i) => (
                    <div key={i}>{line}</div>
                  ))}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div
                  className="px-4 py-2 rounded-lg"
                  style={{ backgroundColor: "#f5f3f8" }}
                >
                  <div className="flex space-x-2">
                    <div
                      className="w-2 h-2 rounded-full animate-bounce"
                      style={{ backgroundColor: "#45bfc5" }}
                    ></div>
                    <div
                      className="w-2 h-2 rounded-full animate-bounce"
                      style={{
                        backgroundColor: "#45bfc5",
                        animationDelay: "0.1s",
                      }}
                    ></div>
                    <div
                      className="w-2 h-2 rounded-full animate-bounce"
                      style={{
                        backgroundColor: "#45bfc5",
                        animationDelay: "0.2s",
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Options */}
          {messages.length <= 2 && (
            <div className="px-4 py-3 border-t" style={{ borderColor: "#e0d5f0" }}>
              <p className="text-xs font-semibold mb-2" style={{ color: "#6b4d9f" }}>
                Opciones rápidas:
              </p>
              <div className="space-y-2">
                {quickOptions.map((option) => (
                  <button
                    key={option}
                    onClick={() => handleSendMessage(option)}
                    className="w-full text-left px-3 py-2 rounded text-sm font-medium transition-colors hover:opacity-80"
                    style={{
                      backgroundColor: "#f5f3f8",
                      color: "#6b4d9f",
                    }}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div
            className="p-4 border-t"
            style={{ borderColor: "#e0d5f0" }}
          >
            <div className="flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    handleSendMessage(inputValue);
                  }
                }}
                placeholder="Escribe tu mensaje..."
                className="flex-1 px-3 py-2 rounded border text-sm focus:outline-none"
                style={{
                  borderColor: "#e0d5f0",
                  backgroundColor: "#f5f3f8",
                  color: "#6b4d9f",
                }}
              />
              <button
                onClick={() => handleSendMessage(inputValue)}
                disabled={isLoading || !inputValue.trim()}
                className="p-2 rounded transition-colors disabled:opacity-50"
                style={{ backgroundColor: "#45bfc5", color: "#ffffff" }}
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
