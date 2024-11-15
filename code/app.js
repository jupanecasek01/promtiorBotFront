const apiUrl = "https://prueba-tecnica-fpehd0fhcub2gjdf.canadaeast-01.azurewebsites.net/";

// Generar o recuperar conversation_id
const conversationId =
  localStorage.getItem("conversation_id") || self.crypto.randomUUID();
localStorage.setItem("conversation_id", conversationId);

// Manejar el formulario de chat
document.getElementById("chatForm").addEventListener("submit", async (e) => {
  e.preventDefault(); // Evitar el envío estándar del formulario

  const question = document.getElementById("question").value;
  const responseContainer = document.getElementById("responseContainer");

  // Limpiar y mostrar un mensaje de carga
  responseContainer.innerHTML = `
    <div class="alert alert-info">Processing your question...</div>
  `;

  try {
    // Realizar la solicitud POST al backend
    const res = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ question, conversation_id: conversationId }),
    });

    // Manejar la respuesta
    if (!res.ok) throw new Error("Failed to fetch response from server.");
    const data = await res.json();

    // Renderizar la respuesta formateada
    responseContainer.innerHTML = formatResponse(data.response);
  } catch (error) {
    // Manejar errores
    responseContainer.innerHTML = `
      <div class="alert alert-danger">Error: Unable to process your request.</div>
    `;
  }
});

function formatResponse(responseText) {
  // Convertir el texto con Markdown (negrita con '**') a HTML
  const formattedResponse = responseText.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  
  // Convertir la respuesta en HTML utilizando Bootstrap
  return `
    <div class="card">
      <div class="card-body">
        <p class="card-text">${formattedResponse.replace(/\n/g, "<br>")}</p>
      </div>
    </div>
  `;
}