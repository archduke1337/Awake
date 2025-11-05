interface OpenRouterMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

interface OpenRouterRequest {
  model: string;
  messages: OpenRouterMessage[];
}

interface OpenRouterResponse {
  choices: {
    message: {
      role: string;
      content: string;
    };
  }[];
}

export async function askOpenRouter(
  modelId: string,
  messages: OpenRouterMessage[]
): Promise<string> {
  const apiKey = process.env.OPENROUTER_API_KEY;

  if (!apiKey) {
    throw new Error(
      "OPENROUTER_API_KEY is not configured. Please set the OPENROUTER_API_KEY environment variable. " +
      "Get your key at: https://openrouter.ai/keys"
    );
  }

  if (apiKey.trim().length === 0) {
    throw new Error("OPENROUTER_API_KEY is empty. Please provide a valid API key.");
  }

  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      // Use FRONTEND_URL if provided, otherwise fall back to localhost
      "HTTP-Referer": process.env.FRONTEND_URL
        ? process.env.FRONTEND_URL
        : "http://localhost:5000",
      "X-Title": "AWAKE Chatbot"
    },
    body: JSON.stringify({
      model: modelId,
      messages
    } as OpenRouterRequest)
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("OpenRouter API error:", errorText);
    throw new Error(`OpenRouter API error: ${response.status} - ${errorText}`);
  }

  const data: OpenRouterResponse = await response.json();
  
  if (!data.choices || data.choices.length === 0) {
    throw new Error("No response from OpenRouter API");
  }

  return data.choices[0].message.content;
}

export async function performWebSearch(query: string): Promise<string> {
  // This is a placeholder for web search functionality
  // In a production environment, you would integrate with:
  // - Google Custom Search API
  // - Bing Search API
  // - SerpAPI
  // - Or other search providers
  
  const serpApiKey = process.env.SERP_API_KEY;
  
  if (!serpApiKey) {
    // Return a message indicating web search is not configured
    return `Web search is not configured. To enable web search, set up one of these services:\n\n1. **SerpAPI** (Recommended): Get a free API key from https://serpapi.com\n2. **Google Custom Search**: Use Google's Custom Search API\n3. **Bing Search**: Use Bing Search API\n\nOnce configured, web search will provide real-time information from the internet.`;
  }

  try {
    const response = await fetch(`https://serpapi.com/search?q=${encodeURIComponent(query)}&api_key=${serpApiKey}&gl=us&num=5`);
    
    if (!response.ok) {
      throw new Error(`SerpAPI error: ${response.status}`);
    }

    const data = await response.json();
    
    if (!data.organic_results || data.organic_results.length === 0) {
      return `No search results found for "${query}"`;
    }

    let searchResults = `🔍 **Web Search Results for "${query}":**\n\n`;
    
    data.organic_results.slice(0, 5).forEach((result: any, index: number) => {
      searchResults += `${index + 1}. **${result.title}**\n`;
      searchResults += `   ${result.snippet || result.description || ''}\n`;
      searchResults += `   Link: ${result.link}\n\n`;
    });

    return searchResults;
  } catch (error) {
    console.error("Web search error:", error);
    return `Web search encountered an error. Please try again or try a different query.`;
  }
}
