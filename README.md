<div align="center">

# 🚀 Terminal AI Agent

### Modern AI Agent powered by LangGraph + Groq + Tavily Search

<img src="https://img.shields.io/badge/Node.js-Backend-green?style=for-the-badge&logo=node.js" />
<img src="https://img.shields.io/badge/LangGraph-Agentic_Workflows-blue?style=for-the-badge" />
<img src="https://img.shields.io/badge/Groq-LLM-orange?style=for-the-badge" />
<img src="https://img.shields.io/badge/AI-Agent-purple?style=for-the-badge" />

</div>

---

##  About The Project

A modern terminal-based AI Agent built using LangChain, LangGraph, and Groq with tool-calling, conversational memory, and real-time web search capabilities.

This project demonstrates how autonomous AI systems work using graph-based workflows, conditional execution, memory persistence, and external tool integrations.

The agent can:
- Understand user queries
- Decide when tools are required
- Perform web searches
- Maintain conversational memory
- Generate intelligent responses

---

#  Architecture

```txt
           ┌─────────────┐
           │    User     │
           └──────┬──────┘
                  │
                  ▼
        ┌──────────────────┐
        │   LangGraph AI   │
        │      Agent       │
        └────────┬─────────┘
                 │
        Need External Tool?
          ┌──────┴──────┐
          │             │
         YES            NO
          │             │
          ▼             ▼
 ┌────────────────┐   Final
 │ Tavily Search  │  Response
 │      Tool      │
 └────────┬───────┘
          │
          ▼
      Back To
       Agent

⚡ Features

✨ Autonomous AI Agent Workflow
🔍 Real-time Web Search
🛠️ Dynamic Tool Calling
💾 Persistent Memory System
🔄 Conditional Graph Execution
⚡ Ultra-fast LLM Inference
🖥️ Interactive Terminal Interface
🧩 Stateful Agent Architecture

🏗️ Tech Stack
Technology	Usage
Node.js	Runtime Environment
LangChain	LLM Framework
LangGraph	Workflow Orchestration
Groq	LLM Provider
Tavily Search	Web Search Tool
dotenv	Environment Variables

⚙️ Installation
1️⃣ Clone Repository
git clone https://github.com/hrishikesh23-152-cloud/Terminal-AI-Agent.git

cd terminal-ai-agent
2️⃣ Install Dependencies
npm install
3️⃣ Setup Environment Variables

Create a .env file:

GROQ_API_KEY=your_groq_api_key

TAVILY_API_KEY=your_tavily_api_key
🚀 Run The Project
node index.js
