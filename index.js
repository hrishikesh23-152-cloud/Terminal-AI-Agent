import { MessagesAnnotation, StateGraph } from "@langchain/langgraph";
import readline from "node:readline/promises";
import { ChatGroq } from "@langchain/groq";
import dotenv from "dotenv";
import {ToolNode} from "@langchain/langgraph/prebuilt";
import { TavilySearch } from "@langchain/tavily";
import { MemorySaver } from "@langchain/langgraph";
import { threadId } from "node:worker_threads";


const checkpointer = new MemorySaver();   // for saving intermediate states, can be used for debugging or analysis later
dotenv.config();
// 1.Define node function
// 2.build the graph
// 3.compile and invoke the graph

// Initializing tools


const tool = new TavilySearch({
  maxResults: 3,
  topic: "general",
  // includeAnswer: false,
  // includeRawContent: false,
  // includeImages: false,
  // includeImageDescriptions: false,
  searchDepth: "basic",
  // timeRange: "day",
  // includeDomains: [],
  // excludeDomains: [],
});

const tools = [tool];
const toolNode = new ToolNode(tools);

// Define conditional edge function
function Continue(state){
   const aimessage = state.messages[state.messages.length - 1];
  if(aimessage.tool_calls && aimessage.tool_calls.length > 0){
    return 'tools';
  }
  // console.log('state',state);
  return '__end__';
  
}

// initializing the LLM
const LLM = new ChatGroq({
  model: "openai/gpt-oss-120b",
  temperature: 0.9,
  maxTokens: 2000,
  maxRetries: 2,
}).bindTools(tools);


// step1 Define Node Function
async function callmodel(state){
  console.log("Calling LLM....");
  const response = await LLM.invoke(state.messages)
  return {
    messages:[response]
  }
}
// 2.Build workflow graph
const workflow = new StateGraph(MessagesAnnotation).addNode('agent',callmodel).addNode('tools',toolNode).addEdge('__start__','agent').addConditionalEdges('agent',Continue).addEdge('tools','agent')
// 3.Compile 
const app = workflow.compile({checkpointer});



const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
async function main() {
   while(true){
     const userinput = await rl.question("You :");
     if(userinput.toLowerCase() === "exit"){
       break;
     }
    // Invoke the graph
    const finalstate = await app.invoke({
      messages: [{role:'user',content:userinput}]
    },{configurable:{thread_id:'user1'}});
    // console.log("Ai_Agent :",userinput);
    console.log('Final :',finalstate.messages[finalstate.messages.length - 1].content);
    
   }
    rl.close();
}
main();