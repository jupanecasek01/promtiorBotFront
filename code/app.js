const apiUrl = "https://prueba-tecnica-fpehd0fhcub2gjdf.canadaeast-01.azurewebsites.net/";

const conversationId =
  localStorage.getItem("conversation_id") || self.crypto.randomUUID();
localStorage.setItem("conversation_id", conversationId);


document.getElementById("chatForm").addEventListener("submit", async (e) => {
  e.preventDefault(); 

  const question = document.getElementById("question").value;
  const responseContainer = document.getElementById("responseContainer");

  responseContainer.innerHTML = `
    <div class="alert alert-info">Processing your question...</div>
  `;

  try {
  
    const res = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ question, conversation_id: conversationId }),
    });

    if (!res.ok) throw new Error("Failed to fetch response from server.");
    const data = await res.json();
    responseContainer.innerHTML = formatResponse(data.response);
  } catch (error) {
    responseContainer.innerHTML = `
      <div class="alert alert-danger">Error: Se han excedido los tokens por minutos aceptados por el modelo de Groq. Por favor, espere unos minutos.</div>
    `;
  }
});

function formatResponse(responseText) {
  const formattedResponse = responseText.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

  return `
    <div class="card">
      <div class="card-body">
        <p class="card-text">${formattedResponse.replace(/\n/g, "<br>")}</p>
      </div>
    </div>
  `;
}