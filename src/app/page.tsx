"use client";
import { useState } from "react";
import { Input, Button, Spin } from "antd";

const { Search } = Input;

const Home: React.FC = () => {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [responseData, setResponseData] = useState<any | null>(null);

  const handleSearch = async () => {
    if (!query) return;

    setLoading(true);
    setResponseData(null);

    try {
      const response = await fetch("/api/proxy", {
        method: "POST",
        headers: {
          Authorization:
            "Bearer AstraCS:XcqYTRRKoRUnClBsBpGYiEIT:005f4c8216cb4dfe41294fd6d9625b313ec9f361fcc13e019951c87eab2a9233",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          input_value: query,
          output_type: "chat",
          input_type: "chat",
        }),
      });

      const data = await response.json();

      const message = data.outputs?.[0]?.outputs?.[0]?.artifacts?.message || "Nothing to show";
      setResponseData(parseMessageToJson(message)?.answer ?? "");
    } catch (error) {
      setResponseData({ error: "Failed to fetch data." });
    } finally {
      setLoading(false);
    }
  };

  // Função para converter mensagem para JSON
  const parseMessageToJson = (message: string) => {
    if (!message.includes("```json")) return message;
    return JSON.parse(message.replace("```json", "```"));
  };
  

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      {!responseData ? (
        <div className="w-full max-w-md">
          <Search
            placeholder="Enter your query"
            enterButton="Buscar"
            size="large"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onSearch={handleSearch}
          />
        </div>
      ) : (
        <>
          <div className="w-full max-w-md fixed top-4">
            <Search
              placeholder="Enter your query"
              enterButton="Buscar"
              size="large"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onSearch={handleSearch}
            />
          </div>
          <div className="flex items-center justify-center h-screen">
            {loading ? (
              <Spin size="large" />
            ) : (
              <div className="bg-white p-6 shadow-md rounded-md text-center max-w-xl">
                <pre className="text-left text-gray-800">
                  {JSON.stringify(responseData, null, 2)}
                </pre>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Home;